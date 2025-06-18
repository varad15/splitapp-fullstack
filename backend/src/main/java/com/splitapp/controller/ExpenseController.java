package com.splitapp.controller;

import com.splitapp.model.Expense;
import com.splitapp.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public List<Expense> list() {
        return expenseService.findAll();
    }

    @PostMapping
    public ResponseEntity<Expense> add(@Valid @RequestBody Expense expense) {
        return ResponseEntity.ok(expenseService.addExpense(expense));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> update(@PathVariable Long id, @Valid @RequestBody Expense expense) {
        return ResponseEntity.ok(expenseService.updateExpense(id, expense));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
