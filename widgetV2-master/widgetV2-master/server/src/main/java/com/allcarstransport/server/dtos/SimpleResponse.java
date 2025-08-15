package com.allcarstransport.server.dtos;

public class SimpleResponse<T> {

    private final T value;

    public SimpleResponse(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }

}
