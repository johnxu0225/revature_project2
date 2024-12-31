package com.revature.project2.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@Component
@RestControllerAdvice
public class GlobalExceptionHandler {
    // Logger to log the exceptions and request details for troubleshooting
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        // mainly for unique username issue
        return ResponseEntity.badRequest().body("Error: data invalid");
    }

    /**
     * Generic exception handler to catch all exceptions and return a response with an error message.
     *
     * @param exception The exception that was thrown.
     * @param request   The web request that caused the exception.
     * @return A ResponseEntity containing the exception message and an HTTP status of 400 Bad Request.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> genericExceptionHandler(Exception exception, WebRequest request) {

        // Log the exception details including the exception message and request description
        logger.error("Exception occurred: {}, Request Details: {}", exception.getMessage(),
                request.getDescription(false), exception);

        // Return a generic response with the exception message and HTTP status 400 (Bad Request)
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
