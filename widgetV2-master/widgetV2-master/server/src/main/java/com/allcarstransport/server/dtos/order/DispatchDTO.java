package com.allcarstransport.server.dtos.order;

public class DispatchDTO extends DriverDTO {

    private String driverName;
    private String driverNumber;
    private String pickUpDate;
    private String deliveryDate;
    private boolean isCarEnclosed;

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

    public boolean getIsCarEnclosed() {
        return isCarEnclosed;
    }

    public void setIsCarEnclosed(boolean carEnclosed) {
        isCarEnclosed = carEnclosed;
    }

    @Override
    public String toString() {
        return "DispatchDTO{" +
                ", driverName='" + driverName + '\'' +
                ", driverNumber='" + driverNumber + '\'' +
                ", pickUpDate='" + pickUpDate + '\'' +
                ", deliveryDate='" + deliveryDate + '\'' +
                ", isCarEnclosed=" + isCarEnclosed +
                '}';
    }

}
