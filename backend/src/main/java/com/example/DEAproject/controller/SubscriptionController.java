package com.example.DEAproject.controller;

import com.example.DEAproject.model.Subscription;
import com.example.DEAproject.service.SubscriptionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(origins = "*")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    // ✅ Subscribe user to membership and optional plan
    @PostMapping("/subscribe")
    public Subscription subscribeUser(@RequestParam Long userId,
                                      @RequestParam(required = false) Long planId,
                                      @RequestParam Long membershipId) {
        return subscriptionService.subscribeUser(userId, planId, membershipId);
    }

    // ✅ Get all subscriptions (Admin use)
    @GetMapping
    public List<Subscription> getAllSubscriptions() {
        return subscriptionService.getAllSubscriptions();
    }

    // ✅ View my subscriptions by userId
    @GetMapping("/user/{userId}")
    public List<Subscription> getUserSubscriptions(@PathVariable Long userId) {
        return subscriptionService.getSubscriptionsByUser(userId);
    }
}
