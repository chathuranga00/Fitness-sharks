package com.example.DEAproject.service;

import com.example.DEAproject.dto.UserDTO;
import com.example.DEAproject.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User registerUser(UserDTO userDTO, String roleName);
    Optional<User> loginUser(String username, String password);
    List<User> getAllUsers();
    void deleteUser(Long id);
}
