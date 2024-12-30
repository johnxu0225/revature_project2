package com.revature.project2.services;

import com.revature.project2.models.Transaction;
import com.revature.project2.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction updateTransactionTitle(Integer id, String newTitle) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        transaction.setTitle(newTitle);
        return transactionRepository.save(transaction);
    }

    public Transaction updateTransactionDescription(Integer id, String newDescription) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        transaction.setTransaction_description(newDescription);
        return transactionRepository.save(transaction);
    }

    public Transaction createTransaction(Transaction transaction) {
        if (transaction.getTitle() == null || transaction.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Transaction title cannot be null or empty");
        }
        if (transaction.getTransaction_description() == null || transaction.getTransaction_description().isEmpty()) {
            throw new IllegalArgumentException("Transaction description cannot be null or empty");
        }
        //Additional business rule checks can be added here

        try {
            return transactionRepository.save(transaction);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save transaction: " + e.getMessage(), e);
        }
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}