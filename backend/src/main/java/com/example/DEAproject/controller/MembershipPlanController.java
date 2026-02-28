package com.example.DEAproject.controller;

import com.example.DEAproject.model.MembershipPlan;
import com.example.DEAproject.service.MembershipPlanService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/memberships") // clear URL
public class MembershipPlanController {

    @Autowired
    private MembershipPlanService planService;

    // ✅ Get all memberships
    @GetMapping
    public List<MembershipPlan> getAllMemberships() {
        return planService.getAllPlans();
    }

    // ✅ Get one by ID
    @GetMapping("/{id}")
    public ResponseEntity<MembershipPlan> getMembershipById(@PathVariable Long id) {
        return planService.getPlanById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Admin adds membership
    @PostMapping
    public ResponseEntity<MembershipPlan> createMembership(@RequestBody MembershipPlan plan, HttpSession session) {
        if(!isAdmin(session)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(planService.savePlan(plan));
    }

    // ✅ Admin updates membership
    @PutMapping("/{id}")
    public ResponseEntity<MembershipPlan> updateMembership(@PathVariable Long id,
                                                           @RequestBody MembershipPlan planDetails,
                                                           HttpSession session) {
        if(!isAdmin(session)) return ResponseEntity.status(403).build();

        return planService.getPlanById(id)
                .map(plan -> {
                    plan.setName(planDetails.getName());
                    plan.setDescription(planDetails.getDescription());
                    plan.setPrice(planDetails.getPrice());
                    plan.setDurationMonths(planDetails.getDurationMonths());
                    return ResponseEntity.ok(planService.savePlan(plan));
                }).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Admin deletes membership
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMembership(@PathVariable Long id, HttpSession session) {
        if(!isAdmin(session)) return ResponseEntity.status(403).build();
        planService.deletePlan(id);
        return ResponseEntity.noContent().build();
    }

    // Helper
    private boolean isAdmin(HttpSession session) {
        @SuppressWarnings("unchecked")
        Set<com.example.DEAproject.model.Role> roles = (Set<com.example.DEAproject.model.Role>) session.getAttribute("roles");
        if(roles == null) return false;
        return roles.stream().anyMatch(r -> "ADMIN".equals(r.getName()));
    }
}
