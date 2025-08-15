package com.allcarstransport.server.dtos.subscription;

public class SubscriptionType {

    private final String id;
    private final String name;
    private final Long price;

    public SubscriptionType(String id, String name, Long price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Long getPrice() {
        return price;
    }

    @Override
    public String toString() {
        return "SubscriptionType{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", price='" + price + '\'' +
                '}';
    }

}
