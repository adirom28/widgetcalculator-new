package com.allcarstransport.server.dtos.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class NotificationConfigDTO {

    @NotNull
    private Boolean quoteEnabled;
    @NotBlank
    private String quoteTemplateJSON;
    @NotBlank
    private String quoteTemplateHTML;
    @NotNull
    private Boolean bookingEnabled;
    @NotBlank
    private String bookingTemplateJSON;
    @NotBlank
    private String bookingTemplateHTML;
    @NotNull
    private Boolean reminderEnabled;
    @NotBlank
    private String reminderTemplateJSON;
    @NotBlank
    private String reminderTemplateHTML;
    @NotBlank
    private String reminderPeriod;

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

    @Override
    public String toString() {
        return "NotificationConfigDTO{" +
                "quoteEnabled=" + quoteEnabled +
                ", quoteTemplateJSON='" + quoteTemplateJSON + '\'' +
                ", quoteTemplateHTML='" + quoteTemplateHTML + '\'' +
                ", bookingEnabled=" + bookingEnabled +
                ", bookingTemplateJSON='" + bookingTemplateJSON + '\'' +
                ", bookingTemplateHTML='" + bookingTemplateHTML + '\'' +
                ", reminderEnabled=" + reminderEnabled +
                ", reminderTemplateJSON='" + reminderTemplateJSON + '\'' +
                ", reminderTemplateHTML='" + reminderTemplateHTML + '\'' +
                ", reminderPeriod='" + reminderPeriod + '\'' +
                '}';
    }
}
