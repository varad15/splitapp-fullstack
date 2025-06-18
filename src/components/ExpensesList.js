import React, { useEffect, useState } from 'react';
import {
  Paper, Typography, Grid, Card, CardContent
} from '@mui/material';
import { motion } from 'framer-motion';

export default function ExpensesList({ refreshKey }) {
  const [exp, setExp] = useState([]);

  useEffect(() => { fetch('/api/expenses').then(r=>r.json()).then(setExp); }, [refreshKey]);

  return (
    <motion.div key={refreshKey} initial={{ opacity:0 }} animate={{ opacity:1 }}>
      <Paper sx={{ p:3 }}>
        <Typography variant="h6" gutterBottom>All Expenses</Typography>

        <Grid container spacing={2}>
          {exp.map(e=>(
            <Grid item xs={12} sm={6} key={e.id}>
              <Card component={motion.div} whileHover={{ scale:1.03 }}>
                <CardContent>
                  <Typography variant="subtitle1">{e.description}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₹{e.amount} • paid by {e.paidBy}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </motion.div>
  );
}
