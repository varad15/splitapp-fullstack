import React, { useState } from 'react';
import {
  Paper, Stack, TextField, Button, Typography
} from '@mui/material';
import { motion } from 'framer-motion';

export default function ExpenseForm({ onAdded }) {
  const [form, setForm] = useState({ amount:'', description:'', paidBy:'', involved:'' });

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({
        amount:        parseFloat(form.amount),
        description:   form.description,
        paidBy:        form.paidBy.trim(),
        involvedPeople: form.involved.split(',').map(s=>s.trim()).filter(Boolean)
      })
    });
    setForm({ amount:'', description:'', paidBy:'', involved:'' });
    onAdded();
  };

  return (
    <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Add Expense</Typography>
        <form onSubmit={submit}>
          <Stack direction={{ xs:'column', sm:'row' }} spacing={2}>
            <TextField label="Amount"     name="amount"      type="number" value={form.amount}      onChange={handle} required />
            <TextField label="Description" name="description" value={form.description} onChange={handle} required />
            <TextField label="Paid By"     name="paidBy"      value={form.paidBy}      onChange={handle} required />
            <TextField label="Involved (comma)" name="involved" value={form.involved} onChange={handle} sx={{ flexGrow:1 }} />
            <Button variant="contained" type="submit">Add</Button>
          </Stack>
        </form>
      </Paper>
    </motion.div>
  );
}
