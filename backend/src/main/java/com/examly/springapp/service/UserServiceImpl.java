package com.examly.springapp.service;

import com.examly.springapp.entity.Role;
import com.examly.springapp.entity.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(User user) {

        if(userRepository.findByEmail(user.getEmail()).isPresent()){

            throw new RuntimeException("Email already exists!");

        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if(user.getRole()==null || user.getRole().isBlank()){

            user.setRole(Role.USER.name());

        }

        return userRepository.save(user);

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