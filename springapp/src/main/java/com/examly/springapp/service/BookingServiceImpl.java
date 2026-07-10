package com.examly.springapp.service;

import com.examly.springapp.model.Booking;
import com.examly.springapp.model.ParkingSlot;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.BookingRepository;
import com.examly.springapp.repository.ParkingSlotRepository;
import com.examly.springapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ParkingSlotRepository slotRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public Booking createBooking(Booking booking) {

        ParkingSlot slot = slotRepository.findById(booking.getSlotId())
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        if (!"AVAILABLE".equalsIgnoreCase(slot.getStatus())) {
            throw new RuntimeException("Slot not available");
        }

        booking.setBookingTime(LocalDateTime.now());
        booking.setAmount(slot.getPricePerHour());
        booking.setStatus("BOOKED");

        slot.setStatus("BOOKED");
        slotRepository.save(slot);

        Booking savedBooking = bookingRepository.save(booking);

        try {

            User user = userRepository.findById(savedBooking.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String body =
                    "Parking Slot Booking Confirmed\n\n" +
                    "Hello " + user.getName() + ",\n\n" +
                    "Your parking slot has been booked successfully.\n\n" +
                    "Booking ID : " + savedBooking.getId() + "\n" +
                    "Slot ID : " + savedBooking.getSlotId() + "\n" +
                    "Vehicle Number : " + savedBooking.getVehicleNumber() + "\n" +
                    "Amount : ₹" + savedBooking.getAmount() + "\n" +
                    "Booking Time : " + savedBooking.getBookingTime() + "\n" +
                    "Status : " + savedBooking.getStatus() + "\n\n" +
                    "Thank you for using Parking Slot Booking System.";

            emailService.sendEmail(
                    user.getEmail(),
                    "Parking Booking Confirmed",
                    body
            );

        } catch (Exception e) {

            System.out.println("Email could not be sent.");
            e.printStackTrace();

        }

        return savedBooking;
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Long id) {

        return bookingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

    }

    @Override
    public List<Booking> getBookingsByUser(Long userId) {

        return bookingRepository.findByUserId(userId);

    }

    @Override
    public List<Booking> getBookingsByStatus(String status) {

        return bookingRepository.findByStatus(status);

    }

    @Override
    public void cancelBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        ParkingSlot slot = slotRepository.findById(booking.getSlotId())
                .orElseThrow(() ->
                        new RuntimeException("Slot not found"));

        slot.setStatus("AVAILABLE");
        slotRepository.save(slot);

        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);

        try {

            User user = userRepository.findById(booking.getUserId())
                    .orElseThrow(() ->
                            new RuntimeException("User not found"));

            String body =
                    "Parking Slot Booking Cancelled\n\n" +
                    "Hello " + user.getName() + ",\n\n" +
                    "Your parking booking has been cancelled successfully.\n\n" +
                    "Booking ID : " + booking.getId() + "\n" +
                    "Slot ID : " + booking.getSlotId() + "\n\n" +
                    "Thank you.";

            emailService.sendEmail(
                    user.getEmail(),
                    "Parking Booking Cancelled",
                    body
            );

        } catch (Exception e) {

            System.out.println("Email could not be sent.");
            e.printStackTrace();

        }

    }

    @Override
    public void clearBookingHistory() {

        bookingRepository.deleteAll();

        List<ParkingSlot> slots = slotRepository.findAll();

        for (ParkingSlot slot : slots) {
            slot.setStatus("AVAILABLE");
        }

        slotRepository.saveAll(slots);

    }
}