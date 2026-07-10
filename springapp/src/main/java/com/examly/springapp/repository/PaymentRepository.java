package com.examly.springapp.repository;

import com.examly.springapp.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p WHERE p.paymentStatus='SUCCESS'")
    Double getTotalRevenue();

    @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p WHERE p.paymentStatus='SUCCESS' AND p.bookingId IN :bookingIds")
    Double getRevenueByBookingIds(@Param("bookingIds") Collection<Long> bookingIds);

    @Query("SELECT COUNT(p) FROM Payment p WHERE p.paymentStatus='SUCCESS' AND p.bookingId IN :bookingIds")
    long countSuccessfulByBookingIds(@Param("bookingIds") Collection<Long> bookingIds);

    long countByPaymentStatus(String paymentStatus);

}