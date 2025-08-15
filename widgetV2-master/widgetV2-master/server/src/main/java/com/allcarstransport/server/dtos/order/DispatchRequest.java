package com.allcarstransport.server.dtos.order;

import org.bson.types.ObjectId;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class DispatchRequest {

    @NotBlank
    private String nameCarrier;
    @NotBlank
    private String contactPerson;
    @NotBlank
    private String contactEmail;
    @NotBlank
    private String contactPhoneNumber;
    @NotBlank
    private String driverName;
    @NotBlank
    private String driverNumber;
    @NotBlank
    private String pickUpDate;
    @NotBlank
    private String deliveryDate;
    @NotNull
    private Boolean isCarEnclosed;
    private ObjectId driverId;

    public String getNameCarrier() {
        return nameCarrier;
    }

    public void setNameCarrier(String nameCarrier) {
        this.nameCarrier = nameCarrier;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getContactPhoneNumber() {
        return contactPhoneNumber;
    }

    public void setContactPhoneNumber(String contactPhoneNumber) {
        this.contactPhoneNumber = contactPhoneNumber;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getDriverNumber() {
        return driverNumber;
    }

    public void setDriverNumber(String driverNumber) {
        this.driverNumber = driverNumber;
    }

    public String getPickUpDate() {
        return pickUpDate;
    }

    public void setPickUpDate(String pickUpDate) {
        this.pickUpDate = pickUpDate;
    }

    public String getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(String deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public Boolean getIsCarEnclosed() {
        return isCarEnclosed;
    }

    public void setIsCarEnclosed(Boolean carEnclosed) {
        isCarEnclosed = carEnclosed;
    }

    public Boolean getCarEnclosed() {
        return isCarEnclosed;
    }

    public void setCarEnclosed(Boolean carEnclosed) {
        isCarEnclosed = carEnclosed;
    }

    public ObjectId getDriverId() {
        return driverId;
    }

    public void setDriverId(ObjectId driverId) {
        this.driverId = driverId;
    }

    @Override
    public String toString() {
        return "DispatchRequest{" +
                "nameCarrier='" + nameCarrier + '\'' +
                ", contactPerson='" + contactPerson + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                ", contactPhoneNumber='" + contactPhoneNumber + '\'' +
                ", driverName='" + driverName + '\'' +
                ", driverNumber='" + driverNumber + '\'' +
                ", pickUpDate='" + pickUpDate + '\'' +
                ", deliveryDate='" + deliveryDate + '\'' +
                ", isCarEnclosed=" + isCarEnclosed +
                '}';
    }

}
