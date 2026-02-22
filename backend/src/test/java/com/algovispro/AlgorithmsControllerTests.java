package com.algovispro;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class AlgorithmsControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAlgorithmsReturnsCatalog() throws Exception {
        mockMvc.perform(get("/api/algorithms"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").exists())
                .andExpect(jsonPath("$[0].name").exists());
    }

    @Test
    void getScenariosForKnownAlgorithmReturnsItems() throws Exception {
        mockMvc.perform(get("/api/algorithms/bubble-sort/scenarios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].algorithmId").value("bubble-sort"))
                .andExpect(jsonPath("$[0].values").isArray());
    }

    @Test
    void getScenariosForUnknownAlgorithmReturnsEmptyArray() throws Exception {
        mockMvc.perform(get("/api/algorithms/unknown/scenarios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));
    }
}
