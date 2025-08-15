package com.allcarstransport.server.persistance.repositories;

import com.allcarstransport.server.persistance.entities.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends MongoRepository<User, ObjectId> {

    Optional<User> findByEmail(@NonNull String email);

    Optional<User> findByIdAndDomain(@NonNull ObjectId id, @NonNull String domain);

    boolean existsByEmail(@NonNull String email);

    boolean existsByDomain(@NonNull String domain);

    boolean existsByIdAndDomain(@NonNull ObjectId id, String domain);

    Optional<User> findByDomain(@NonNull String domain);

    Optional<User> findByResetPasswordTokenAndResetPasswordTokenExpirationAfter(
            @NonNull UUID resetPasswordToken, @NonNull LocalDateTime minExpiration);

}
