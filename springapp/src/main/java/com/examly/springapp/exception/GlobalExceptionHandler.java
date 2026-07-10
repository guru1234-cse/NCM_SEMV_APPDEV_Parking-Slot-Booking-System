package com.examly.springapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.MethodArgumentNotValidException;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.examly.springapp.exception.BookingValidationException;
import com.examly.springapp.exception.SlotNotAvailableException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(

            MethodArgumentNotValidException ex) {

        String message = ex.getBindingResult()

                .getFieldError()

                .getDefaultMessage();

        ErrorResponse response = new ErrorResponse(

                LocalDateTime.now(),

                HttpStatus.BAD_REQUEST.value(),

                "Validation Failed",

                message

        );

        return new ResponseEntity<>(

                response,

                HttpStatus.BAD_REQUEST

        );

    }

    // Runtime Exceptions
    // Booking Validation Exception

@ExceptionHandler(BookingValidationException.class)
public ResponseEntity<ErrorResponse> handleBookingValidationException(
        BookingValidationException ex) {

    ErrorResponse response = new ErrorResponse(

            LocalDateTime.now(),

            HttpStatus.BAD_REQUEST.value(),

            "Booking Validation Failed",

            ex.getMessage()

    );

    return new ResponseEntity<>(

            response,

            HttpStatus.BAD_REQUEST

    );

}
// Slot Not Available Exception

@ExceptionHandler(SlotNotAvailableException.class)
public ResponseEntity<ErrorResponse> handleSlotNotAvailableException(
        SlotNotAvailableException ex) {

    ErrorResponse response = new ErrorResponse(

            LocalDateTime.now(),

            HttpStatus.CONFLICT.value(),

            "Slot Not Available",

            ex.getMessage()

    );

    return new ResponseEntity<>(

            response,

            HttpStatus.CONFLICT

    );

}
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntime(

            RuntimeException ex) {

        ErrorResponse response = new ErrorResponse(

                LocalDateTime.now(),

                HttpStatus.BAD_REQUEST.value(),

                "Error",

                ex.getMessage()

        );

        return new ResponseEntity<>(

                response,

                HttpStatus.BAD_REQUEST

        );

    }

    // Unknown Exceptions

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(

            Exception ex) {

        ErrorResponse response = new ErrorResponse(

                LocalDateTime.now(),

                HttpStatus.INTERNAL_SERVER_ERROR.value(),

                "Internal Server Error",

                ex.getMessage()

        );

        return new ResponseEntity<>(

                response,

                HttpStatus.INTERNAL_SERVER_ERROR

        );

    }

}