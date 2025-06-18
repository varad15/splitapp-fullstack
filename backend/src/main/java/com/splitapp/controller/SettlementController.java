package com.splitapp.controller;

import com.splitapp.service.SettlementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class SettlementController {

    private final SettlementService settlementService;

    public SettlementController(SettlementService settlementService) {
        this.settlementService = settlementService;
    }

    @GetMapping("/balances")
    public Map<String, Double> balances() {
        return settlementService.calculateBalances();
    }

    @GetMapping("/settlements")
    public List<SettlementService.Transaction> settlements() {
        return settlementService.optimizeTransactions();
    }

    @GetMapping("/people")
    public List<String> people() {
        return settlementService.getPeople().stream().toList();
    }
}
