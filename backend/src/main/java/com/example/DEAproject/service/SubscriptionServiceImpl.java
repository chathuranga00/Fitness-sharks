package com.example.DEAproject.service;

import com.example.DEAproject.model.*;
import com.example.DEAproject.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final PlanRepository planRepository;
    private final MembershipPlanRepository membershipPlanRepository;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository,
                                   UserRepository userRepository,
                                   PlanRepository planRepository,
                                   MembershipPlanRepository membershipPlanRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.planRepository = planRepository;
        this.membershipPlanRepository = membershipPlanRepository;
    }

    @Override
    public Subscription subscribeUser(Long userId, Long planId, Long membershipId) {
        // User check
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Membership required
        MembershipPlan membership = membershipPlanRepository.findById(membershipId)
                .orElseThrow(() -> new RuntimeException("Membership not found"));

        // Training plan optional
        Plan plan = null;
        if (planId != null) {
            plan = planRepository.findById(planId)
                    .orElseThrow(() -> new RuntimeException("Plan not found"));
        }

        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setMembershipPlan(membership);
        subscription.setPlan(plan);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusMonths(membership.getDurationMonths()));

        return subscriptionRepository.save(subscription);
    }

    @Override
    public List<Subscription> getSubscriptionsByUser(Long userId) {
        return subscriptionRepository.findByUserId(userId);
    }

    @Override
    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }
}
