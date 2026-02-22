package com.algovispro.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algovispro.dto.AlgorithmDescriptorDto;
import com.algovispro.dto.ScenarioDto;
import com.algovispro.service.AlgorithmCatalogService;

@RestController
@RequestMapping("/api/algorithms")
public class AlgorithmsController {

    private final AlgorithmCatalogService catalogService;

    public AlgorithmsController(AlgorithmCatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping
    public List<AlgorithmDescriptorDto> getAlgorithms() {
        return catalogService.algorithms();
    }

    @GetMapping("/{algorithmId}/scenarios")
    public List<ScenarioDto> getScenarios(@PathVariable String algorithmId) {
        return catalogService.scenariosByAlgorithm(algorithmId);
    }
}
