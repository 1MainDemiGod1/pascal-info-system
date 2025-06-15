import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, Button, Box } from '@mui/material'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center'
        }}
      >
        <Typography variant="h1" color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Страница не найдена
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Извините, запрашиваемая страница не существует или была перемещена.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/')}
        >
          Вернуться на главную
        </Button>
      </Box>
    </Container>
  )
} 