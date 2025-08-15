package com.allcarstransport.server.services;

import com.allcarstransport.server.dtos.subscription.AddCardRequest;
import com.allcarstransport.server.dtos.subscription.CreateSubscriptionRequest;
import com.allcarstransport.server.dtos.subscription.SubscriptionStatus;
import com.allcarstransport.server.dtos.subscription.SubscriptionType;
import com.allcarstransport.server.security.CurrentUser;
import org.springframework.lang.NonNull;

import java.util.List;

public interface SubscriptionService {

    List<SubscriptionType> getTypes();

    void addCard(@NonNull AddCardRequest request, @NonNull CurrentUser user);

    void deleteCard(@NonNull String id, @NonNull CurrentUser user) ;

    void subscribe(@NonNull CreateSubscriptionRequest request, @NonNull CurrentUser user);

    void unsubscribe(@NonNull String id, @NonNull CurrentUser user);

    SubscriptionStatus getStatus(@NonNull CurrentUser user);

}
