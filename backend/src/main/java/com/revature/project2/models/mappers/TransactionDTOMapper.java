package com.revature.project2.models.mappers;


import com.revature.project2.models.DTOs.TransactionDTO;
import com.revature.project2.models.Transaction;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

/**
 * Mapper class for converting between Transaction entities and TransactionDTOs.
 * This class extends the AbstractMapper class to provide the specific
 * mapping logic for Transaction and TransactionDTO objects.
 */
@Component
public class TransactionDTOMapper extends AbstractMapper<Transaction, TransactionDTO> {

    // Mapper for converting between Envelope and EnvelopeDTO.
    private EnvelopeDTOMapper envelopeDTOMapper;

    // Mapper for converting between EnvelopeHistory and EnvelopeHistoryDTO.
    private EnvelopeHistoryDTOMapper envelopeHistoryDTOMapper;

    /**
     * Constructor to initialize mappers for Envelope and EnvelopeHistory.
     *
     * @param envelopeDTOMapper Mapper for Envelope to EnvelopeDTO conversion.
     * @param envelopeHistoryDTOMapper Mapper for EnvelopeHistory to EnvelopeHistoryDTO conversion.
     */
    public TransactionDTOMapper(EnvelopeDTOMapper envelopeDTOMapper, EnvelopeHistoryDTOMapper envelopeHistoryDTOMapper) {
        this.envelopeDTOMapper = envelopeDTOMapper;
        this.envelopeHistoryDTOMapper = envelopeHistoryDTOMapper;
    }

    // Default constructor (empty).
    public TransactionDTOMapper() {
    }

    /**
     * Converts a TransactionDTO to a Transaction entity.
     *
     * @param dto The TransactionDTO object to be converted.
     * @return The corresponding Transaction entity.
     */
    @Override
    public Transaction dtoToEntity(TransactionDTO dto) {
        // Creating a new Transaction object.
        Transaction transaction = new Transaction();

        // Mapping simple fields.
        transaction.setTransactionDescription(dto.getTransactionDescription());
        transaction.setTitle(dto.getTitle());
        transaction.setTransactionAmount(dto.getTransactionAmount());
        transaction.setCategory(dto.getCategory());
        transaction.setDatetime(dto.getDatetime());

        // Mapping EnvelopeDTO to Envelope entity, if present.
        if (dto.getEnvelopeDTO() != null) {
            transaction.setEnvelope(envelopeDTOMapper.dtoToEntity(dto.getEnvelopeDTO()));
        }

        // Mapping list of EnvelopeHistoryDTOs to EnvelopeHistory entities, if not empty.
        if (!dto.getEnvelopeHistories().isEmpty()) {
            transaction.setEnvelopeHistories(dto.getEnvelopeHistories().stream()
                    .map(envelopeHistoryDTOMapper::dtoToEntity) // Convert each DTO to entity.
                    .collect(Collectors.toList())); // Collect results into a list.
        }

        // Returning the mapped Transaction entity.
        return transaction;
    }

    /**
     * Converts a Transaction entity to a TransactionDTO.
     *
     * @param entity The Transaction entity to be converted.
     * @return The corresponding TransactionDTO.
     */
    @Override
    public TransactionDTO entityToDTO(Transaction entity) {
        // Creating a new TransactionDTO object.
        TransactionDTO transactionDTO = new TransactionDTO();

        // Mapping simple fields.
        transactionDTO.setTransactionId(entity.getTransactionId());
        transactionDTO.setCategory(entity.getCategory());
        transactionDTO.setTransactionDescription(entity.getTransactionDescription());
        transactionDTO.setTransactionAmount(entity.getTransactionAmount());
        transactionDTO.setDatetime(entity.getDatetime());
        transactionDTO.setTitle(entity.getTitle());

        // Mapping Envelope entity to EnvelopeDTO, if present.
        if (entity.getEnvelope() != null) {
            transactionDTO.setEnvelopeDTO(envelopeDTOMapper.entityToDTO(entity.getEnvelope()));
        }

        // Mapping list of EnvelopeHistory entities to EnvelopeHistoryDTOs, if not empty.
        if (!entity.getEnvelopeHistories().isEmpty()) {
            transactionDTO.setEnvelopeHistories(entity.getEnvelopeHistories().stream()
                    .map(envelopeHistoryDTOMapper::entityToDTO) // Convert each entity to DTO.
                    .collect(Collectors.toList())); // Collect results into a list.
        }

        // Returning the mapped TransactionDTO.
        return transactionDTO;
    }
}
