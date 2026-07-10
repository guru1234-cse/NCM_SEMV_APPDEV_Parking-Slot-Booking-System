package com.examly.springapp.exception;

public class SlotNotAvailableException extends RuntimeException {

    public SlotNotAvailableException(String message) {
        super(message);
    }
}