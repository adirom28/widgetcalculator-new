package com.allcarstransport.server.persistance.enums;

public enum Category implements Valuable {

    CAT_1(0.7f, 1100),
    CAT_2(0.8f, 1250),
    CAT_3(0.95f, 1600),
    CAT_4(1.25f, 3200);

    private final float defaultValue;
    private final int maxPrice;

    Category(float defaultValue, int maxPrice) {
        this.defaultValue = defaultValue;
        this.maxPrice = maxPrice;
    }

    @Override
    public float getDefaultValue() {
        return defaultValue;
    }

    public int getMaxPrice() {
        return maxPrice;
    }

}
