package com.revature.project2.models.DTOs;


import java.time.LocalDateTime;
import java.util.List;

// Data Transfer Object (DTO) for representing a transaction.
public class TransactionDto {

    // Unique identifier for the transaction.
    private int transactionId;

    // Title of the transaction (e.g., purchase name or transaction label).
    private String title;

    // Description of the transaction (e.g., what the transaction was for).
    private String transaction_description;

    // DTO representing the envelope associated with this transaction.
    private EnvelopeDTO envelopeDTO;

    // Date and time when the transaction occurred.
    private LocalDateTime datetime;

    // Category of the transaction (e.g., Food, Entertainment, etc.).
    private String category;

    // Amount of money involved in the transaction.
    private double transaction_amount;

    // List of envelope histories associated with this transaction.
    private List<EnvelopeHistoryDto> envelopeHistories;

    // Getter method for transactionId.
    public int getTransactionId() {
        return transactionId;
    }

    // Setter method for transactionId.
    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    // Getter method for title.
    public String getTitle() {
        return title;
    }

    // Setter method for title.
    public void setTitle(String title) {
        this.title = title;
    }

    // Getter method for transaction_description.
    public String getTransaction_description() {
        return transaction_description;
    }

    // Setter method for transaction_description.
    public void setTransaction_description(String transaction_description) {
        this.transaction_description = transaction_description;
    }

    // Getter method for envelopeDTO.
    public EnvelopeDTO getEnvelopeDTO() {
        return envelopeDTO;
    }

    // Setter method for envelopeDTO.
    public void setEnvelopeDTO(EnvelopeDTO envelopeDTO) {
        this.envelopeDTO = envelopeDTO;
    }

    // Getter method for datetime.
    public LocalDateTime getDatetime() {
        return datetime;
    }

    // Setter method for datetime.
    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }

    // Getter method for category.
    public String getCategory() {
        return category;
    }

    // Setter method for category.
    public void setCategory(String category) {
        this.category = category;
    }

    // Getter method for transaction_amount.
    public double getTransaction_amount() {
        return transaction_amount;
    }

    // Setter method for transaction_amount.
    public void setTransaction_amount(double transaction_amount) {
        this.transaction_amount = transaction_amount;
    }

    // Getter method for envelopeHistories.
    public List<EnvelopeHistoryDto> getEnvelopeHistories() {
        return envelopeHistories;
    }

    // Setter method for envelopeHistories.
    public void setEnvelopeHistories(List<EnvelopeHistoryDto> envelopeHistories) {
        this.envelopeHistories = envelopeHistories;
    }
}
