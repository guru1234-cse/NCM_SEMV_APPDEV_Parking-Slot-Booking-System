package com.examly.springapp.dto;

public class DashboardResponse {

    private long totalUsers;
    private long totalSlots;
    private long availableSlots;
    private long bookedSlots;
    private long totalBookings;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalUsers,
                             long totalSlots,
                             long availableSlots,
                             long bookedSlots,
                             long totalBookings) {

        this.totalUsers = totalUsers;
        this.totalSlots = totalSlots;
        this.availableSlots = availableSlots;
        this.bookedSlots = bookedSlots;
        this.totalBookings = totalBookings;
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

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

}