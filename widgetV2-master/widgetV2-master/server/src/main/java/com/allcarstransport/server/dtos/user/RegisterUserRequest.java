package com.allcarstransport.server.dtos.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

public class RegisterUserRequest {

    @NotBlank
    private String companyName;
    @NotEmpty
    @Email
    private String email;
    @NotEmpty
    @Pattern(regexp = "^[A-Za-z0-9^$*+-?()\\[\\]{}—#@!%&]{6,15}$")
    private String password;
    @NotBlank
    private String domain;
    private String logo;
    @NotBlank
    private String streetAddress;
    @NotBlank
    private String secondStreetAddress;
    @NotBlank
    private String cityAddress;
    @NotBlank
    private String stateAddress;
    @NotBlank
    @Pattern(regexp = "^\\d{5}(-\\d{4})?$")
    private String zipCode;
    @NotBlank
    private String phoneNumber;

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getSecondStreetAddress() {
        return secondStreetAddress;
    }

    public void setSecondStreetAddress(String secondStreetAddress) {
        this.secondStreetAddress = secondStreetAddress;
    }

    public String getCityAddress() {
        return cityAddress;
    }

    public void setCityAddress(String cityAddress) {
        this.cityAddress = cityAddress;
    }

    public String getStateAddress() {
        return stateAddress;
    }

    public void setStateAddress(String stateAddress) {
        this.stateAddress = stateAddress;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public String toString() {
        return "RegisterUserRequest{" +
                "companyName='" + companyName + '\'' +
                ", email='" + email + '\'' +
                ", domain='" + domain + '\'' +
                ", logo='" + logo + '\'' +
                ", streetAddress='" + streetAddress + '\'' +
                ", secondStreetAddress='" + secondStreetAddress + '\'' +
                ", cityAddress='" + cityAddress + '\'' +
                ", stateAddress='" + stateAddress + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }

}
