package com.example.DEAproject.controller;

import com.example.DEAproject.dto.UserDTO;
import com.example.DEAproject.model.Role;
import com.example.DEAproject.model.User;
import com.example.DEAproject.repository.RoleRepository;
import com.example.DEAproject.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;

    public AuthController(UserRepository ur, RoleRepository rr, PasswordEncoder pe, AuthenticationManager am) {
        this.userRepo = ur;
        this.roleRepo = rr;
        this.passwordEncoder = pe;
        this.authManager = am;
    }

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO dto) {
        if (userRepo.findByUsername(dto.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "username taken"));
        }
        if (userRepo.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "email taken"));
        }

        User u = new User();
        u.setUsername(dto.getUsername());
        u.setEmail(dto.getEmail());
        u.setPassword(passwordEncoder.encode(dto.getPassword()));
        u.setPhone(dto.getPhone()); // Save phone number

        Role userRole = roleRepo.findByName("USER")
                .orElseGet(() -> roleRepo.save(new Role(null, "USER")));
        u.getRoles().add(userRole);
        userRepo.save(u);

        return ResponseEntity.created(URI.create("/api/users/" + u.getId()))
                .body(Map.of("msg", "created"));
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body, HttpSession session) {
        String username = body.get("username");
        String password = body.get("password");

        System.out.println("🔐 Login attempt - Username: " + username);
        System.out.println("   Password received: '" + password + "'");
        System.out.println("   Password length: " + (password != null ? password.length() : "null"));

        User user = userRepo.findByUsername(username).orElse(null);
        if (user == null) {
            System.out.println("❌ User not found: " + username);
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }

        System.out.println("✅ User found: " + username);
        System.out.println("   Email: " + user.getEmail());
        System.out.println("   Roles: " + user.getRoles());
        System.out.println("   Password hash in DB (FULL): " + user.getPassword());
        System.out.println("   Password hash length: " + user.getPassword().length());
        System.out.println("   Expected hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy");
        System.out.println("   Expected length: 60");
        System.out.println("   Hashes match: " + user.getPassword().equals("$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"));
        
        // Test with the known password
        System.out.println("   Testing BCrypt with 'admin123':");
        boolean testMatch = passwordEncoder.matches("admin123", user.getPassword());
        System.out.println("   Direct 'admin123' matches: " + testMatch);
        
        System.out.println("   Testing BCrypt with received password:");
        boolean passwordMatches = passwordEncoder.matches(password, user.getPassword());
        System.out.println("   Received password matches: " + passwordMatches);
        
        // If direct test works but received doesn't, there's an issue with what's being sent
        if (testMatch && !passwordMatches) {
            System.out.println("   ⚠️ WARNING: 'admin123' works but received password doesn't!");
            System.out.println("   This means the frontend is sending the wrong password.");
        }

        if (!passwordMatches) {
            System.out.println("❌ Password does not match for user: " + username);
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }

        // Store info in session
        session.setAttribute("loggedUser", user.getUsername());
        session.setAttribute("userId", user.getId());
        session.setAttribute("roles", user.getRoles());

        // Determine role
        String role = user.getRoles().stream()
                .anyMatch(r -> "ADMIN".equals(r.getName())) ? "ADMIN" : "USER";

        System.out.println("✅ Login successful for: " + username + " (Role: " + role + ")");

        // Return user data
        return ResponseEntity.ok(Map.of(
            "msg", "logged-in",
            "user", Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "phone", user.getPhone() != null ? user.getPhone() : "",
                "role", role
            )
        ));
    }

    // Logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("msg", "logged out"));
    }

    // Check current session
    @GetMapping("/session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        String loggedUser = (String) session.getAttribute("loggedUser");
        if (loggedUser != null) {
            // Get full user data
            User user = userRepo.findByUsername(loggedUser).orElse(null);
            if (user != null) {
                String role = user.getRoles().stream()
                        .anyMatch(r -> "ADMIN".equals(r.getName())) ? "ADMIN" : "USER";
                
                return ResponseEntity.ok(Map.of(
                    "user", loggedUser,
                    "userId", user.getId(),
                    "email", user.getEmail(),
                    "phone", user.getPhone() != null ? user.getPhone() : "",
                    "role", role
                ));
            }
            return ResponseEntity.ok(Map.of("user", loggedUser));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "No active session"));
        }
    }
}
