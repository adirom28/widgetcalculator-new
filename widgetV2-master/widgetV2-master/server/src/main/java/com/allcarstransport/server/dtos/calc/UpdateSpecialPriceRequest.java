package com.allcarstransport.server.dtos.calc;

import org.bson.types.ObjectId;

public class UpdateSpecialPriceRequest {

    private ObjectId id;
    private Float price;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

}
