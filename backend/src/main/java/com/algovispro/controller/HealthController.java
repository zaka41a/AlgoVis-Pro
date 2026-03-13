package com.algovispro.controller;

import java.time.Instant;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algovispro.service.AlgorithmCatalogService;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final AlgorithmCatalogService catalogService;

    public HealthController(AlgorithmCatalogService catalogService) {
        this.catalogService = catalogService;
    }

    public record HealthResponse(
            String status,
            String service,
            String version,
            String timestamp,
            int algorithmCount) {
    }

    @GetMapping
    public HealthResponse health() {
        return new HealthResponse(
                "UP",
                "algovis-backend",
                "0.0.1",
                Instant.now().toString(),
                catalogService.algorithms().size());
    }
}
