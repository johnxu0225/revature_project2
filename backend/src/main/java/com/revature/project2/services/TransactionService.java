package com.revature.project2.services;

import com.revature.project2.exceptions.BusinessException;
import com.revature.project2.models.DTOs.TransactionDto;
import com.revature.project2.models.Transaction;
import com.revature.project2.models.mappers.TransactionDtoMapper;
import com.revature.project2.repositories.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final Logger logger = LoggerFactory.getLogger(TransactionService.class);

    private final TransactionDtoMapper transactionDtoMapper;

    public TransactionService(TransactionRepository transactionRepository, TransactionDtoMapper transactionDtoMapper) {
        this.transactionRepository = transactionRepository;
        this.transactionDtoMapper = transactionDtoMapper;
    }

    public Transaction updateTransactionTitle(Integer id, String newTitle) {
        logger.info("Updating transaction title for transaction with id: " + id);
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        transaction.setTitle(newTitle);
        return transactionRepository.save(transaction);
    }

    public Transaction updateTransactionDescription(Integer id, String newDescription) {
        logger.info("Updating transaction description for transaction with id: " + id);
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        transaction.setTransactionDescription(newDescription);
        return transactionRepository.save(transaction);
    }

    public Transaction createTransaction(Transaction transaction) {
        logger.info("Creating transaction: " + transaction);
        if (transaction.getTitle() == null || transaction.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Transaction title cannot be null or empty");
        }
        if (transaction.getTransactionDescription() == null || transaction.getTransactionDescription().isEmpty()) {
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
        logger.info("Retrieving all transactions");
        return transactionRepository.findAll();
    }


    /**
     * Updates the category of a transaction based on its ID.
     *
     * @param id          The ID of the transaction to be updated.
     * @param transactionDto The new category to set for the transaction.
     * @return The updated transactionDto object after saving it to the repository.
     * @throws BusinessException If the transaction with the given ID is not found.
     */
    public TransactionDto updateTransactionCategory(Integer id, TransactionDto transactionDto) {

        // Log the update operation for tracking
        logger.info("Updating transaction Category for transaction with id: " + id);

        // Find the transaction by ID, throw an exception if not found
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new BusinessException(654, "Transaction not found"));

        // Update the category of the transaction
        if (transactionDto.getCategory() == null || transactionDto.getCategory().isEmpty()) {
            throw new BusinessException(607,"Transaction category cannot be null or empty");
        }
        transaction.setCategory(transactionDto.getCategory());

        // Save the updated transaction and return Dto to the controller
        return transactionDtoMapper.entityToDto(transactionRepository.save(transaction)) ;
    }

}