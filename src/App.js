import React, { useState, useMemo } from 'react';
import {
  AppBar, Toolbar, Typography, Container,
  IconButton, Tabs, Tab, Box, Tooltip, Switch
} from '@mui/material';
import RefreshIcon   from '@mui/icons-material/Refresh';
import Brightness4   from '@mui/icons-material/Brightness4';
import Brightness7   from '@mui/icons-material/Brightness7';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme }  from './theme';

import ExpenseForm    from './components/ExpenseForm';
import ExpensesList   from './components/ExpensesList';
import Balances       from './components/Balances';
import Settlements    from './components/Settlements';

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [tab,        setTab]        = useState(0);
  const [mode,       setMode]       = useState('light');

  const theme = useMemo(() => getTheme(mode), [mode]);
  const doRefresh = () => setRefreshKey(k => k + 1);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" color="primary" sx={{
        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary?.main || '#9c27b0'} 100%)`
      }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Split App</Typography>

          <Tooltip title="Toggle dark / light">
            <IconButton sx={{ mr: 1 }} color="inherit" onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')}>
              {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Refresh all">
            <IconButton color="inherit" onClick={doRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <ExpenseForm onAdded={doRefresh} />

        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{ mt: 4 }}>
          <Tab label="Balances"    />
          <Tab label="Settlements" />
          <Tab label="Expenses"    />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {tab === 0 && <Balances     refreshKey={refreshKey} />}
          {tab === 1 && <Settlements  refreshKey={refreshKey} />}
          {tab === 2 && <ExpensesList refreshKey={refreshKey} />}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
