package com.example.DEAproject.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false) // Membership is mandatory
    @JoinColumn(name = "membership_id")
    private MembershipPlan membershipPlan;

    @ManyToOne(optional = true) // Training plan optional
    @JoinColumn(name = "training_plan_id")
    private Plan plan;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate startDate;
    private LocalDate endDate;

    // Getters & Setters
    public Long getId() { return id; }

    public MembershipPlan getMembershipPlan() { return membershipPlan; }
    public void setMembershipPlan(MembershipPlan membershipPlan) { this.membershipPlan = membershipPlan; }

    public Plan getPlan() { return plan; }
    public void setPlan(Plan plan) { this.plan = plan; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
}
