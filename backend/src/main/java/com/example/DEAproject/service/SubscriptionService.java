package com.example.DEAproject.service;

import com.example.DEAproject.model.Subscription;
import java.util.List;

public interface SubscriptionService {
    Subscription subscribeUser(Long userId, Long planId, Long membershipId);
    List<Subscription> getSubscriptionsByUser(Long userId);
    List<Subscription> getAllSubscriptions();
}
