package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, Object> health() {

        Map<String, Object> response = new HashMap<>();

        response.put("status", "UP");
        response.put("application", "Parking Slot Booking System");
        response.put("timestamp", LocalDateTime.now());

        return response;
    }
}