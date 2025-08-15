package com.allcarstransport.server.dtos.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.UUID;

public class ResetPasswordRequest {

    @Pattern(regexp = "^[A-Za-z0-9^$*+-?()\\[\\]{}—#@!%&]{6,15}$")
    private String oldPassword;
    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9^$*+-?()\\[\\]{}—#@!%&]{6,15}$")
    private String newPassword;
    private UUID resetToken;

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public UUID getResetToken() {
        return resetToken;
    }

    public void setResetToken(UUID resetToken) {
        this.resetToken = resetToken;
    }

    @Override
    public String toString() {
        return "ResetPassword{" +
                "oldPassword='" + oldPassword + '\'' +
                ", newPassword='" + newPassword + '\'' +
                ", resetToken=" + resetToken +
                '}';
    }

}
