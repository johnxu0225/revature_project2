package com.revature.project2.models.mappers;

/**
 * Abstract Mapper class to define the contract for mapping between
 * DTOs (Data Transfer Objects) and entities.
 *
 * @param <U> the entity type
 * @param <V> the DTO type
 */
public abstract class AbstractMapper<U, V> {

    /**
     * Converts a DTO (V) to its corresponding entity (U).
     *
     * @param dto the DTO to convert
     * @return the corresponding entity
     */
    public abstract U dtoToEntity(V dto);

    /**
     * Converts an entity (U) to its corresponding DTO (V).
     *
     * @param entity the entity to convert
     * @return the corresponding DTO
     */
    public abstract V entityToDto(U entity);
}
