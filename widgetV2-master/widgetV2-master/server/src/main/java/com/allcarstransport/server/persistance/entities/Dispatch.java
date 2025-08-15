package com.allcarstransport.server.persistance.entities;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

@Document(Dispatch.DOCUMENT_NAME)
public class Dispatch {

    public static final String DOCUMENT_NAME = "dispatch";

    @Id
    private ObjectId id;
    private String driverName;
    private String driverNumber;
    private String pickUpDate;
    private String deliveryDate;
    private boolean isCarEnclosed;
    @DBRef
    private Driver driver;

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

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Driver)) return false;
        Driver driver = (Driver) o;
        return Objects.equals(getId(), driver.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Dispatch{" +
                "id=" + id +
                ", driverName='" + driverName + '\'' +
                ", driverNumber='" + driverNumber + '\'' +
                ", pickUpDate='" + pickUpDate + '\'' +
                ", deliveryDate='" + deliveryDate + '\'' +
                ", isCarEnclosed=" + isCarEnclosed +
                '}';
    }

}
