package com.allcarstransport.server.controllers;

import com.allcarstransport.server.dtos.subscription.AddCardRequest;
import com.allcarstransport.server.dtos.subscription.CreateSubscriptionRequest;
import com.allcarstransport.server.dtos.subscription.SubscriptionStatus;
import com.allcarstransport.server.dtos.subscription.SubscriptionType;
import com.allcarstransport.server.security.CurrentUser;
import com.allcarstransport.server.services.SubscriptionService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/types")
    public List<SubscriptionType> getTypes() {

        return subscriptionService.getTypes();

    }

    @PostMapping("/cards")
    public void addCard(@RequestBody AddCardRequest request, @AuthenticationPrincipal CurrentUser user) {

        subscriptionService.addCard(request, user);

    }

    @DeleteMapping("/cards/{id}")
    public void deleteCard(@PathVariable("id") String id, @AuthenticationPrincipal CurrentUser user)  {

        subscriptionService.deleteCard(id, user);

    }

    @PostMapping
    public void subscribe(@RequestBody CreateSubscriptionRequest request, @AuthenticationPrincipal CurrentUser user) {

        subscriptionService.subscribe(request, user);
    }

    @DeleteMapping("/{id}")
    public void unsubscribe(@PathVariable("id") String id, @AuthenticationPrincipal CurrentUser user) {

        subscriptionService.unsubscribe(id, user);

    }

    @GetMapping
    public SubscriptionStatus getStatus(@AuthenticationPrincipal CurrentUser user) {

        return subscriptionService.getStatus(user);

    }

}
