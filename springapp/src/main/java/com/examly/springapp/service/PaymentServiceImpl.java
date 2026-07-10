package com.examly.springapp.service;

import com.examly.springapp.dto.PaymentRequest;
import com.examly.springapp.model.Booking;
import com.examly.springapp.model.Payment;
import com.examly.springapp.model.ParkingSlot;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.BookingRepository;
import com.examly.springapp.repository.PaymentRepository;
import com.examly.springapp.repository.ParkingSlotRepository;
import com.examly.springapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ParkingSlotRepository slotRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public Payment makePayment(PaymentRequest request) {

        if (request.getBookingId() == null) {
            throw new RuntimeException("Booking ID is required");
        }

        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        ParkingSlot slot = slotRepository.findById(booking.getSlotId())
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        LocalDateTime checkOut = LocalDateTime.now();
        long minutes = Duration.between(booking.getBookingTime(), checkOut).toMinutes();
        long hours = Math.max(1, (long) Math.ceil(minutes / 60.0));

        double ratePerHour;
        String type = slot.getType().toUpperCase();
        if (type.contains("BIKE") || type.contains("MOTORCYCLE") || type.contains("TWO")) {
            ratePerHour = 20.0;
        } else {
            ratePerHour = 50.0;
        }

        double finalAmount = hours * ratePerHour;

        booking.setAmount(finalAmount);
        booking.setCheckOutTime(checkOut);

        Payment payment = new Payment();

        payment.setBookingId(booking.getId());
        payment.setAmount(finalAmount);
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus("SUCCESS");
        payment.setGateway("DEMO");
        payment.setTransactionId(UUID.randomUUID().toString());
        payment.setPaymentTime(LocalDateTime.now());

        Payment saved = paymentRepository.save(payment);

        booking.setStatus("PAID");
        bookingRepository.save(booking);

        return saved;
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }
}