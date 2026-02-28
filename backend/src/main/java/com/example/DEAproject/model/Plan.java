package com.example.DEAproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "plans")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private Integer durationMonths;
    
    @Column(length = 1000)
    private String description;
    
    private String duration; // e.g., "4 weeks", "8 weeks"
    
    private String difficulty; // e.g., "Beginner", "Intermediate", "Advanced"
    
    private Long trainerId; // ID of assigned trainer

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getDurationMonths() { return durationMonths; }
    public void setDurationMonths(Integer durationMonths) { this.durationMonths = durationMonths; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    
    public Long getTrainerId() { return trainerId; }
    public void setTrainerId(Long trainerId) { this.trainerId = trainerId; }
}
