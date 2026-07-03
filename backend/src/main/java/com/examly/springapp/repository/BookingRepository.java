package com.examly.springapp.repository;

import com.examly.springapp.entity.Booking;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByStatus(String status);

    long countByStatus(String status);

    // Report Filters
    List<Booking> findByBookingTimeBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    List<Booking> findBySlotId(Long slotId);

    List<Booking> findBySlotIdAndBookingTimeBetween(
            Long slotId,
            LocalDateTime start,
            LocalDateTime end
    );

}