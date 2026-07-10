package com.examly.springapp.service;

import com.examly.springapp.model.Booking;
import java.util.List;

public interface BookingService {
    void clearBookingHistory();
    Booking createBooking(Booking booking);

    List<Booking> getAllBookings();

    Booking getBookingById(Long id);

    List<Booking> getBookingsByUser(Long userId);

    List<Booking> getBookingsByStatus(String status);

    void cancelBooking(Long id);

    
}