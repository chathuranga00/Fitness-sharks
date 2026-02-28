package com.example.DEAproject.service;

import com.example.DEAproject.dto.UserDTO;
import com.example.DEAproject.model.Role;
import com.example.DEAproject.model.User;
import com.example.DEAproject.repository.RoleRepository;
import com.example.DEAproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(UserDTO userDTO, String roleName) {
        if(userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if(userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // ENCODED
        user.setPhone(userDTO.getPhone());

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
        user.getRoles().add(role);

        return userRepository.save(user);
    }

    @Override
    public Optional<User> loginUser(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> passwordEncoder.matches(password, user.getPassword())); // MATCH ENCODED
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
