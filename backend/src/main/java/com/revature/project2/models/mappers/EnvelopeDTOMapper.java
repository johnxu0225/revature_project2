package com.revature.project2.models.mappers;


import com.revature.project2.models.DTOs.EnvelopeDTO;
import com.revature.project2.models.Envelope;
import org.springframework.stereotype.Component;

/**
 * Mapper class for converting between Envelope entities and EnvelopeDTOs.
 * This class extends the AbstractMapper class to provide the specific
 * mapping logic for Envelope and EnvelopeDTO objects.
 */
@Component
public class EnvelopeDTOMapper extends AbstractMapper<Envelope, EnvelopeDTO> {

    /**
     * Converts an EnvelopeDTO to an Envelope entity.
     *
     * @param dto The EnvelopeDTO object to be converted.
     * @return The corresponding Envelope entity.
     */
    @Override
    public Envelope dtoToEntity(EnvelopeDTO dto) {
        // Currently returning null, implement logic to map EnvelopeDTO to Envelope
        return null;
    }

    /**
     * Converts an Envelope entity to an EnvelopeDTO.
     *
     * @param entity The Envelope entity to be converted.
     * @return The corresponding EnvelopeDTO.
     */
    @Override
    public EnvelopeDTO entityToDTO(Envelope entity) {
        // Currently returning null, implement logic to map Envelope to EnvelopeDTO
        return null;
    }
}
