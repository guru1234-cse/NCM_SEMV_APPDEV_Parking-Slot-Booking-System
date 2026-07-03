package com.examly.springapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.MethodArgumentNotValidException;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Validation Errors

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