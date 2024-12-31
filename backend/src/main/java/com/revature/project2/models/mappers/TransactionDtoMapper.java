package com.revature.project2.models.mappers;


import com.revature.project2.models.DTOs.TransactionDto;
import com.revature.project2.models.Transaction;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

/**
 * Mapper class for converting between Transaction entities and TransactionDTOs.
 * This class extends the AbstractMapper class to provide the specific
 * mapping logic for Transaction and TransactionDTO objects.
 */
@Component
public class TransactionDtoMapper extends AbstractMapper<Transaction, TransactionDto> {

    // Mapper for converting between Envelope and EnvelopeDTO.
    private EnvelopeDtoMapper envelopeDtoMapper;

    // Mapper for converting between EnvelopeHistory and EnvelopeHistoryDTO.
    private EnvelopeHistoryDtoMapper envelopeHistoryDtoMapper;

    /**
     * Constructor to initialize mappers for Envelope and EnvelopeHistory.
     *
     * @param envelopeDtoMapper Mapper for Envelope to EnvelopeDTO conversion.
     * @param envelopeHistoryDtoMapper Mapper for EnvelopeHistory to EnvelopeHistoryDTO conversion.
     */
    public TransactionDtoMapper(EnvelopeDtoMapper envelopeDtoMapper, EnvelopeHistoryDtoMapper envelopeHistoryDtoMapper) {
        this.envelopeDtoMapper = envelopeDtoMapper;
        this.envelopeHistoryDtoMapper = envelopeHistoryDtoMapper;
    }

    // Default constructor (empty).
    public TransactionDtoMapper() {
    }

    /**
     * Converts a TransactionDTO to a Transaction entity.
     *
     * @param dto The TransactionDTO object to be converted.
     * @return The corresponding Transaction entity.
     */
    @Override
    public Transaction dtoToEntity(TransactionDto dto) {
        // Creating a new Transaction object.
        Transaction transaction = new Transaction();

        // Mapping simple fields.
        transaction.setTransaction_description(dto.getTransaction_description());
        transaction.setTitle(dto.getTitle());
        transaction.setTransaction_amount(dto.getTransaction_amount());
        transaction.setCategory(dto.getCategory());
        transaction.setDatetime(dto.getDatetime());

        // Mapping EnvelopeDTO to Envelope entity, if present.
        if (dto.getEnvelopeDTO() != null) {
            transaction.setEnvelope(envelopeDtoMapper.dtoToEntity(dto.getEnvelopeDTO()));
        }

        // Mapping list of EnvelopeHistoryDTOs to EnvelopeHistory entities, if not empty.
        if (!dto.getEnvelopeHistories().isEmpty()) {
            transaction.setEnvelopeHistories(dto.getEnvelopeHistories().stream()
                    .map(envelopeHistoryDtoMapper::dtoToEntity) // Convert each DTO to entity.
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
    public TransactionDto entityToDto(Transaction entity) {
        // Creating a new TransactionDTO object.
        TransactionDto transactionDto = new TransactionDto();

        // Mapping simple fields.
        transactionDto.setTransactionId(entity.getTransactionId());
        transactionDto.setCategory(entity.getCategory());
        transactionDto.setTransaction_description(entity.getTransaction_description());
        transactionDto.setTransaction_amount(entity.getTransaction_amount());
        transactionDto.setDatetime(entity.getDatetime());
        transactionDto.setTitle(entity.getTitle());

        // Mapping Envelope entity to EnvelopeDTO, if present.
        if (entity.getEnvelope() != null) {
            transactionDto.setEnvelopeDTO(envelopeDtoMapper.entityToDto(entity.getEnvelope()));
        }

        // Mapping list of EnvelopeHistory entities to EnvelopeHistoryDTOs, if not empty.
        if (!entity.getEnvelopeHistories().isEmpty()) {
            transactionDto.setEnvelopeHistories(entity.getEnvelopeHistories().stream()
                    .map(envelopeHistoryDtoMapper::entityToDto) // Convert each entity to DTO.
                    .collect(Collectors.toList())); // Collect results into a list.
        }

        // Returning the mapped TransactionDTO.
        return transactionDto;
    }
}
