package com.allcarstransport.server.dtos.order;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.util.List;

public class OrderDTO {

    @NotBlank
    protected String name;
    @Email
    @NotBlank
    protected String email;
    @NotBlank
    protected String phone;
    @NotBlank
    protected String phoneFrom;
    @NotBlank
    protected String phoneTo;
    @NotBlank
    protected String firstFrom;
    @NotBlank
    protected String lastFrom;
    @NotBlank
    protected String firstTo;
    @NotBlank
    protected String lastTo;
    @NotBlank
    protected String companyNameFrom;
    @NotBlank
    protected String companyNameTo;
    @NotBlank
    protected String addressFrom;
    @NotBlank
    protected String cityFrom;
    @NotBlank
    protected String stateFrom;
    @Pattern(regexp = "^\\d{5}(-\\d{4})?$")
    protected String zipCodeFrom;
    @NotBlank
    protected String streetTo;
    @NotBlank
    protected String cityTo;
    @NotBlank
    protected String stateTo;
    @Pattern(regexp = "^\\d{5}(-\\d{4})?$")
    protected String zipCodeTo;
    @NotNull
    protected LocalDate date;
    protected String comments;
    @NotBlank
    protected String detail;
    @NotBlank
    protected String price;
    protected List<NoteDTO> notes;

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

    public List<NoteDTO> getNotes() {
        return notes;
    }

    public void setNotes(List<NoteDTO> notes) {
        this.notes = notes;
    }

}
