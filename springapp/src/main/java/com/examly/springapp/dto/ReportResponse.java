package com.examly.springapp.dto;

import com.examly.springapp.model.Booking;

import java.util.List;
import java.util.Map;

public class ReportResponse {

    private long totalUsers;
    private long totalSlots;
    private long availableSlots;
    private long bookedSlots;
    private long cancelledBookings;
    private long totalBookings;
    private Double totalRevenue;
    private long totalPayments;
    private Double occupancyPercentage;

    private List<Map<String, Object>> bookingsPerDay;
    private List<Booking> bookings;

    public ReportResponse() {
    }

    // Constructor used by Dashboard
    public ReportResponse(
            long totalUsers,
            long totalSlots,
            long availableSlots,
            long bookedSlots,
            long cancelledBookings,
            long totalBookings,
            Double totalRevenue,
            long totalPayments,
            Double occupancyPercentage) {

        this.totalUsers = totalUsers;
        this.totalSlots = totalSlots;
        this.availableSlots = availableSlots;
        this.bookedSlots = bookedSlots;
        this.cancelledBookings = cancelledBookings;
        this.totalBookings = totalBookings;
        this.totalRevenue = totalRevenue;
        this.totalPayments = totalPayments;
        this.occupancyPercentage = occupancyPercentage;
    }

    // Constructor used by Reports
    public ReportResponse(
            long totalUsers,
            long totalSlots,
            long availableSlots,
            long bookedSlots,
            long cancelledBookings,
            long totalBookings,
            Double totalRevenue,
            long totalPayments,
            Double occupancyPercentage,
            List<Map<String, Object>> bookingsPerDay,
            List<Booking> bookings) {

        this.totalUsers = totalUsers;
        this.totalSlots = totalSlots;
        this.availableSlots = availableSlots;
        this.bookedSlots = bookedSlots;
        this.cancelledBookings = cancelledBookings;
        this.totalBookings = totalBookings;
        this.totalRevenue = totalRevenue;
        this.totalPayments = totalPayments;
        this.occupancyPercentage = occupancyPercentage;
        this.bookingsPerDay = bookingsPerDay;
        this.bookings = bookings;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalSlots() {
        return totalSlots;
    }

    public void setTotalSlots(long totalSlots) {
        this.totalSlots = totalSlots;
    }

    public long getAvailableSlots() {
        return availableSlots;
    }

    public void setAvailableSlots(long availableSlots) {
        this.availableSlots = availableSlots;
    }

    public long getBookedSlots() {
        return bookedSlots;
    }

    public void setBookedSlots(long bookedSlots) {
        this.bookedSlots = bookedSlots;
    }

    public long getCancelledBookings() {
        return cancelledBookings;
    }

    public void setCancelledBookings(long cancelledBookings) {
        this.cancelledBookings = cancelledBookings;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public long getTotalPayments() {
        return totalPayments;
    }

    public void setTotalPayments(long totalPayments) {
        this.totalPayments = totalPayments;
    }

    public Double getOccupancyPercentage() {
        return occupancyPercentage;
    }

    public void setOccupancyPercentage(Double occupancyPercentage) {
        this.occupancyPercentage = occupancyPercentage;
    }

    public List<Map<String, Object>> getBookingsPerDay() {
        return bookingsPerDay;
    }

    public void setBookingsPerDay(List<Map<String, Object>> bookingsPerDay) {
        this.bookingsPerDay = bookingsPerDay;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }
}