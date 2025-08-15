package com.allcarstransport.server.dtos.subscription;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class SubscriptionStatus {

    private final String subscriptionId;
    private final String cardId;
    private final String cardNumber;
    private final Long cardExtYear;
    private final Long cardExtMonth;
    @JsonFormat(pattern="YYYY-MM-dd HH:mm:ss")
    private final LocalDateTime activeUntil;
    @JsonFormat(pattern="YYYY-MM-dd HH:mm:ss")
    private final LocalDateTime paidTime;

    public SubscriptionStatus(String subscriptionId, String cardId, String cardNumber,
                              Long cardExtYear, Long cardExtMonth, LocalDateTime activeUntil,
                              LocalDateTime paidTime) {
        this.subscriptionId = subscriptionId;
        this.cardId = cardId;
        this.cardNumber = cardNumber;
        this.cardExtYear = cardExtYear;
        this.cardExtMonth = cardExtMonth;
        this.activeUntil = activeUntil;
        this.paidTime = paidTime;
    }

    public Long getCardExtMonth() {
        return cardExtMonth;
    }

    public Long getCardExtYear() {
        return cardExtYear;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public String getSubscriptionId() {
        return subscriptionId;
    }

    public String getCardId() {
        return cardId;
    }

    public LocalDateTime getActiveUntil() {
        return activeUntil;
    }

    public LocalDateTime getPaidTime() {
        return paidTime;
    }

    @Override
    public String toString() {
        return "SubscriptionStatus{" +
                "subscriptionId='" + subscriptionId + '\'' +
                ", cardId='" + cardId + '\'' +
                ", cardNumber='" + cardNumber + '\'' +
                ", cardExtYear=" + cardExtYear +
                ", cardExtMonth=" + cardExtMonth +
                ", activeUntil=" + activeUntil +
                ", paidTime=" + paidTime +
                '}';
    }

}
