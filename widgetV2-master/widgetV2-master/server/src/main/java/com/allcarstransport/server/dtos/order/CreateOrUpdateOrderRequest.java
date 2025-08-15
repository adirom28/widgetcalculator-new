package com.allcarstransport.server.dtos.order;

public class CreateOrUpdateOrderRequest extends OrderDTO {

    @Override
    public String toString() {
        return "CreateOrUpdateOrderRequest{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", phoneFrom='" + phoneFrom + '\'' +
                ", phoneTo='" + phoneTo + '\'' +
                ", firstFrom='" + firstFrom + '\'' +
                ", lastFrom='" + lastFrom + '\'' +
                ", firstTo='" + firstTo + '\'' +
                ", lastTo='" + lastTo + '\'' +
                ", companyNameFrom='" + companyNameFrom + '\'' +
                ", companyNameTo='" + companyNameTo + '\'' +
                ", addressFrom='" + addressFrom + '\'' +
                ", cityFrom='" + cityFrom + '\'' +
                ", stateFrom='" + stateFrom + '\'' +
                ", zipCodeFrom='" + zipCodeFrom + '\'' +
                ", streetTo='" + streetTo + '\'' +
                ", cityTo='" + cityTo + '\'' +
                ", stateTo='" + stateTo + '\'' +
                ", zipCodeTo='" + zipCodeTo + '\'' +
                ", date=" + date +
                ", comments='" + comments + '\'' +
                ", detail='" + detail + '\'' +
                ", price=" + price +
                '}';
    }

}
