package com.examly.springapp.service;

import com.examly.springapp.model.ParkingSlot;
import java.util.List;

public interface ParkingSlotService{

    // Add a parking slot
    ParkingSlot addSlot(ParkingSlot slot);

    // Get all parking slots
    List<ParkingSlot> getAllSlots();

    // Get available parking slots
    List<ParkingSlot> getAvailableSlots();

    // Get slot by ID
    ParkingSlot getSlotById(Long id);

    // Update slot
    ParkingSlot updateSlot(Long id, ParkingSlot slot);

    // Delete slot
    void deleteSlot(Long id);
}