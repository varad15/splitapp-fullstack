import React, { useEffect, useState } from 'react';
import {
  Paper, Typography, List, ListItem, ListItemText
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

export default function Settlements({ refreshKey }) {
  const [list, setList] = useState([]);

  useEffect(() => { fetch('/api/settlements').then(r=>r.json()).then(setList); }, [refreshKey]);

  return (
    <motion.div key={refreshKey} initial={{ opacity:0 }} animate={{ opacity:1 }}>
      <Paper sx={{ p:3 }}>
        <Typography variant="h6" gutterBottom>Simplified Settlements</Typography>
        <List>
          <AnimatePresence>
            {list.length===0 && (
              <ListItem component={motion.li} exit={{ opacity:0 }}>
                <ListItemText primary="Nothing to settle 🎉" />
              </ListItem>
            )}
            {list.map((t, i)=>(
              <ListItem key={i} component={motion.li} initial={{ x:-20, opacity:0 }} animate={{ x:0, opacity:1 }} exit={{ opacity:0 }}>
                <ListItemText primary={`${t.from} pays ${t.to} ₹${t.amount}`} />
              </ListItem>
            ))}
          </AnimatePresence>
        </List>
      </Paper>
    </motion.div>
  );
}
