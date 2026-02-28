package com.example.DEAproject.repository;

import com.example.DEAproject.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByUserId(Long userId);
}
