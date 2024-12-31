package com.revature.project2.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "envelope_history")
public class EnvelopeHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int amountHistoryId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "envelopeId")
    private Envelope envelope;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "transactionId")
    private Transaction transaction;
    @Column(nullable = false)
    private double envelope_amount;

    public EnvelopeHistory() {
    }

    public EnvelopeHistory(int amountHistoryId, Envelope envelope, Transaction transaction, double envelope_amount) {
        this.amountHistoryId = amountHistoryId;
        this.envelope = envelope;
        this.transaction = transaction;
        this.envelope_amount = envelope_amount;
    }

    public int getAmountHistoryId() {
        return amountHistoryId;
    }

    public void setAmountHistoryId(int amountHistoryId) {
        this.amountHistoryId = amountHistoryId;
    }

    public Envelope getEnvelope() {
        return envelope;
    }

    public void setEnvelope(Envelope envelope) {
        this.envelope = envelope;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }

    public double getEnvelope_amount() {
        return envelope_amount;
    }

    public void setEnvelope_amount(double envelope_amount) {
        this.envelope_amount = envelope_amount;
    }

    @Override
    public String toString() {
        return "Envelope_History{" +
                "amountHistoryId=" + amountHistoryId +
                ", envelope=" + envelope +
                ", transactionId=" + transaction +
                ", envelope_amount=" + envelope_amount +
                '}';
    }
}
