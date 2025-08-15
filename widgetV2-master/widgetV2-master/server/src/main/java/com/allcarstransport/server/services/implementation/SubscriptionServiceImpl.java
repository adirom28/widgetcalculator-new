package com.allcarstransport.server.services.implementation;

import com.allcarstransport.server.dtos.subscription.AddCardRequest;
import com.allcarstransport.server.dtos.subscription.CreateSubscriptionRequest;
import com.allcarstransport.server.dtos.subscription.SubscriptionStatus;
import com.allcarstransport.server.dtos.subscription.SubscriptionType;
import com.allcarstransport.server.exception.ServerException;
import com.allcarstransport.server.persistance.entities.User;
import com.allcarstransport.server.security.CurrentUser;
import com.allcarstransport.server.services.SubscriptionService;
import com.allcarstransport.server.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentMethod;
import com.stripe.model.PaymentMethodCollection;
import com.stripe.model.Price;
import com.stripe.model.Subscription;
import com.stripe.model.SubscriptionCollection;
import com.stripe.param.CustomerUpdateParams;
import com.stripe.param.PaymentMethodAttachParams;
import com.stripe.param.PaymentMethodCreateParams;
import com.stripe.param.PaymentMethodListParams;
import com.stripe.param.PriceListParams;
import com.stripe.param.SubscriptionCreateParams;
import com.stripe.param.SubscriptionListParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final UserService userService;
    private final Set<String> activePrices;

    public SubscriptionServiceImpl(UserService userService,
                                   @Value("${stripe.prices}") Set<String> activePrices) {
        this.userService = userService;
        this.activePrices = activePrices;
    }

    @Override
    public List<SubscriptionType> getTypes() {

        List<Price> prices;
        try {
            prices = Price.list(PriceListParams.builder().build()).getData();
        } catch (StripeException e) {
            throw new ServerException(
                    "Stripe error occurred while prices getting",
                    HttpStatus.BAD_REQUEST
            );
        }

        return prices.stream()
                .filter(p -> activePrices.contains(p.getId()))
                .map(p -> new SubscriptionType(p.getId(), p.getNickname(), p.getUnitAmount() / 100))
                .collect(Collectors.toList());
    }

    @Override
    public void addCard(@NonNull AddCardRequest request, @NonNull CurrentUser user) {
        User currentUser = userService.geByIdOrThrowException(user.getId());

        try {
            PaymentMethod paymentMethod = PaymentMethod.create(PaymentMethodCreateParams.builder()
                    .setType(PaymentMethodCreateParams.Type.CARD)
                    .setCard(PaymentMethodCreateParams.CardDetails.builder()
                            .setNumber(request.getNumber())
                            .setCvc(request.getCvc())
                            .setExpYear(request.getYear())
                            .setExpMonth(request.getMonth())
                            .build()
                    )
                    .build()

            );

            paymentMethod.attach(PaymentMethodAttachParams.builder()
                    .setCustomer(currentUser.getStripeCustomerId())
                    .build()
            );

            CustomerUpdateParams customerUpdateParams = CustomerUpdateParams
                    .builder()
                    .setInvoiceSettings(
                            CustomerUpdateParams
                                    .InvoiceSettings.builder()
                                    .setDefaultPaymentMethod(paymentMethod.getId())
                                    .build()
                    )
                    .build();

            Customer.retrieve(currentUser.getStripeCustomerId()).update(customerUpdateParams);

        } catch (StripeException e) {
            throw new ServerException(
                    "Stripe error occurred while adding new card",
                    HttpStatus.BAD_REQUEST
            );
        }

    }

    @Override
    public void deleteCard(@NonNull String id, @NonNull CurrentUser user) {

        try {
            PaymentMethod.retrieve(id).detach();
        } catch (StripeException e) {
            throw new ServerException(
                    "Stripe error occurred while detaching card",
                    HttpStatus.BAD_REQUEST
            );
        }

    }

    @Override
    public void subscribe(@NonNull CreateSubscriptionRequest request, @NonNull CurrentUser user) {
        User currentUser = userService.geByIdOrThrowException(user.getId());

        SubscriptionCreateParams subCreateParams = SubscriptionCreateParams
                .builder()
                .addItem(
                        SubscriptionCreateParams
                                .Item.builder()
                                .setPrice(request.getPriceId())
                                .build()
                )
                .setCustomer(currentUser.getStripeCustomerId())
                .addAllExpand(List.of("latest_invoice.payment_intent"))
                .build();

        try {
            Subscription.create(subCreateParams);
        } catch (StripeException e) {
            throw new ServerException(
                    "Stripe error occurred while subscribing",
                    HttpStatus.BAD_REQUEST
            );
        }

    }

    @Override
    public void unsubscribe(@NonNull String id, @NonNull CurrentUser user) {

        try {
            Subscription.retrieve(id).cancel();
        } catch (StripeException e) {
            throw new ServerException(
                    "Stripe error occurred while subscribing",
                    HttpStatus.BAD_REQUEST
            );
        }

    }

    @Override
    public SubscriptionStatus getStatus(@NonNull CurrentUser user) {
        User currentUser = userService.geByIdOrThrowException(user.getId());

        try {

            PaymentMethod paymentMethod = null;
            Subscription subscription = null;

            String defaultPaymentMethod =
                    Customer.retrieve(currentUser.getStripeCustomerId()).getInvoiceSettings().getDefaultPaymentMethod();

            if (defaultPaymentMethod != null) {
                paymentMethod = PaymentMethod.retrieve(defaultPaymentMethod);
            }

            SubscriptionCollection subscriptions =
                    Subscription.list(SubscriptionListParams.builder()
                            .setCustomer(currentUser.getStripeCustomerId())
                            .build()
                    );

            if (!subscriptions.getData().isEmpty()) {
                subscription = subscriptions.getData().stream().filter(s -> s.getStatus().equals("active"))
                        .findFirst()
                        .orElse(null);
            }

            return new SubscriptionStatus(
                    Optional.ofNullable(subscription).map(Subscription::getId).orElse(null),
                    Optional.ofNullable(paymentMethod).map(PaymentMethod::getId).orElse(null),
                    Optional.ofNullable(paymentMethod).map(pm -> pm.getCard().getLast4()).orElse(null),
                    Optional.ofNullable(paymentMethod).map(pm -> pm.getCard().getExpYear()).orElse(null),
                    Optional.ofNullable(paymentMethod).map(pm -> pm.getCard().getExpMonth()).orElse(null),
                    Optional.ofNullable(subscription).map(s -> toLocalDateTime(s.getCurrentPeriodEnd())).orElse(null),
                    Optional.ofNullable(subscription).map(s -> toLocalDateTime(s.getBillingCycleAnchor())).orElse(null)
            );

        } catch (StripeException e) {
            throw new ServerException(
                    "Stripe error occurred while getting subscription status",
                    HttpStatus.BAD_REQUEST
            );
        }

    }

    private LocalDateTime toLocalDateTime(Long time) {
        return Instant.ofEpochSecond(time)
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }

}
