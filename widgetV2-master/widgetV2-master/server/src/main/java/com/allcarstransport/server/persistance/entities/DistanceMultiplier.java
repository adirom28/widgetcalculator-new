package com.allcarstransport.server.persistance.entities;

import com.allcarstransport.server.persistance.enums.Category;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("distance_multiplier")
public class DistanceMultiplier {

    @Id
    private Category category;
    private float value;
    private int maxValue;

    public DistanceMultiplier() { }

    public DistanceMultiplier(Category category, float value, int maxValue) {
        this.category = category;
        this.value = value;
        this.maxValue = maxValue;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public float getValue() {
        return value;
    }

    public void setValue(float value) {
        this.value = value;
    }

    public int getMaxValue() {
        return maxValue;
    }

    public void setMaxValue(int maxValue) {
        this.maxValue = maxValue;
    }

}
