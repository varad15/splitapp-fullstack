package com.splitapp.service;

import com.splitapp.model.Expense;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class SettlementService {

    private final ExpenseService expenseService;

    public SettlementService(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    public Map<String, Double> calculateBalances() {
        Map<String, Double> spent = new HashMap<>();
        Map<String, Double> owed  = new HashMap<>();

        for (Expense e : expenseService.findAll()) {
            String payer = e.getPaidBy();
            spent.merge(payer, e.getAmount(), Double::sum);

            List<String> people = new ArrayList<>(e.getInvolvedPeople());
            if (!people.contains(payer)) people.add(payer);

            double share = e.getAmount() / people.size();
            for (String person : people) {
                owed.merge(person, share, Double::sum);
            }
        }

        Map<String, Double> net = new HashMap<>();
        Set<String> everyone = new HashSet<>();
        everyone.addAll(spent.keySet());
        everyone.addAll(owed.keySet());

        for (String p : everyone) {
            double balance = spent.getOrDefault(p, 0.0) - owed.getOrDefault(p, 0.0);
            net.put(p, Math.round(balance * 100.0) / 100.0);
        }
        return net;
    }

    public static class Transaction {
        private final String from;
        private final String to;
        private final Double amount;
        public Transaction(String from, String to, Double amount) {
            this.from = from;
            this.to = to;
            this.amount = amount;
        }
        public String getFrom() { return from; }
        public String getTo() { return to; }
        public Double getAmount() { return amount; }
    }

    public List<Transaction> optimizeTransactions() {
        Map<String, Double> net = calculateBalances();

        List<Map.Entry<String, Double>> creditors = new ArrayList<>();
        List<Map.Entry<String, Double>> debtors   = new ArrayList<>();

        net.forEach((person, balance) -> {
            if (balance > 0.0)
                creditors.add(new AbstractMap.SimpleEntry<>(person, balance));
            else if (balance < 0.0)
                debtors.add(new AbstractMap.SimpleEntry<>(person, -balance)); // store positive
        });

        creditors.sort((a,b)->Double.compare(b.getValue(), a.getValue()));
        debtors.sort((a,b)->Double.compare(b.getValue(), a.getValue()));

        List<Transaction> transfers = new ArrayList<>();
        int i = 0, j = 0;
        while (i < creditors.size() && j < debtors.size()) {
            Map.Entry<String, Double> cred = creditors.get(i);
            Map.Entry<String, Double> debt = debtors.get(j);

            double amount = Math.min(cred.getValue(), debt.getValue());
            amount = Math.round(amount * 100.0) / 100.0;

            transfers.add(new Transaction(debt.getKey(), cred.getKey(), amount));

            creditors.set(i, new AbstractMap.SimpleEntry<>(cred.getKey(), cred.getValue() - amount));
            debtors.set(j, new AbstractMap.SimpleEntry<>(debt.getKey(), debt.getValue() - amount));

            if (creditors.get(i).getValue() < 0.01) i++;
            if (debtors.get(j).getValue() < 0.01) j++;
        }
        return transfers;
    }

    public Set<String> getPeople() {
        Set<String> people = new HashSet<>();
        expenseService.findAll().forEach(e -> {
            people.add(e.getPaidBy());
            people.addAll(e.getInvolvedPeople());
        });
        return people;
    }
}
