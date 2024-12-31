package com.revature.project2.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String transaction_description;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "envelopeId")
    private Envelope envelope;
    @Column(nullable = false)
    private LocalDateTime datetime;
    @Column(nullable = false)
    private String category;
    @Column(nullable = false)
    private double transaction_amount;
    @OneToMany(mappedBy = "transaction", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<EnvelopeHistory> envelopeHistories;

    public Transaction() {
    }

    public Transaction(int transactionId, String title, String transaction_description, Envelope envelope, LocalDateTime datetime, String category, double transaction_amount) {
        this.transactionId = transactionId;
        this.title = title;
        this.transaction_description = transaction_description;
        this.envelope = envelope;
        this.datetime = datetime;
        this.category = category;
        this.transaction_amount = transaction_amount;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTransaction_description() {
        return transaction_description;
    }

    public void setTransaction_description(String transaction_description) {
        this.transaction_description = transaction_description;
    }

    public Envelope getEnvelope() {
        return envelope;
    }

    public void setEnvelope(Envelope envelope) {
        this.envelope = envelope;
    }

    public LocalDateTime getDatetime() {
        return datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getTransaction_amount() {
        return transaction_amount;
    }

    public void setTransaction_amount(double transaction_amount) {
        this.transaction_amount = transaction_amount;
    }

    public List<EnvelopeHistory> getEnvelopeHistories() {
        return envelopeHistories;
    }

    public void setEnvelopeHistories(List<EnvelopeHistory> envelopeHistories) {
        this.envelopeHistories = envelopeHistories;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "transactionId=" + transactionId +
                ", title='" + title + '\'' +
                ", transaction_description='" + transaction_description + '\'' +
                ", envelopeId=" + envelope +
                ", datetime=" + datetime +
                ", category='" + category + '\'' +
                ", transaction_amount=" + transaction_amount +
                '}';
    }
}
