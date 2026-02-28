package com.example.DEAproject.service;

import com.example.DEAproject.model.Trainer;
import java.util.List;
import java.util.Optional;

public interface TrainerService {
    Trainer addTrainer(Trainer trainer);
    List<Trainer> getAllTrainers();
    Optional<Trainer> getTrainerById(Long id);
    Trainer updateTrainer(Long id, Trainer trainer);
    void deleteTrainer(Long id);
}
