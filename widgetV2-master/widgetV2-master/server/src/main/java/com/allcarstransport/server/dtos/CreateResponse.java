package com.allcarstransport.server.dtos;

public class CreateResponse<T> {

    private final T id;

    public CreateResponse(T id) {
        this.id = id;
    }

    public T getId() {
        return id;
    }

    @Override
    public String toString() {
        return "CreateResponse{" +
                "id=" + id +
                '}';
    }

}
