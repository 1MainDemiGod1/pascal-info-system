import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  Zoom,
  Chip,
  Paper
} from '@mui/material'
import {
  Assignment as AssignmentIcon,
  Timer as TimerIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon
} from '@mui/icons-material'
import type { Test } from '../types/index'
import { allTests } from '../data/content'

const difficultyColors: Record<string, 'success' | 'warning' | 'error'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'error'
}

const difficultyLabels: Record<string, string> = {
  easy: 'Легкий',
  medium: 'Средний',
  hard: 'Сложный'
}

export default function Tests() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tests, setTests] = useState<Test[]>([])

  useEffect(() => {
    const fetchTests = async () => {
      try {
        // Используем локальные данные с дополнительными полями
        const testsData = allTests.map(test => ({
          ...test,
          duration: `${test.timeLimit} мин`,
          difficulty: (test.type === 'final' ? 'hard' : test.type === 'practice' ? 'easy' : 'medium') as 'easy' | 'medium' | 'hard',
          progress: 0,
          completed: false,
          score: null
        }))
        setTests(testsData)
      } catch (err) {
        setError('Ошибка при загрузке тестов')
        console.error('Error fetching tests:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTests()
  }, [])

  const handleNavigate = (id: string) => {
    navigate(`/test/${id}`)
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  if (tests.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" gutterBottom>
            Тесты пока не добавлены
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Тесты будут доступны в ближайшее время
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Тесты
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {tests.map((test, index) => (
          <Grid item xs={12} md={6} key={test.id}>
            <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2
                    }}
                  >
                    <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h5" component="h2">
                      {test.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {test.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<TimerIcon />}
                      label={test.duration}
                      size="small"
                    />
                    <Chip
                      icon={<SchoolIcon />}
                      label={`${test.questions.length} вопросов`}
                      size="small"
                    />
                    <Chip
                      label={difficultyLabels[test.difficulty || 'medium']}
                      color={difficultyColors[test.difficulty || 'medium']}
                      size="small"
                    />
                  </Box>
                  {test.completed && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <CheckCircleIcon color="success" />
                      <Typography variant="body2" color="success.main">
                        Тест пройден
                      </Typography>
                      {test.score !== null && (
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                          <StarIcon color="warning" sx={{ mr: 0.5 }} />
                          <Typography variant="body2" color="warning.main">
                            {test.score}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                  {!test.completed && (test.progress || 0) > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Прогресс: {test.progress}%
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          height: 8,
                          bgcolor: 'background.default',
                          borderRadius: 4
                        }}
                      >
                        <Box
                          sx={{
                            height: '100%',
                            width: `${test.progress}%`,
                            bgcolor: 'primary.main',
                            borderRadius: 4
                          }}
                        />
                      </Paper>
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleNavigate(test.id)}
                  >
                    {test.completed ? 'Пройти снова' : 'Начать тест'}
                  </Button>
                </CardActions>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
} 