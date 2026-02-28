package com.example.DEAproject.config;

import com.example.DEAproject.model.Role;
import com.example.DEAproject.model.User;
import com.example.DEAproject.model.Trainer;
import com.example.DEAproject.model.Plan;
import com.example.DEAproject.repository.RoleRepository;
import com.example.DEAproject.repository.UserRepository;
import com.example.DEAproject.repository.TrainerRepository;
import com.example.DEAproject.repository.PlanRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
@Profile("!test")
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository rr;
    private final UserRepository ur;
    private final PasswordEncoder pe;
    private final TrainerRepository trainerRepo;
    private final PlanRepository planRepo;

    public DataInitializer(RoleRepository rr, UserRepository ur, PasswordEncoder pe,
                           TrainerRepository trainerRepo, PlanRepository planRepo) {
        this.rr = rr;
        this.ur = ur;
        this.pe = pe;
        this.trainerRepo = trainerRepo;
        this.planRepo = planRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        // ===== Roles =====
        if (rr.count() == 0) {
            rr.save(new Role(null, "ADMIN"));
            rr.save(new Role(null, "TRAINER"));
            rr.save(new Role(null, "USER"));
        }

        // ===== Admin user =====
        if (ur.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@fitnessharks.com");
            // Use BCrypt to encode the password properly
            String encodedPassword = pe.encode("admin123");
            admin.setPassword(encodedPassword);
            admin.getRoles().add(rr.findByName("ADMIN").get());
            ur.save(admin);
            System.out.println("✅ Created default admin user");
            System.out.println("   Username: admin");
            System.out.println("   Password: admin123");
            System.out.println("   Email: admin@fitnessharks.com");
            System.out.println("   Password hash: " + encodedPassword);
            
            // Test the password immediately
            boolean testMatch = pe.matches("admin123", encodedPassword);
            System.out.println("   Password verification test: " + (testMatch ? "✅ PASS" : "❌ FAIL"));
        } else {
            System.out.println("ℹ️  Admin user already exists");
            User existingAdmin = ur.findByUsername("admin").get();
            System.out.println("   Email: " + existingAdmin.getEmail());
            System.out.println("   Password hash: " + existingAdmin.getPassword());
            System.out.println("   Roles: " + existingAdmin.getRoles());
            
            // Test if the existing password works
            boolean testMatch = pe.matches("admin123", existingAdmin.getPassword());
            System.out.println("   Password 'admin123' works: " + (testMatch ? "✅ YES" : "❌ NO"));
        }

        // ===== Trainers =====
        if (trainerRepo.count() == 0) {
            Trainer t1 = new Trainer();
            t1.setName("John Doe");
            t1.setSpecialization("Core Strengthening");
            t1.setEmail("john@example.com");
            t1.setPhone("+1 (555) 123-4567");
            t1.setDescription("Certified personal trainer specializing in core strengthening and functional fitness.");
            t1.setExperience(8);
            trainerRepo.save(t1);

            Trainer t2 = new Trainer();
            t2.setName("Jane Smith");
            t2.setSpecialization("Yoga & Flexibility");
            t2.setEmail("jane@example.com");
            t2.setPhone("+1 (555) 987-6543");
            t2.setDescription("Experienced yoga instructor focused on flexibility, balance, and mindfulness.");
            t2.setExperience(10);
            trainerRepo.save(t2);

            System.out.println("✅ Created default trainers");
        }

        // ===== Plans =====
        if (planRepo.count() == 0) {
            Plan p1 = new Plan();
            p1.setName("Trial");
            p1.setPrice(0.0);
            p1.setDurationMonths(1);
            planRepo.save(p1);

            Plan p2 = new Plan();
            p2.setName("Pro Membership");
            p2.setPrice(99.0);
            p2.setDurationMonths(3);
            planRepo.save(p2);

            System.out.println("✅ Created default plans");
        }
    }
}
