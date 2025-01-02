package com.revature.project2.exceptions;

/**
 * This is a custom exception class used to handle business-related exceptions.
 * It extends {@link RuntimeException} and is designed to provide additional context,
 * such as an error code and a message, to be used in exception handling throughout the application.
 */
public class BusinessException extends RuntimeException {

    // Error code associated with the exception
    private int code;

    // Message providing details about the exception
    private String message;

    /**
     * Default constructor for BusinessException.
     * This constructor does not initialize the code and message fields.
     */
    public BusinessException() {
    }

    /**
     * Constructor that accepts both a code and a message to initialize the exception.
     *
     * @param code    The error code representing the specific type of business exception.
     * @param message A detailed message that explains the cause or reason for the exception.
     */
    public BusinessException(int code, String message) {
        this.code = code;
        this.message = message;
    }

    /**
     * Gets the error code associated with this exception.
     *
     * @return the error code.
     */
    public int getCode() {
        return code;
    }

    /**
     * Sets the error code for this exception.
     *
     * @param code the error code to be set.
     */
    public void setCode(int code) {
        this.code = code;
    }

    /**
     * Gets the message associated with this exception.
     *
     * @return the exception message.
     */
    @Override
    public String getMessage() {
        return message;
    }

    /**
     * Sets the message for this exception.
     *
     * @param message the message to be set.
     */
    public void setMessage(String message) {
        this.message = message;
    }
}