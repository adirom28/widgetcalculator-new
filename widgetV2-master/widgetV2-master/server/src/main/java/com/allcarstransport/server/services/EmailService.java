package com.allcarstransport.server.services;

import com.allcarstransport.server.dtos.email.EmailBookingNotifyRequest;
import com.allcarstransport.server.dtos.email.EmailNotifyRequest;

public interface EmailService {

    void sendNotifications(EmailNotifyRequest request);

    void sendBookingNotifications(EmailBookingNotifyRequest bookingNotifyRequest);

    void sendResetPasswordEmail(String token, String email);

}
