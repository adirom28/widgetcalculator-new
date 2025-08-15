package com.allcarstransport.server.dtos.email;

import javax.validation.constraints.NotNull;

public class EmailNotifyRequest {

    private String regularPrice;

    private String cashDiscountPrice;

    @NotNull
    private String clientEmail;
    @NotNull
    private String shipDate;
    @NotNull
    private String distanceText;
    @NotNull
    private String durationText;
    @NotNull
    private String clientPhone;

    @NotNull
    private String placeFrom;
    @NotNull
    private String placeTo;

    @NotNull
    private String transportRunning;
    @NotNull
    private String transportType;
    @NotNull
    private String vehicleMaker;
    @NotNull
    private String vehicleModel;
    @NotNull
    private String vehicleYear;
    @NotNull
    private String vehicleCategory;

    public String getRegularPrice() {
        return regularPrice;
    }

    public void setRegularPrice(String regularPrice) {
        this.regularPrice = regularPrice;
    }

    public String getCashDiscountPrice() {
        return cashDiscountPrice;
    }

    public void setCashDiscountPrice(String cashDiscountPrice) {
        this.cashDiscountPrice = cashDiscountPrice;
    }

    public String getPlaceFrom() {
        return placeFrom;
    }

    public void setPlaceFrom(String placeFrom) {
        this.placeFrom = placeFrom;
    }

    public String getPlaceTo() {
        return placeTo;
    }

    public void setPlaceTo(String placeTo) {
        this.placeTo = placeTo;
    }

    public String getTransportRunning() {
        return transportRunning;
    }

    public void setTransportRunning(String transportRunning) {
        this.transportRunning = transportRunning;
    }

    public String getTransportType() {
        return transportType;
    }

    public void setTransportType(String transportType) {
        this.transportType = transportType;
    }

    public String getVehicleMaker() {
        return vehicleMaker;
    }

    public void setVehicleMaker(String vehicleMaker) {
        this.vehicleMaker = vehicleMaker;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public String getVehicleYear() {
        return vehicleYear;
    }

    public void setVehicleYear(String vehicleYear) {
        this.vehicleYear = vehicleYear;
    }

    public String getVehicleCategory() {
        return vehicleCategory;
    }

    public void setVehicleCategory(String vehicleCategory) {
        this.vehicleCategory = vehicleCategory;
    }

    public String getClientEmail() {
        return clientEmail;
    }

    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }

    public String getShipDate() {
        return shipDate;
    }

    public void setShipDate(String shipDate) {
        this.shipDate = shipDate;
    }

    public String getDistanceText() {
        return distanceText;
    }

    public void setDistanceText(String distanceText) {
        this.distanceText = distanceText;
    }

    public String getDurationText() {
        return durationText;
    }

    public void setDurationText(String durationText) {
        this.durationText = durationText;
    }

    public String getClientPhone() {
        return clientPhone;
    }

    public void setClientPhone(String clientPhone) {
        this.clientPhone = clientPhone;
    }

}
