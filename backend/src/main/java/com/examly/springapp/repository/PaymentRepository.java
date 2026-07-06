package com.examly.springapp.repository;

import com.examly.springapp.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("""
            SELECT COALESCE(SUM(p.amount),0)
            FROM Payment p
            WHERE p.paymentStatus='SUCCESS'
            """)
    Double getTotalRevenue();

    long countByPaymentStatus(String paymentStatus);

}