package com.allcarstransport.server.dtos.subscription;

import javax.validation.constraints.NotBlank;

public class CreateSubscriptionRequest {

    @NotBlank
    private String cardId;
    @NotBlank
    private String priceId;

    public String getPriceId() {
        return priceId;
    }

    public void setPriceId(String priceId) {
        this.priceId = priceId;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String paymentMethodId) {
        this.cardId = paymentMethodId;
    }

    @Override
    public String toString() {
        return "CreateSubscriptionRequest{" +
                "cardId='" + cardId + '\'' +
                ", priceId='" + priceId + '\'' +
                '}';
    }

}
