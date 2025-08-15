package com.allcarstransport.server.persistance.enums;

public enum MultiplierType implements Valuable {

    ENCLOSED(30),
    CASH_DISCOUNT(5),
    NOT_RUNNING(20);

    private final float defaultValue;

    MultiplierType(float defaultValue) {
        this.defaultValue = defaultValue;
    }

    @Override
    public float getDefaultValue() {
        return defaultValue;
    }

}
