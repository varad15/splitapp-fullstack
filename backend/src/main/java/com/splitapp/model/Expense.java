package com.splitapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "expenses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 0, message = "Amount must be positive")
    private double amount;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "PaidBy is required")
    private String paidBy;

    @ElementCollection
    private List<String> involvedPeople; // names

    private LocalDateTime createdAt = LocalDateTime.now();
}
