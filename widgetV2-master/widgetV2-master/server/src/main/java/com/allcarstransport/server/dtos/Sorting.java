package com.allcarstransport.server.dtos;

import org.springframework.data.domain.Sort;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class Sorting {

    @NotBlank
    private final String field;
    @NotNull
    private final Sort.Direction direction;

    public Sorting(String field, Sort.Direction direction) {
        this.field = field;
        this.direction = direction;
    }

    public String getField() {
        return field;
    }

    public Sort.Direction getDirection() {
        return direction;
    }

    @Override
    public String toString() {
        return "Sorting{" +
                "field='" + field + '\'' +
                ", direction=" + direction +
                '}';
    }

}
