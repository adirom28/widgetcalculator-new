package com.allcarstransport.server.dtos.order;

import org.bson.types.ObjectId;

public class DriverDTO {

    private ObjectId id;
    private String nameCarrier;
    private String contactPerson;
    private String contactEmail;
    private String contactPhoneNumber;

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

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "DriverDTO{" +
                "id=" + id +
                ", nameCarrier='" + nameCarrier + '\'' +
                ", contactPerson='" + contactPerson + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                ", contactPhoneNumber='" + contactPhoneNumber +
                '}';
    }

}
