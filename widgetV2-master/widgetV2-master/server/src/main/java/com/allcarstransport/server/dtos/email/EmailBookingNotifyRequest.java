package com.allcarstransport.server.dtos.email;

import javax.validation.constraints.NotNull;

public class EmailBookingNotifyRequest extends EmailNotifyRequest {

    @NotNull
    private String clientName;
    @NotNull
    private String senderFirstName;
    @NotNull
    private String senderLastName;
    @NotNull
    private String senderPhone;
    @NotNull
    private String receiverFirstName;
    @NotNull
    private String receiverLastName;
    @NotNull
    private String receiverPhone;
    @NotNull
    private String cityFrom;
    @NotNull
    private String streetAddressFrom;

    private String companyNameFrom;
    @NotNull
    private String zipCodeFrom;
    @NotNull
    private String stateFrom;
    @NotNull
    private String cityTo;
    @NotNull
    private String streetAddressTo;

    private String companyNameTo;
    @NotNull
    private String zipCodeTo;
    @NotNull
    private String stateTo;
    @NotNull
    private String comments;
    @NotNull
    private String orderId;
    @NotNull
    private String orderLink;
    @NotNull
    private String selectedPrice;

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getSenderFirstName() {
        return senderFirstName;
    }

    public void setSenderFirstName(String senderFirstName) {
        this.senderFirstName = senderFirstName;
    }

    public String getSenderLastName() {
        return senderLastName;
    }

    public void setSenderLastName(String senderLastName) {
        this.senderLastName = senderLastName;
    }

    public String getSenderPhone() {
        return senderPhone;
    }

    public void setSenderPhone(String senderPhone) {
        this.senderPhone = senderPhone;
    }

    public String getReceiverFirstName() {
        return receiverFirstName;
    }

    public void setReceiverFirstName(String receiverFirstName) {
        this.receiverFirstName = receiverFirstName;
    }

    public String getReceiverLastName() {
        return receiverLastName;
    }

    public void setReceiverLastName(String receiverLastName) {
        this.receiverLastName = receiverLastName;
    }

    public String getReceiverPhone() {
        return receiverPhone;
    }

    public void setReceiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone;
    }

    public String getCityFrom() {
        return cityFrom;
    }

    public void setCityFrom(String cityFrom) {
        this.cityFrom = cityFrom;
    }

    public String getStreetAddressFrom() {
        return streetAddressFrom;
    }

    public void setStreetAddressFrom(String streetAddressFrom) {
        this.streetAddressFrom = streetAddressFrom;
    }

    public String getCompanyNameFrom() {
        return companyNameFrom;
    }

    public void setCompanyNameFrom(String companyNameFrom) {
        this.companyNameFrom = companyNameFrom;
    }

    public String getZipCodeFrom() {
        return zipCodeFrom;
    }

    public void setZipCodeFrom(String zipCodeFrom) {
        this.zipCodeFrom = zipCodeFrom;
    }

    public String getStateFrom() {
        return stateFrom;
    }

    public void setStateFrom(String stateFrom) {
        this.stateFrom = stateFrom;
    }

    public String getCityTo() {
        return cityTo;
    }

    public void setCityTo(String cityTo) {
        this.cityTo = cityTo;
    }

    public String getStreetAddressTo() {
        return streetAddressTo;
    }

    public void setStreetAddressTo(String streetAddressTo) {
        this.streetAddressTo = streetAddressTo;
    }

    public String getCompanyNameTo() {
        return companyNameTo;
    }

    public void setCompanyNameTo(String companyNameTo) {
        this.companyNameTo = companyNameTo;
    }

    public String getZipCodeTo() {
        return zipCodeTo;
    }

    public void setZipCodeTo(String zipCodeTo) {
        this.zipCodeTo = zipCodeTo;
    }

    public String getStateTo() {
        return stateTo;
    }

    public void setStateTo(String stateTo) {
        this.stateTo = stateTo;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getOrderLink() {
        return orderLink;
    }

    public void setOrderLink(String orderLink) {
        this.orderLink = orderLink;
    }

    public String getSelectedPrice() {
        return selectedPrice;
    }

    public void setSelectedPrice(String selectedPrice) {
        this.selectedPrice = selectedPrice;
    }

}
