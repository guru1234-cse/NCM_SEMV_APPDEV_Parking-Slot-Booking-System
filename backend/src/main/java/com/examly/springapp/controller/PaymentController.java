package com.examly.springapp.controller;

import com.examly.springapp.dto.PaymentRequest;
import com.examly.springapp.entity.Payment;
import com.examly.springapp.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // USER can make payment
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public Payment makePayment(@RequestBody PaymentRequest request) {

        return paymentService.makePayment(request);

    }

    // ADMIN can view all payments
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Payment> getAllPayments() {

        return paymentService.getAllPayments();

    }

    // ADMIN or USER can view payment by ID
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {

        return paymentService.getPaymentById(id);

    }

}