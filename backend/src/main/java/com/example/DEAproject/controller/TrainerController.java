package com.example.DEAproject.controller;

import com.example.DEAproject.model.Trainer;
import com.example.DEAproject.service.TrainerService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {

    private final TrainerService trainerService;

    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    private boolean isAdmin(HttpSession session) {
        String loggedUser = (String) session.getAttribute("loggedUser");
        System.out.println("🔍 Checking admin access - Logged user: " + loggedUser);
        
        if (loggedUser == null) {
            System.out.println("❌ No logged user in session");
            return false;
        }
        
        // Simple check: if username is "admin", they're admin
        if ("admin".equals(loggedUser)) {
            System.out.println("✅ User is admin (by username)");
            return true;
        }
        
        // Check roles from session
        Set<?> roles = (Set<?>) session.getAttribute("roles");
        System.out.println("🔍 Roles in session: " + roles);
        
        if (roles == null) {
            System.out.println("❌ No roles in session");
            return false;
        }
        
        boolean hasAdminRole = roles.stream().anyMatch(r -> {
            String roleStr = r.toString();
            System.out.println("🔍 Checking role: " + roleStr);
            return roleStr.contains("ADMIN");
        });
        
        System.out.println(hasAdminRole ? "✅ Has ADMIN role" : "❌ No ADMIN role found");
        return hasAdminRole;
    }

    // Add new trainer - only admin
    @PostMapping
    public ResponseEntity<?> addTrainer(@RequestBody Trainer trainer, HttpSession session) {
        try {
            if (!isAdmin(session)) {
                return ResponseEntity.status(403).body(java.util.Map.of("error", "Admin access required"));
            }
            System.out.println("📝 Adding trainer: " + trainer.getName());
            Trainer saved = trainerService.addTrainer(trainer);
            System.out.println("✅ Trainer added successfully with ID: " + saved.getId());
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            System.err.println("❌ Error adding trainer: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(java.util.Map.of("error", e.getMessage()));
        }
    }

    // Debug endpoint to check session
    @GetMapping("/debug-session")
    public ResponseEntity<?> debugSession(HttpSession session) {
        String loggedUser = (String) session.getAttribute("loggedUser");
        Set<?> roles = (Set<?>) session.getAttribute("roles");
        Long userId = (Long) session.getAttribute("userId");
        
        return ResponseEntity.ok(java.util.Map.of(
            "loggedUser", loggedUser != null ? loggedUser : "null",
            "userId", userId != null ? userId : "null",
            "roles", roles != null ? roles.toString() : "null",
            "isAdmin", isAdmin(session)
        ));
    }

    @GetMapping
    public ResponseEntity<List<Trainer>> getAllTrainers() {
        return ResponseEntity.ok(trainerService.getAllTrainers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trainer> getTrainerById(@PathVariable Long id) {
        return trainerService.getTrainerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTrainer(@PathVariable Long id, @RequestBody Trainer trainer, HttpSession session) {
        try {
            if (!isAdmin(session)) {
                return ResponseEntity.status(403).body(java.util.Map.of("error", "Admin access required"));
            }
            System.out.println("📝 Updating trainer ID: " + id);
            Trainer updated = trainerService.updateTrainer(id, trainer);
            System.out.println("✅ Trainer updated successfully");
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            System.err.println("❌ Error updating trainer: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(java.util.Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTrainer(@PathVariable Long id, HttpSession session) {
        try {
            if (!isAdmin(session)) {
                return ResponseEntity.status(403).body(java.util.Map.of("error", "Admin access required"));
            }
            System.out.println("🗑️ Deleting trainer ID: " + id);
            trainerService.deleteTrainer(id);
            System.out.println("✅ Trainer deleted successfully");
            return ResponseEntity.ok(java.util.Map.of("message", "Trainer deleted successfully"));
        } catch (Exception e) {
            System.err.println("❌ Error deleting trainer: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(java.util.Map.of("error", e.getMessage()));
        }
    }
}
