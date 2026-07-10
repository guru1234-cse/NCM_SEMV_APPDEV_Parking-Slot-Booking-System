package com.examly.springapp.controller;

import com.examly.springapp.dto.DashboardResponse;
import com.examly.springapp.service.DashboardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public DashboardResponse getDashboard() {

        return dashboardService.getDashboardStatistics();

    }

}