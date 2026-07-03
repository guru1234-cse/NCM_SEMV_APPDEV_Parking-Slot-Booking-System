package com.examly.springapp.dto;

public class ReportResponse {

    private long totalUsers;
    private long totalSlots;
    private long availableSlots;
    private long bookedSlots;
    private long cancelledBookings;
    private long totalBookings;

    // New Fields
    private Double totalRevenue;
    private long totalPayments;
    private Double occupancyPercentage;

    public ReportResponse() {
    }

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
}