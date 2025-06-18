import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#6c63ff' : '#8a85ff'
      },
      background: {
        default: mode === 'light' ? '#f4f6fa' : '#121212',
        paper:   mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(30,30,30,0.7)'
      }
    },
    shape: { borderRadius: 16 },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(12px)',           // 💎 glass-effect
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
          }
        }
      }
    }
  });
