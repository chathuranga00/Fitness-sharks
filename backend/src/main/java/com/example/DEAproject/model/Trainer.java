
package com.example.DEAproject.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trainers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trainer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    private String specialization;
    
    private String email;
    
    private String phone;
    
    @Column(length = 1000)
    private String description;
    
    private Integer experience;

    @Column(name = "photo_path")
    private String photoPath;
    
    private String photo; // For base64 or URL
}