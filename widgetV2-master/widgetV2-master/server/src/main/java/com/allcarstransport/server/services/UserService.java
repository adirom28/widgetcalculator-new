package com.allcarstransport.server.services;

import com.allcarstransport.server.dtos.user.ClientShortInfo;
import com.allcarstransport.server.dtos.user.ForgotPasswordRequest;
import com.allcarstransport.server.dtos.user.LoginRequest;
import com.allcarstransport.server.dtos.user.NotificationConfigDTO;
import com.allcarstransport.server.dtos.user.RegisterUserRequest;
import com.allcarstransport.server.dtos.user.ResetPasswordRequest;
import com.allcarstransport.server.persistance.entities.User;
import org.bson.types.ObjectId;
import org.springframework.lang.NonNull;

import java.util.UUID;

public interface UserService {

    String generateToken(@NonNull LoginRequest loginRequest);

    ObjectId registerUser(@NonNull RegisterUserRequest request);

    boolean isDomainRegistered(@NonNull ObjectId userId, @NonNull String domain);

    User geByIdOrThrowException(@NonNull ObjectId id);

    ClientShortInfo getShortInfoByDomain(@NonNull String domain);

    void forgotPassword(@NonNull ForgotPasswordRequest request);

    void resetPassword(@NonNull ResetPasswordRequest request);

    void checkResetToken(@NonNull UUID resetToken);

    NotificationConfigDTO getNotificationConfig();

    void setNotificationConfig(NotificationConfigDTO request);

}
