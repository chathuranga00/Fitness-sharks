package com.example.DEAproject.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "membership_plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MembershipPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // e.g. "Trial", "Pro", "Premium"

    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(name = "duration_months", nullable = false)
    private Integer durationMonths; // e.g. 1, 3, 6, 12
}
