package com.examly.springapp.service;

import com.examly.springapp.dto.DashboardResponse;
import com.examly.springapp.repository.BookingRepository;
import com.examly.springapp.repository.ParkingSlotRepository;
import com.examly.springapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    @Override
    public DashboardResponse getDashboardStatistics() {

        long totalUsers = userRepository.count();

        long totalSlots = parkingSlotRepository.count();

        long availableSlots =
                parkingSlotRepository.countByStatus("AVAILABLE");

        long bookedSlots =
                parkingSlotRepository.countByStatus("BOOKED");

        long totalBookings = bookingRepository.count();

        return new DashboardResponse(

                totalUsers,

                totalSlots,

                availableSlots,

                bookedSlots,

                totalBookings

        );

    }

}