package com.examly.springapp.service;

import com.examly.springapp.dto.ReportResponse;
import com.examly.springapp.entity.Booking;
import com.examly.springapp.repository.BookingRepository;
import com.examly.springapp.repository.ParkingSlotRepository;
import com.examly.springapp.repository.PaymentRepository;
import com.examly.springapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public ReportResponse generateReport() {

        long totalUsers = userRepository.count();
        long totalSlots = parkingSlotRepository.count();
        long availableSlots = parkingSlotRepository.countByStatus("AVAILABLE");
        long bookedSlots = parkingSlotRepository.countByStatus("BOOKED");
        long cancelledBookings = bookingRepository.countByStatus("CANCELLED");
        long totalBookings = bookingRepository.count();

        Double totalRevenue = paymentRepository.getTotalRevenue();
        if (totalRevenue == null) {
            totalRevenue = 0.0;
        }

        long totalPayments = paymentRepository.countByPaymentStatus("SUCCESS");

        Double occupancyPercentage = 0.0;

        if (totalSlots > 0) {
            occupancyPercentage = (bookedSlots * 100.0) / totalSlots;
        }

        return new ReportResponse(
                totalUsers,
                totalSlots,
                availableSlots,
                bookedSlots,
                cancelledBookings,
                totalBookings,
                totalRevenue,
                totalPayments,
                occupancyPercentage
        );
    }

    @Override
    public ReportResponse generateFilteredReport(
            LocalDate startDate,
            LocalDate endDate,
            Long slotId) {

        List<Booking> bookings;

        if (slotId != null) {

            bookings = bookingRepository.findBySlotIdAndBookingTimeBetween(
                    slotId,
                    startDate.atStartOfDay(),
                    endDate.atTime(23, 59, 59)
            );

        } else {

            bookings = bookingRepository.findByBookingTimeBetween(
                    startDate.atStartOfDay(),
                    endDate.atTime(23, 59, 59)
            );

        }

        long totalBookings = bookings.size();

        long cancelledBookings = bookings.stream()
                .filter(b -> "CANCELLED".equalsIgnoreCase(b.getStatus()))
                .count();

        long bookedSlots = bookings.stream()
                .filter(b -> "BOOKED".equalsIgnoreCase(b.getStatus()))
                .count();

        long totalSlots = parkingSlotRepository.count();
        long availableSlots = parkingSlotRepository.countByStatus("AVAILABLE");

       Double totalRevenue = paymentRepository.getTotalRevenue();
if (totalRevenue == null) {
    totalRevenue = 0.0;
}

        long totalPayments = paymentRepository.countByPaymentStatus("SUCCESS");

        Double occupancyPercentage = 0.0;

        if (totalSlots > 0) {
            occupancyPercentage = (bookedSlots * 100.0) / totalSlots;
        }

        return new ReportResponse(
                userRepository.count(),
                totalSlots,
                availableSlots,
                bookedSlots,
                cancelledBookings,
                totalBookings,
                totalRevenue,
                totalPayments,
                occupancyPercentage
        );
    }
}