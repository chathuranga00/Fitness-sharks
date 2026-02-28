package com.example.DEAproject.dto;

public class SubscriptionRequest {
    private Long trainerId;
    private Long planId;

    public SubscriptionRequest() {}

    public SubscriptionRequest(Long trainerId, Long planId) {
        this.trainerId = trainerId;
        this.planId = planId;
    }

    public Long getTrainerId() { return trainerId; }
    public void setTrainerId(Long trainerId) { this.trainerId = trainerId; }

    public Long getPlanId() { return planId; }
    public void setPlanId(Long planId) { this.planId = planId; }
}
