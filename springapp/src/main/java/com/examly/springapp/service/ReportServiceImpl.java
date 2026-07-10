package com.examly.springapp.service;

import com.examly.springapp.dto.ReportResponse;
import com.examly.springapp.model.Booking;
import com.examly.springapp.repository.BookingRepository;
import com.examly.springapp.repository.ParkingSlotRepository;
import com.examly.springapp.repository.PaymentRepository;
import com.examly.springapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

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

    private List<Map<String, Object>> toBookingsPerDay(List<Booking> bookings) {
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Map<String, Long> grouped = bookings.stream()
                .filter(b -> b.getBookingTime() != null)
                .collect(Collectors.groupingBy(
                        b -> b.getBookingTime().toLocalDate().format(fmt),
                        TreeMap::new,
                        Collectors.counting()
                ));
        List<Map<String, Object>> result = new ArrayList<>();
        grouped.forEach((date, count) -> {
            Map<String, Object> entry = new LinkedHashMap<>();
            entry.put("date", date);
            entry.put("count", count);
            result.add(entry);
        });
        return result;
    }

    @Override
    public ReportResponse generateReport() {

        long totalUsers = userRepository.count();
        long totalSlots = parkingSlotRepository.count();
        long availableSlots = parkingSlotRepository.countByStatus("AVAILABLE");
        long bookedSlots = parkingSlotRepository.countByStatus("BOOKED");
        long cancelledBookings = bookingRepository.countByStatus("CANCELLED");
        long totalBookings = bookingRepository.count();

        Double totalRevenue = paymentRepository.getTotalRevenue();
        if (totalRevenue == null) totalRevenue = 0.0;

        long totalPayments = paymentRepository.countByPaymentStatus("SUCCESS");
        Double occupancyPercentage = totalSlots > 0 ? (bookedSlots * 100.0) / totalSlots : 0.0;

        List<Booking> allBookings = bookingRepository.findAll();

        return new ReportResponse(
                totalUsers, totalSlots, availableSlots, bookedSlots,
                cancelledBookings, totalBookings, totalRevenue,
                totalPayments, occupancyPercentage,
                toBookingsPerDay(allBookings), allBookings
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
                .filter(b -> "CANCELLED".equalsIgnoreCase(b.getStatus())).count();
        long bookedSlots = bookings.stream()
                .filter(b -> "BOOKED".equalsIgnoreCase(b.getStatus())).count();
        long totalSlots = parkingSlotRepository.count();
        long availableSlots = parkingSlotRepository.countByStatus("AVAILABLE");

        List<Long> bookingIds = bookings.stream().map(Booking::getId).toList();

        Double totalRevenue = bookingIds.isEmpty() ? 0.0
                : paymentRepository.getRevenueByBookingIds(bookingIds);
        if (totalRevenue == null) totalRevenue = 0.0;

        long totalPayments = bookingIds.isEmpty() ? 0
                : paymentRepository.countSuccessfulByBookingIds(bookingIds);

        Double occupancyPercentage = totalSlots > 0 ? (bookedSlots * 100.0) / totalSlots : 0.0;

        return new ReportResponse(
                userRepository.count(), totalSlots, availableSlots, bookedSlots,
                cancelledBookings, totalBookings, totalRevenue,
                totalPayments, occupancyPercentage,
                toBookingsPerDay(bookings), bookings
        );
    }
}
