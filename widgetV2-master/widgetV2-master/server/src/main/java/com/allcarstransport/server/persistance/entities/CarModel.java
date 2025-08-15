package com.allcarstransport.server.persistance.entities;

import com.allcarstransport.server.persistance.enums.Category;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(CarModel.DOCUMENT_NAME)
public class CarModel {

    public static final String DOCUMENT_NAME = "car_model";

    @Id
    private ObjectId id;
    private String maker;
    private Category category;
    private String type;
    private String year;
    private String model;
    private Float specialPricePerMi;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getMaker() {
        return maker;
    }

    public void setMaker(String maker) {
        this.maker = maker;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Float getSpecialPricePerMi() {
        return specialPricePerMi;
    }

    public void setSpecialPricePerMi(Float specialPricePerMi) {
        this.specialPricePerMi = specialPricePerMi;
    }

}
