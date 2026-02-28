package com.example.DEAproject.repository;

import com.example.DEAproject.model.MembershipPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembershipPlanRepository extends JpaRepository<MembershipPlan, Long> {
}
