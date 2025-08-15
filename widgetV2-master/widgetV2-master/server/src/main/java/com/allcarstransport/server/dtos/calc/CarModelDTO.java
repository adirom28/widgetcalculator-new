package com.allcarstransport.server.dtos.calc;

import com.allcarstransport.server.persistance.enums.Category;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CarModelDTO {

    @JsonProperty("make")
    private String maker;
    private String type;
    private Integer year;
    private String model;
    private Category category;

    public String getMaker() {
        return maker;
    }

    public void setMaker(String maker) {
        this.maker = maker;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

}
