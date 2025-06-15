import React from 'react'
import { Box, LinearProgress, Typography, SxProps, Theme } from '@mui/material'

interface ProgressProps {
  value: number
  label?: string
  sx?: SxProps<Theme>
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
}

export default function Progress({ value, label, sx, color = 'primary' }: ProgressProps) {
  return (
    <Box sx={{ width: '100%', ...sx }}>
      {label && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(value)}%
          </Typography>
        </Box>
      )}
      <LinearProgress
        variant="determinate"
        value={value}
        color={color}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4
          }
        }}
      />
    </Box>
  )
} 