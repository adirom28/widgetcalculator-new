package com.allcarstransport.server.persistance.entities;

import com.allcarstransport.server.config.Role;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Document("user")
public class User {

    @Id
    private ObjectId id;
    @NotBlank
    @Size(max = 50)
    private String email;
    @NotBlank
    @Size(max = 120)
    private String password;
    private String roles;
    @NotBlank
    private String companyName;
    @NotBlank
    private String domain;
    private Binary logo;
    @NotBlank
    private String streetAddress;
    @NotBlank
    private String secondStreetAddress;
    @NotBlank
    private String cityAddress;
    @NotBlank
    private String stateAddress;
    @NotBlank
    private String zipCode;
    @NotBlank
    private String phoneNumber;
    private String stripeCustomerId;

    private UUID resetPasswordToken;
    private LocalDateTime resetPasswordTokenExpiration;

    private NotificationConfig notificationConfig = new NotificationConfig();

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UUID getResetPasswordToken() {
        return resetPasswordToken;
    }

    public void setResetPasswordToken(UUID resetPasswordToken) {
        this.resetPasswordToken = resetPasswordToken;
    }

    public LocalDateTime getResetPasswordTokenExpiration() {
        return resetPasswordTokenExpiration;
    }

    public void setResetPasswordTokenExpiration(LocalDateTime resetPasswordTokenExpiration) {
        this.resetPasswordTokenExpiration = resetPasswordTokenExpiration;
    }

    public Set<Role> getRoles() {
        if (!StringUtils.hasText(roles)) {
            return Collections.emptySet();
        }

        return Arrays.stream(roles.split(","))
                .map(role -> {

                    try {
                        return Role.valueOf(role.toUpperCase());
                    } catch (IllegalArgumentException e) {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toUnmodifiableSet());

    }

    public void setRoles(Set<Role> roles) {
        if (CollectionUtils.isEmpty(roles)) {
            this.roles = null;
        }

        this.roles = roles.stream()
                .map(Role::name)
                .collect(Collectors.joining(","));
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public Binary getLogo() {
        return logo;
    }

    public void setLogo(Binary logo) {
        this.logo = logo;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getSecondStreetAddress() {
        return secondStreetAddress;
    }

    public void setSecondStreetAddress(String secondStreetAddress) {
        this.secondStreetAddress = secondStreetAddress;
    }

    public String getCityAddress() {
        return cityAddress;
    }

    public void setCityAddress(String cityAddress) {
        this.cityAddress = cityAddress;
    }

    public String getStateAddress() {
        return stateAddress;
    }

    public void setStateAddress(String stateAddress) {
        this.stateAddress = stateAddress;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public NotificationConfig getNotificationConfig() {
        return notificationConfig;
    }

    public void setNotificationConfig(NotificationConfig notificationConfig) {
        this.notificationConfig = notificationConfig;
    }

    public String getStripeCustomerId() {
        return stripeCustomerId;
    }

    public void setStripeCustomerId(String stripeCustomerId) {
        this.stripeCustomerId = stripeCustomerId;
    }

}
