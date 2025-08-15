package com.allcarstransport.server.services.implementation;

import com.allcarstransport.server.dtos.user.ClientShortInfo;
import com.allcarstransport.server.dtos.user.ForgotPasswordRequest;
import com.allcarstransport.server.dtos.user.LoginRequest;
import com.allcarstransport.server.dtos.user.NotificationConfigDTO;
import com.allcarstransport.server.dtos.user.RegisterUserRequest;
import com.allcarstransport.server.dtos.user.ResetPasswordRequest;
import com.allcarstransport.server.exception.ServerException;
import com.allcarstransport.server.security.CurrentUser;
import com.allcarstransport.server.services.EmailService;
import com.allcarstransport.server.services.UserService;
import com.allcarstransport.server.utils.mappers.UserMapper;
import com.allcarstransport.server.config.Role;
import com.allcarstransport.server.persistance.entities.User;
import com.allcarstransport.server.persistance.repositories.UserRepository;
import com.allcarstransport.server.security.JwtUtils;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.param.CustomerCreateParams;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static java.lang.String.format;

@Service
public class UserServiceImpl implements UserService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final JwtUtils jwtUtils;
    private final EmailService emailService;
    private final Duration forgotPasswordTokenLifeTime;

    public UserServiceImpl(AuthenticationManager authenticationManager, UserRepository userRepository,
                           PasswordEncoder passwordEncoder, UserMapper userMapper, JwtUtils jwtUtils,
                           EmailService emailService,
                           @Value("${user.forgot.password.lifetime}") Duration forgotPasswordTokenLifeTime) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.jwtUtils = jwtUtils;
        this.emailService = emailService;
        this.forgotPasswordTokenLifeTime = forgotPasswordTokenLifeTime;
    }

    @Override
    public String generateToken(@NonNull LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        return jwtUtils.generateJwtToken(authentication);
    }

    @Override
    public ObjectId registerUser(@NonNull RegisterUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ServerException(
                    "Email already in use.",
                    HttpStatus.BAD_REQUEST
            );
        }

        if (userRepository.existsByDomain(request.getDomain())) {
            throw new ServerException(
                    "Domain already in use.",
                    HttpStatus.BAD_REQUEST
            );
        }

        User user = userMapper.mapToEntity(request, Set.of(Role.ROLE_USER), passwordEncoder.encode(request.getPassword()));

        try {
            Customer customer = Customer.create(CustomerCreateParams.builder()
                    .setPhone(request.getPhoneNumber())
                    .setAddress(CustomerCreateParams.Address.builder()
                            .setState(request.getStateAddress())
                            .setCity(request.getCityAddress())
                            .setLine1(request.getStateAddress())
                            .setLine2(request.getSecondStreetAddress())
                            .setPostalCode(request.getZipCode())
                            .build())
                            .setName(request.getCompanyName())
                    .setEmail(request.getEmail()).build());

            user.setStripeCustomerId(customer.getId());
        } catch (StripeException e) {
            throw new ServerException(
                    "Stripe error occurred while new customer creating",
                    HttpStatus.BAD_REQUEST
            );
        }

        userRepository.save(user);

        return user.getId();
    }

    @Override
    public boolean isDomainRegistered(@NonNull ObjectId userId, @NonNull String domain) {
        return userRepository.existsByIdAndDomain(userId, domain);
    }

    @Override
    public User geByIdOrThrowException(@NonNull ObjectId id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ServerException(
                        format("User with id=%s not found!!!", id.toHexString()),
                        HttpStatus.BAD_REQUEST
                ));
    }

    @Override
    public ClientShortInfo getShortInfoByDomain(@NonNull String domain) {
        return userRepository.findByDomain(domain)
                .map(userMapper::mapToShortInfo)
                .orElse(null);
    }

    @Override
    public void forgotPassword(@NonNull ForgotPasswordRequest request) {
        UUID token = UUID.randomUUID();

        Optional<User> optionalByEmail = userRepository.findByEmail(request.getEmail());
        if (optionalByEmail.isPresent()) {
            User user = optionalByEmail.get();
            user.setResetPasswordToken(token);
            user.setResetPasswordTokenExpiration(LocalDateTime.now().plus(forgotPasswordTokenLifeTime));
            emailService.sendResetPasswordEmail(token.toString(), user.getEmail());
            userRepository.save(user);
        }

    }

    @Override
    public void resetPassword(@NonNull ResetPasswordRequest request) {
        if (request.getOldPassword() == null && request.getResetToken() == null) {
            throw new ServerException("New password or resetToken fields can't be empty", HttpStatus.BAD_REQUEST);
        }

        if (request.getResetToken() != null) {
            userRepository.findByResetPasswordTokenAndResetPasswordTokenExpirationAfter(
                    request.getResetToken(), LocalDateTime.now()).ifPresentOrElse(user -> {
                user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                user.setResetPasswordToken(null);
                user.setResetPasswordTokenExpiration(null);
                userRepository.save(user);
            }, () -> {
                throw new ServerException("Bad reset token.", HttpStatus.UNAUTHORIZED);
            });

            return;
        } else {
            SecurityContext context = SecurityContextHolder.getContext();
            if (context.getAuthentication().getPrincipal() instanceof CurrentUser) {
                CurrentUser principal = (CurrentUser) context.getAuthentication().getPrincipal();

                userRepository.findById(principal.getId()).ifPresent(user -> {
                    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                    userRepository.save(user);
                });

                return;
            }
        }

        throw new ServerException("Not authorized", HttpStatus.UNAUTHORIZED);

    }

    @Override
    public void checkResetToken(@NonNull UUID resetToken) {

        if (userRepository.findByResetPasswordTokenAndResetPasswordTokenExpirationAfter(resetToken, LocalDateTime.now())
                .isEmpty()) {
            throw new ServerException("Bad reset token.", HttpStatus.UNAUTHORIZED);
        }

    }

    @Override
    public NotificationConfigDTO getNotificationConfig() {
        CurrentUser principal = (CurrentUser) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User user = userRepository.findById(principal.getId()).get();
        return userMapper.mapNotificationToDTO(user.getNotificationConfig());

    }

    @Override
    public void setNotificationConfig(NotificationConfigDTO request) {
        CurrentUser principal = (CurrentUser) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User user = userRepository.findById(principal.getId()).get();
        user.setNotificationConfig(userMapper.mapNotificationFromDTO(request));

        userRepository.save(user);

    }

}
