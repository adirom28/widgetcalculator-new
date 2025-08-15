package com.allcarstransport.server.exception;

import org.springframework.http.HttpStatus;

public class ServerException extends RuntimeException {

    private final HttpStatus status;

    public ServerException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }

}
