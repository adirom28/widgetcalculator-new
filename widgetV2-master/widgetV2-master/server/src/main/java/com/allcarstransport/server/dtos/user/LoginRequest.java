package com.allcarstransport.server.dtos.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class LoginRequest {

    @NotBlank
    private String email;
    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9^$*+-?()\\[\\]{}—#@!%&]{6,15}$")
    private String password;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
