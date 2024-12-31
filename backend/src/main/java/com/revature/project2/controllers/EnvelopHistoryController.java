package com.revature.project2.controllers;

import com.revature.project2.models.EnvelopeHistory;
import com.revature.project2.services.EnvelopeHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/envelopes/history")
public class EnvelopHistoryController {
    private final EnvelopeHistoryService envelopeHistoryService;

    public EnvelopHistoryController(EnvelopeHistoryService envelopeHistoryService) {
        this.envelopeHistoryService = envelopeHistoryService;
    }

    @GetMapping
    public ResponseEntity<?> getAllEnvelopeHistory() {
        return envelopeHistoryService.getAllEnvelopeHistory();
    }

    @GetMapping("/{envelopeId}")
    public ResponseEntity<?> getEnvelopeHistoryByEnvelopeId(@PathVariable Integer envelopeId) {
        return envelopeHistoryService.getEnvelopeHistoryByEnvelopeId(envelopeId);
    }

    @PostMapping
    public ResponseEntity<?> createEnvelopeHistory(@RequestBody EnvelopeHistory envelopeHistory) {
        return envelopeHistoryService.createEnvelopeHistory(envelopeHistory);
    }
}
