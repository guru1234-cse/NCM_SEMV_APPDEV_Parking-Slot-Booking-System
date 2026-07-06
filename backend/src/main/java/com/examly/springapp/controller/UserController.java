package com.examly.springapp.controller;

import com.examly.springapp.entity.User;
import com.examly.springapp.service.UserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // ADMIN can create users
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public User createUser(@Valid @RequestBody User user) {

        return userService.createUser(user);

    }

  @PreAuthorize("hasAnyRole('ADMIN','USER')")
@GetMapping
public List<User> getAllUsers() {

    return userService.getAllUsers();

}

    // ADMIN can delete users
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return "User deleted successfully";

    }

    // Health endpoint accessible to ADMIN and USER
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/health")
    public Map<String, String> health() {

        return Map.of("status", "UP");

    }

}