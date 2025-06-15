import React from 'react'
import { Paper, Typography, Box, SxProps, Theme } from '@mui/material'

interface CardProps {
  title?: string
  children: React.ReactNode
  sx?: SxProps<Theme>
  elevation?: number
}

export default function Card({ title, children, sx, elevation = 1 }: CardProps) {
  return (
    <Paper
      elevation={elevation}
      sx={{
        p: 3,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        },
        ...sx
      }}
    >
      {title && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}
      <Box>{children}</Box>
    </Paper>
  )
} 