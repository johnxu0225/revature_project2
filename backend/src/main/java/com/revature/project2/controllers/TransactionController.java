package com.revature.project2.controllers;

import com.revature.project2.models.DTOs.TransactionDto;
import com.revature.project2.models.Transaction;
import com.revature.project2.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PatchMapping("/transaction/title/{id}")
    public ResponseEntity<?> updateTransactionTitle(@PathVariable Integer id, @RequestBody String newTitle) {
        try {
            return ResponseEntity.ok(transactionService.updateTransactionTitle(id, newTitle));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PatchMapping("/transaction/description/{id}")
    public ResponseEntity<?> updateTransactionDescription(@PathVariable Integer id, @RequestBody String newDescription) {
        try {
            return ResponseEntity.ok(transactionService.updateTransactionDescription(id, newDescription));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/transaction")
    public ResponseEntity<?> createTransaction(@RequestBody Transaction transaction) {
        try {
            return ResponseEntity.ok(transactionService.createTransaction(transaction));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    //TODO: Spring Security
    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    /**
     * Endpoint to update the category of a transaction.
     *
     * @param id The ID of the transaction to be updated.
     * @param transactionDto The new category to set for the transaction.
     * @return A ResponseEntity containing the updated transactionDto details.
     */
    @PatchMapping("/transaction/category/{id}")
    public ResponseEntity<?> updateTransactionCategory(@PathVariable Integer id, @RequestBody TransactionDto transactionDto) {

        // Call the service layer to update the transaction category and return the updated transaction
        return ResponseEntity.ok(transactionService.updateTransactionCategory(id, transactionDto));
    }


}