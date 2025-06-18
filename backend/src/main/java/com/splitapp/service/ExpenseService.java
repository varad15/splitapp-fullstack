package com.splitapp.service;

import com.splitapp.model.Expense;
import com.splitapp.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> findAll() {
        return expenseRepository.findAll();
    }

    public Expense updateExpense(Long id, Expense updated) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
        existing.setAmount(updated.getAmount());
        existing.setDescription(updated.getDescription());
        existing.setPaidBy(updated.getPaidBy());
        existing.setInvolvedPeople(updated.getInvolvedPeople());
        return expenseRepository.save(existing);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}
