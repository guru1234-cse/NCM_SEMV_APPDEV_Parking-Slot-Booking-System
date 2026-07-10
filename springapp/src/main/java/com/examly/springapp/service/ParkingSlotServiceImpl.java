package com.examly.springapp.service;

import com.examly.springapp.model.ParkingSlot;
import com.examly.springapp.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingSlotServiceImpl implements ParkingSlotService {

    @Autowired
    private ParkingSlotRepository repository;

    @Override
    public ParkingSlot addSlot(ParkingSlot slot) {
        slot.setStatus("AVAILABLE");
        return repository.save(slot);
    }

    @Override
    public List<ParkingSlot> getAllSlots() {
        return repository.findAll();
    }

    @Override
    public List<ParkingSlot> getAvailableSlots() {
        return repository.findByStatus("AVAILABLE");
    }

    @Override
    public ParkingSlot getSlotById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parking Slot not found"));
    }

    @Override
    public ParkingSlot updateSlot(Long id, ParkingSlot slot) {

        ParkingSlot existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parking Slot not found"));

        existing.setSlotNumber(slot.getSlotNumber());
        existing.setType(slot.getType());
        existing.setStatus(slot.getStatus());
        existing.setPricePerHour(slot.getPricePerHour());

        return repository.save(existing);
    }

    @Override
    public void deleteSlot(Long id) {
        repository.deleteById(id);
    }
}