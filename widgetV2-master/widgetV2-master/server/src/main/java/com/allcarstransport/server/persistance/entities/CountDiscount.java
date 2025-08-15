package com.allcarstransport.server.persistance.entities;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("count_discount")
public class CountDiscount {

    public static final String DOCUMENT_NAME = "count_discount";

    @Id
    private ObjectId id;
    private Integer count;
    private Integer discount;

    public CountDiscount(Integer count, Integer discount) {
        this.count = count;
        this.discount = discount;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

}
