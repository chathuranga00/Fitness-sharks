package com.example.DEAproject.service;

import com.example.DEAproject.model.MembershipPlan;
import com.example.DEAproject.repository.MembershipPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MembershipPlanService {

    @Autowired
    private MembershipPlanRepository planRepository;

    // Get all plans
    public List<MembershipPlan> getAllPlans() {
        return planRepository.findAll();
    }

    // Get plan by ID
    public Optional<MembershipPlan> getPlanById(Long id) {
        return planRepository.findById(id);
    }

    // Save or update plan
    public MembershipPlan savePlan(MembershipPlan plan) {
        return planRepository.save(plan);
    }

    // Delete plan
    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }
}
