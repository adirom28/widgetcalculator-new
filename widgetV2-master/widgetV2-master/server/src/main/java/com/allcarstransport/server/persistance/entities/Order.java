package com.allcarstransport.server.persistance.entities;

import com.allcarstransport.server.persistance.enums.OrderStatus;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Document("order")
public class Order {

    @Id
    private ObjectId id;
    private ObjectId userId;
    @NotBlank
    private String name;
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String phone;
    @NotBlank
    private String phoneFrom;
    @NotBlank
    private String phoneTo;
    @NotBlank
    private String firstFrom;
    @NotBlank
    private String lastFrom;
    @NotBlank
    private String firstTo;
    @NotBlank
    private String lastTo;
    @NotBlank
    private String companyNameFrom;
    @NotBlank
    private String companyNameTo;
    @NotBlank
    private String addressFrom;
    @NotBlank
    private String cityFrom;
    @NotBlank
    private String stateFrom;
    @NotBlank
    private String zipCodeFrom;
    @NotBlank
    private String streetTo;
    @NotBlank
    protected String cityTo;
    @NotBlank
    private String stateTo;
    @NotBlank
    private String zipCodeTo;
    @NotNull
    private LocalDate date;
    private String comments;
    @NotBlank
    private String detail;
    @NotBlank
    private String price;
    @DBRef
    private Dispatch dispatch;
    @Version
    private Integer version;
    @CreatedDate
    private LocalDateTime created;
    @CreatedDate
    private LocalDateTime updated;
    @NotBlank
    private OrderStatus status;

    private List<OrderNote> notes;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPhoneFrom() {
        return phoneFrom;
    }

    public void setPhoneFrom(String phoneFrom) {
        this.phoneFrom = phoneFrom;
    }

    public String getPhoneTo() {
        return phoneTo;
    }

    public void setPhoneTo(String phoneTo) {
        this.phoneTo = phoneTo;
    }

    public String getFirstFrom() {
        return firstFrom;
    }

    public void setFirstFrom(String firstFrom) {
        this.firstFrom = firstFrom;
    }

    public String getLastFrom() {
        return lastFrom;
    }

    public void setLastFrom(String lastFrom) {
        this.lastFrom = lastFrom;
    }

    public String getFirstTo() {
        return firstTo;
    }

    public void setFirstTo(String firstTo) {
        this.firstTo = firstTo;
    }

    public String getLastTo() {
        return lastTo;
    }

    public void setLastTo(String lastTo) {
        this.lastTo = lastTo;
    }

    public String getCompanyNameFrom() {
        return companyNameFrom;
    }

    public void setCompanyNameFrom(String companyNameFrom) {
        this.companyNameFrom = companyNameFrom;
    }

    public String getCompanyNameTo() {
        return companyNameTo;
    }

    public void setCompanyNameTo(String companyNameTo) {
        this.companyNameTo = companyNameTo;
    }

    public String getAddressFrom() {
        return addressFrom;
    }

    public void setAddressFrom(String addressFrom) {
        this.addressFrom = addressFrom;
    }

    public String getCityFrom() {
        return cityFrom;
    }

    public void setCityFrom(String cityFrom) {
        this.cityFrom = cityFrom;
    }

    public String getStateFrom() {
        return stateFrom;
    }

    public void setStateFrom(String stateFrom) {
        this.stateFrom = stateFrom;
    }

    public String getZipCodeFrom() {
        return zipCodeFrom;
    }

    public void setZipCodeFrom(String zipCodeFrom) {
        this.zipCodeFrom = zipCodeFrom;
    }

    public String getStreetTo() {
        return streetTo;
    }

    public void setStreetTo(String streetTo) {
        this.streetTo = streetTo;
    }

    public String getCityTo() {
        return cityTo;
    }

    public void setCityTo(String cityTo) {
        this.cityTo = cityTo;
    }

    public String getStateTo() {
        return stateTo;
    }

    public void setStateTo(String stateTo) {
        this.stateTo = stateTo;
    }

    public String getZipCodeTo() {
        return zipCodeTo;
    }

    public void setZipCodeTo(String zipCodeTo) {
        this.zipCodeTo = zipCodeTo;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getUserId() {
        return userId;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public LocalDateTime getUpdated() {
        return updated;
    }

    public void setUpdated(LocalDateTime updated) {
        this.updated = updated;
    }

    public Dispatch getDispatch() {
        return dispatch;
    }

    public void setDispatch(Dispatch dispatch) {
        this.dispatch = dispatch;
    }

    public List<OrderNote> getNotes() {
        return Optional.ofNullable(notes).orElse(new ArrayList<>());
    }

    public void setNotes(List<OrderNote> notes) {
        this.notes = notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Order)) return false;
        Order order = (Order) o;
        return Objects.equals(getId(), order.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", status=" + status +
                '}';
    }

}
