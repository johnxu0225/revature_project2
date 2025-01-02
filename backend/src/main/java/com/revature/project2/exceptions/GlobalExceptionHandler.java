package com.revature.project2.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@Component
@RestControllerAdvice
public class GlobalExceptionHandler {
    // Logger to log the exceptions and request details for troubleshooting
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleInvalidBody(HttpMessageNotReadableException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Invalid request body: \n" + e.getMessage());
    }
    @ExceptionHandler(UnsupportedOperationException.class)
    public ResponseEntity<String> handleUnsupportedOperation(UnsupportedOperationException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Requested operation not supported: \n" + e.getMessage());
    }
/*  Alex commented this out for the same reason as Exception.class below, because RuntimeException
 is the parent for all runtime exceptions and it will intercept all runtime exceptions
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
*/
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        // mainly for unique username issue
        return ResponseEntity.badRequest().body("Error: data invalid");
    }

    /**
     * Alex commented it because it prevents handling of all other exceptions, since Exception.class is a parent for
     * all other exceptions in Java, other methods in this bean will not be executed if we'll handle Exception.class
     *
     * Generic exception handler to catch all exceptions and return a response with an error message.
     *
     * @param exception The exception that was thrown.
     * @param request   The web request that caused the exception.
     * @return A ResponseEntity containing the exception message and an HTTP status of 400 Bad Request.
     */
    //@ExceptionHandler(Exception.class)
//    public ResponseEntity<String> genericExceptionHandler(Exception exception, WebRequest request) {
//
//        // Log the exception details including the exception message and request description
//        logger.error("Exception occurred: {}, Request Details: {}", exception.getMessage(),
//                request.getDescription(false), exception);
//
//        // Return a generic response with the exception message and HTTP status 400 (Bad Request)
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//    }

}
