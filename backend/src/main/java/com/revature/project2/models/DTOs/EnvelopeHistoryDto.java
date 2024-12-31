package com.revature.project2.models.DTOs;


// Data Transfer Object (DTO) for representing the envelope history.
public class EnvelopeHistoryDto {

    // Unique identifier for the amount history entry.
    private int amountHistoryId;

    // DTO representing the envelope associated with this history.
    private EnvelopeDTO envelopeDTO;

    // DTO representing the transaction associated with this history.
    private TransactionDto transactionDto;

    // Amount of money in the envelope for this history entry.
    private double envelope_amount;

    // Getter method for amountHistoryId.
    public int getAmountHistoryId() {
        return amountHistoryId;
    }

    // Setter method for amountHistoryId.
    public void setAmountHistoryId(int amountHistoryId) {
        this.amountHistoryId = amountHistoryId;
    }

    // Getter method for envelopeDTO.
    public EnvelopeDTO getEnvelopeDTO() {
        return envelopeDTO;
    }

    // Setter method for envelopeDTO.
    public void setEnvelopeDTO(EnvelopeDTO envelopeDTO) {
        this.envelopeDTO = envelopeDTO;
    }

    // Getter method for transactionDto.
    public TransactionDto getTransactionDto() {
        return transactionDto;
    }

    // Setter method for transactionDto.
    public void setTransactionDto(TransactionDto transactionDto) {
        this.transactionDto = transactionDto;
    }

    // Getter method for envelope_amount.
    public double getEnvelope_amount() {
        return envelope_amount;
    }

    // Setter method for envelope_amount.
    public void setEnvelope_amount(double envelope_amount) {
        this.envelope_amount = envelope_amount;
    }
}
