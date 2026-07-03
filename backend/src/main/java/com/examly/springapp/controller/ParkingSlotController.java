package com.examly.springapp.controller;

import com.examly.springapp.entity.ParkingSlot;
import com.examly.springapp.service.ParkingSlotService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "http://localhost:3000")
public class ParkingSlotController {

    @Autowired
    private ParkingSlotService parkingSlotService;

    // View all slots (ADMIN & USER)
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public List<ParkingSlot> getAllSlots() {
        return parkingSlotService.getAllSlots();
    }

    // View available slots (ADMIN & USER)
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/available")
    public List<ParkingSlot> getAvailableSlots() {
        return parkingSlotService.getAvailableSlots();
    }

    // Add parking slot (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ParkingSlot addSlot(@RequestBody ParkingSlot slot) {
        return parkingSlotService.addSlot(slot);
    }

    // Update parking slot (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ParkingSlot updateSlot(
            @PathVariable Long id,
            @RequestBody ParkingSlot slot) {

        return parkingSlotService.updateSlot(id, slot);
    }

    // Delete parking slot (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteSlot(@PathVariable Long id) {
        parkingSlotService.deleteSlot(id);
    }
}