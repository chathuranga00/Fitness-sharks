package com.example.DEAproject.security;

import com.example.DEAproject.model.User;
import com.example.DEAproject.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    public CustomUserDetailsService(UserRepository repo) { this.userRepository = repo; }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new CustomUserDetails(u);
    }
}
