import React, { useEffect, useState } from 'react';
import {
  Paper, Typography, Chip, Stack
} from '@mui/material';
import { motion } from 'framer-motion';

export default function Balances({ refreshKey }) {
  const [data, setData] = useState({});

  useEffect(() => { fetch('/api/balances').then(r=>r.json()).then(setData); }, [refreshKey]);

  return (
    <motion.div key={refreshKey} initial={{ opacity:0 }} animate={{ opacity:1 }}>
      <Paper sx={{ p:3 }}>
        <Typography variant="h6" gutterBottom>Balances</Typography>
        <Stack spacing={1}>
          {Object.entries(data).map(([name, bal]) => (
            <Chip
              key={name}
              label={`${name}: ${bal>0?'gets':'owes'} ₹${Math.abs(bal)}`}
              color={bal>0?'success':bal<0?'error':'default'}
              variant="outlined"
            />
          ))}
        </Stack>
      </Paper>
    </motion.div>
  );
}
