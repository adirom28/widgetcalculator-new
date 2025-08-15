package com.allcarstransport.server.controllers;

import com.allcarstransport.server.services.EmailService;
import com.allcarstransport.server.dtos.email.EmailBookingNotifyRequest;
import com.allcarstransport.server.dtos.email.EmailNotifyRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailController {

    private final EmailService service;

    public EmailController(EmailService service) {
        this.service = service;
    }

    @PostMapping("/notify")
    public void notify(@RequestBody EmailNotifyRequest emailNotifyRequest) {
        service.sendNotifications(emailNotifyRequest);
    }

    @PostMapping("/booking/notify")
    public void notifyBooking(@RequestBody EmailBookingNotifyRequest bookingNotifyRequest) {
        service.sendBookingNotifications(bookingNotifyRequest);
    }

}
