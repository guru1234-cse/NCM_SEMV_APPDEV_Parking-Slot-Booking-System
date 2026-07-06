package com.examly.springapp.controller;

import com.examly.springapp.entity.Booking;
import com.examly.springapp.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Create Booking
    @PreAuthorize("hasRole('USER')")
@PostMapping
public Booking createBooking(@Valid @RequestBody Booking booking) {
    return bookingService.createBooking(booking);
}

    // Get All Bookings
   @PreAuthorize("hasAnyRole('ADMIN','USER')")
@GetMapping
public List<Booking> getAllBookings() {
    return bookingService.getAllBookings();
}

   @PreAuthorize("hasAnyRole('ADMIN','USER')")
@GetMapping("/{id}")
public Booking getBookingById(@PathVariable Long id) {
    return bookingService.getBookingById(id);
}
   @PreAuthorize("hasAnyRole('ADMIN','USER')")
@GetMapping("/user/{userId}")
public List<Booking> getBookingsByUser(@PathVariable Long userId) {
    return bookingService.getBookingsByUser(userId);
}

   @PreAuthorize("hasAnyRole('ADMIN','USER')")
@GetMapping("/status/{status}")
public List<Booking> getBookingsByStatus(@PathVariable String status) {
    return bookingService.getBookingsByStatus(status);
}

   @PreAuthorize("hasRole('USER')")
@PutMapping("/cancel/{id}")
public String cancelBooking(@PathVariable Long id) {

    bookingService.cancelBooking(id);

    return "Booking cancelled successfully";
}

@PreAuthorize("hasAnyRole('ADMIN','USER')")
@DeleteMapping("/clear-history")
public String clearBookingHistory() {

    bookingService.clearBookingHistory();

    return "Booking history cleared successfully";
}
}