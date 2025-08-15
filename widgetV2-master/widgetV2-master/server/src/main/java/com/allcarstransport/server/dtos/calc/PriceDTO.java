package com.allcarstransport.server.dtos.calc;

public class PriceDTO {

    private Integer regularPrice;
    private Integer cashDiscountPrice;

    public PriceDTO() { }

    public PriceDTO(Integer regularPrice, Integer cashDiscountPrice) {
        this.regularPrice = regularPrice;
        this.cashDiscountPrice = cashDiscountPrice;
    }

    public Integer getRegularPrice() {
        return regularPrice;
    }

    public void setRegularPrice(Integer regularPrice) {
        this.regularPrice = regularPrice;
    }

    public Integer getCashDiscountPrice() {
        return cashDiscountPrice;
    }

    public void setCashDiscountPrice(Integer cashDiscountPrice) {
        this.cashDiscountPrice = cashDiscountPrice;
    }

}
