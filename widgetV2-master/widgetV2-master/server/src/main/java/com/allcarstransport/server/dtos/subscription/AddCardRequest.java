package com.allcarstransport.server.dtos.subscription;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class AddCardRequest {

    @NotBlank
    private String number;
    @NotBlank
    @Pattern(regexp = "^[0-9]{3,4}$")
    private String cvc;
    @NotNull
    @Min(2022)
    private Long year;
    @NotNull
    @Min(1)
    @Max(12)
    private Long month;

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCvc() {
        return cvc;
    }

    public void setCvc(String cvc) {
        this.cvc = cvc;
    }

    public Long getYear() {
        return year;
    }

    public void setYear(Long year) {
        this.year = year;
    }

    public Long getMonth() {
        return month;
    }

    public void setMonth(Long month) {
        this.month = month;
    }

}
