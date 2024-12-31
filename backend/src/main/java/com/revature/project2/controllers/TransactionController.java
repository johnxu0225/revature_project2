package com.revature.project2.controllers;

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

    @PatchMapping("/transactions/title/{id}")
    public ResponseEntity<?> updateTransactionTitle(@PathVariable Integer id, @RequestBody String newTitle) {
        try {
            return ResponseEntity.ok(transactionService.updateTransactionTitle(id, newTitle));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PatchMapping("/transactions/description/{id}")
    public ResponseEntity<?> updateTransactionDescription(@PathVariable Integer id, @RequestBody String newDescription) {
        try {
            return ResponseEntity.ok(transactionService.updateTransactionDescription(id, newDescription));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/transactions")
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
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

}