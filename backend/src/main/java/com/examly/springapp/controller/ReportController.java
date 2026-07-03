package com.examly.springapp.controller;

import com.examly.springapp.dto.ReportResponse;
import com.examly.springapp.service.ReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ReportResponse getReport() {

        return reportService.generateReport();

    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/filter")
    public ReportResponse getFilteredReport(

            @RequestParam LocalDate startDate,

            @RequestParam LocalDate endDate,

            @RequestParam(required = false) Long slotId

    ) {

        return reportService.generateFilteredReport(

                startDate,

                endDate,

                slotId

        );

    }

}