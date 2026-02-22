package com.algovispro.dto;

import java.util.List;

public record ScenarioDto(
        String id,
        String algorithmId,
        String label,
        List<Integer> values) {
}
