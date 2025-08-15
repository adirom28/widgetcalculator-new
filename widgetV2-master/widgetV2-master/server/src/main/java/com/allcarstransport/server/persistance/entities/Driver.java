package com.allcarstransport.server.persistance.entities;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

@Document(Driver.DOCUMENT_NAME)
public class Driver {

    public static final String DOCUMENT_NAME = "driver";

    @Id
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
        return "Driver{" +
                "id=" + id +
                ", nameCarrier='" + nameCarrier + '\'' +
                ", contactPerson='" + contactPerson + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                ", contactPhoneNumber='" + contactPhoneNumber +
                '}';
    }

}
