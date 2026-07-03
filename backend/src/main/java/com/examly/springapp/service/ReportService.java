package com.examly.springapp.service;

import com.examly.springapp.dto.ReportResponse;

import java.time.LocalDate;

public interface ReportService {

    ReportResponse generateReport();

    ReportResponse generateFilteredReport(
            LocalDate startDate,
            LocalDate endDate,
            Long slotId
    );

}