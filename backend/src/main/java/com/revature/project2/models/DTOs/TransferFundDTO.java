package com.revature.project2.models.DTOs;

public record TransferFundDTO(
        Integer fromId,
        Integer toId,
        Double amount
) {
}
