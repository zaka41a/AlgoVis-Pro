package com.algovispro.dto;

public record AlgorithmDescriptorDto(
        String id,
        String name,
        String category,
        String description,
        String bestCase,
        String averageCase,
        String worstCase,
        String spaceComplexity) {
}
