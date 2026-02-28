package com.example.DEAproject.controller;

import com.example.DEAproject.dto.UserDTO;
import com.example.DEAproject.model.Role;
import com.example.DEAproject.model.User;
import com.example.DEAproject.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Sign up (public)
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(
            @Valid @RequestBody UserDTO userDTO,
            @RequestParam(defaultValue = "CUSTOMER") String role
    ) {
        User savedUser = userService.registerUser(userDTO, role);
        return ResponseEntity.ok(savedUser);
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO, HttpSession session) {
        Optional<User> user = userService.loginUser(userDTO.getUsername(), userDTO.getPassword());

        if (user.isPresent()) {
            session.setAttribute("loggedUser", user.get().getUsername());
            session.setAttribute("roles", user.get().getRoles());
            return ResponseEntity.ok("Login successful, session created!");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    // Check session
    @GetMapping("/session")
    public ResponseEntity<String> checkSession(HttpSession session) {
        String loggedUser = (String) session.getAttribute("loggedUser");
        if (loggedUser != null) {
            return ResponseEntity.ok("Current session user: " + loggedUser);
        } else {
            return ResponseEntity.status(401).body("No active session!");
        }
    }

    // Logout
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully, session destroyed!");
    }

    // Admin-only: Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(HttpSession session) {
        if (!isAdmin(session)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Admin-only: Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, HttpSession session) {
        if (!isAdmin(session)) {
            return ResponseEntity.status(403).body(java.util.Map.of("error", "Admin access required"));
        }
        
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(java.util.Map.of("message", "User deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(java.util.Map.of("error", "User not found"));
        }
    }

    // Helper: check if session user is admin
    private boolean isAdmin(HttpSession session) {
        Set<Role> roles = (Set<Role>) session.getAttribute("roles");
        if (roles == null) return false;
        return roles.stream().anyMatch(role -> "ADMIN".equals(role.getName()));
    }
}
