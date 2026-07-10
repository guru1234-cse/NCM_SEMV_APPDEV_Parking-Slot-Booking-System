package com.examly.springapp.service;

import com.examly.springapp.dto.PaymentRequest;
import com.examly.springapp.model.Payment;

import java.util.List;

public interface PaymentService {

    Payment makePayment(PaymentRequest request);

    List<Payment> getAllPayments();

    Payment getPaymentById(Long id);

}