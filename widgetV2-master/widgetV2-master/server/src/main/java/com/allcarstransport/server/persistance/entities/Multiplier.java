package com.allcarstransport.server.persistance.entities;

import com.allcarstransport.server.persistance.enums.MultiplierType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("max_price_config")
public class Multiplier {

    @Id
    private MultiplierType name;
    private float value;

    public Multiplier() { }

    public Multiplier(MultiplierType name, float value) {
        this.name = name;
        this.value = value;
    }

    public MultiplierType getName() {
        return name;
    }

    public void setName(MultiplierType name) {
        this.name = name;
    }

    public float getValue() {
        return value;
    }

    public void setValue(float value) {
        this.value = value;
    }

}
