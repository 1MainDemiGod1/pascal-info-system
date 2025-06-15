import React, { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material'
import { useLanguage } from './LanguageContext'

type ThemeMode = 'light' | 'dark'
type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'red'

interface ThemeContextType {
  mode: ThemeMode
  color: ThemeColor
  setMode: (mode: ThemeMode) => void
  setColor: (color: ThemeColor) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const colorPalettes = {
  blue: {
    primary: { main: '#1976d2' },
    secondary: { main: '#2196f3' },
    error: { main: '#f44336' },
    warning: { main: '#ff9800' },
    info: { main: '#2196f3' },
    success: { main: '#4caf50' }
  },
  green: {
    primary: { main: '#2e7d32' },
    secondary: { main: '#4caf50' },
    error: { main: '#f44336' },
    warning: { main: '#ff9800' },
    info: { main: '#2196f3' },
    success: { main: '#4caf50' }
  },
  purple: {
    primary: { main: '#7b1fa2' },
    secondary: { main: '#9c27b0' },
    error: { main: '#f44336' },
    warning: { main: '#ff9800' },
    info: { main: '#2196f3' },
    success: { main: '#4caf50' }
  },
  orange: {
    primary: { main: '#f57c00' },
    secondary: { main: '#ff9800' },
    error: { main: '#f44336' },
    warning: { main: '#ff9800' },
    info: { main: '#2196f3' },
    success: { main: '#4caf50' }
  },
  red: {
    primary: { main: '#d32f2f' },
    secondary: { main: '#f44336' },
    error: { main: '#f44336' },
    warning: { main: '#ff9800' },
    info: { main: '#2196f3' },
    success: { main: '#4caf50' }
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode
    return savedMode || 'light'
  })
  const [color, setColor] = useState<ThemeColor>(() => {
    const savedColor = localStorage.getItem('themeColor') as ThemeColor
    return savedColor || 'blue'
  })

  useEffect(() => {
    localStorage.setItem('themeMode', mode)
  }, [mode])

  useEffect(() => {
    localStorage.setItem('themeColor', color)
  }, [color])

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light')
  }

  const theme = createTheme({
    palette: {
      mode,
      ...colorPalettes[color],
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e'
      }
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 500
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 500
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 500
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light' 
              ? '0 2px 4px rgba(0,0,0,0.1)'
              : '0 2px 4px rgba(0,0,0,0.2)'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12
          }
        }
      }
    }
  })

  return (
    <ThemeContext.Provider value={{ mode, color, setMode, setColor, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 