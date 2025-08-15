package com.allcarstransport.server.exception.handled;

import com.allcarstransport.server.dtos.ErrorResponse;
import com.allcarstransport.server.exception.ServerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class ExceptionHandlerControllerAdvice {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionHandlerControllerAdvice.class);

    @ExceptionHandler(ServerException.class)
    public ResponseEntity<Object> handleInsuranceException(ServerException exc) {
        logger.error("Statement products API Error:", exc);

        return handleExceptionInternal(
                new ErrorResponse(exc.getMessage()),
                new HttpHeaders(),
                exc.getStatus()
        );

    }

    private ResponseEntity<Object> handleExceptionInternal(Object response, HttpHeaders headers, HttpStatus status) {
        return new ResponseEntity<>(response, headers, status);
    }

}