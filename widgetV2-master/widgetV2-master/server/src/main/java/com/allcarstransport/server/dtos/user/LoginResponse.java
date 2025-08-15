package com.allcarstransport.server.dtos.user;

public class LoginResponse {

    private final String token;

    public LoginResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

}
