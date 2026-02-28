package com.example.DEAproject.controller;

import com.example.DEAproject.model.Plan;
import com.example.DEAproject.repository.PlanRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    private final PlanRepository planRepository;

    public PlanController(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    // ✅ Add a new training plan (Admin only)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Plan> createPlan(@RequestBody Plan plan) {
        Plan saved = planRepository.save(plan);
        return ResponseEntity.ok(saved);
    }

    // ✅ Get all training plans (everyone can view)
    @GetMapping
    public ResponseEntity<List<Plan>> getAllPlans() {
        return ResponseEntity.ok(planRepository.findAll());
    }

    // ✅ Update a plan (Admin only)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Plan> updatePlan(@PathVariable Long id, @RequestBody Plan plan) {
        if (!planRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return planRepository.findById(id).map(existing -> {
            if (plan.getName() != null) existing.setName(plan.getName());
            if (plan.getDescription() != null) existing.setDescription(plan.getDescription());
            if (plan.getDuration() != null) existing.setDuration(plan.getDuration());
            if (plan.getDifficulty() != null) existing.setDifficulty(plan.getDifficulty());
            if (plan.getPrice() != null) existing.setPrice(plan.getPrice());
            if (plan.getDurationMonths() != null) existing.setDurationMonths(plan.getDurationMonths());
            if (plan.getTrainerId() != null) existing.setTrainerId(plan.getTrainerId());
            return ResponseEntity.ok(planRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete a plan (Admin only)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePlan(@PathVariable Long id) {
        if (!planRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        planRepository.deleteById(id);
        return ResponseEntity.ok("Plan deleted successfully");
    }
}
