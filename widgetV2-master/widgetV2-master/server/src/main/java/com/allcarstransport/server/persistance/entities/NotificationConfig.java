package com.allcarstransport.server.persistance.entities;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class NotificationConfig {

    @NotNull
    private Boolean quoteEnabled = true;
    @NotBlank
    private String quoteTemplateJSON;
    @NotBlank
    private String quoteTemplateHTML;
    @NotNull
    private Boolean bookingEnabled = true;
    @NotBlank
    private String bookingTemplateJSON;
    @NotBlank
    private String bookingTemplateHTML;
    @NotNull
    private Boolean reminderEnabled = true;
    @NotBlank
    private String reminderTemplateJSON;
    @NotBlank
    private String reminderTemplateHTML;
    @NotBlank
    private String reminderPeriod = "6h";

    public Boolean getQuoteEnabled() {
        return quoteEnabled;
    }

    public void setQuoteEnabled(Boolean quoteEnabled) {
        this.quoteEnabled = quoteEnabled;
    }

    public String getQuoteTemplateJSON() {
        return quoteTemplateJSON;
    }

    public void setQuoteTemplateJSON(String quoteTemplateJSON) {
        this.quoteTemplateJSON = quoteTemplateJSON;
    }

    public String getQuoteTemplateHTML() {
        return quoteTemplateHTML;
    }

    public void setQuoteTemplateHTML(String quoteTemplateHTML) {
        this.quoteTemplateHTML = quoteTemplateHTML;
    }

    public Boolean getBookingEnabled() {
        return bookingEnabled;
    }

    public void setBookingEnabled(Boolean bookingEnabled) {
        this.bookingEnabled = bookingEnabled;
    }

    public String getBookingTemplateJSON() {
        return bookingTemplateJSON;
    }

    public void setBookingTemplateJSON(String bookingTemplateJSON) {
        this.bookingTemplateJSON = bookingTemplateJSON;
    }

    public String getBookingTemplateHTML() {
        return bookingTemplateHTML;
    }

    public void setBookingTemplateHTML(String bookingTemplateHTML) {
        this.bookingTemplateHTML = bookingTemplateHTML;
    }

    public Boolean getReminderEnabled() {
        return reminderEnabled;
    }

    public void setReminderEnabled(Boolean reminderEnabled) {
        this.reminderEnabled = reminderEnabled;
    }

    public String getReminderTemplateJSON() {
        return reminderTemplateJSON;
    }

    public void setReminderTemplateJSON(String reminderTemplateJSON) {
        this.reminderTemplateJSON = reminderTemplateJSON;
    }

    public String getReminderTemplateHTML() {
        return reminderTemplateHTML;
    }

    public void setReminderTemplateHTML(String reminderTemplateHTML) {
        this.reminderTemplateHTML = reminderTemplateHTML;
    }

    public String getReminderPeriod() {
        return reminderPeriod;
    }

    public void setReminderPeriod(String reminderPeriod) {
        this.reminderPeriod = reminderPeriod;
    }
}
