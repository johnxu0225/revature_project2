package com.revature.project2.models.DTOs;

public record EnvelopeDTO(
        Integer userId,
        String envelopeDescription,
        Double amount,
        Double maxLimit
) {
}
