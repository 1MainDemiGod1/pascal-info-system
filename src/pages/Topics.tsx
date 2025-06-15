import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  Box,
  Chip
} from '@mui/material'
import type { Topic } from '../types/index'
import { allTopics } from '../data/content'
import { getTopicProgress, isTopicCompleted } from '../utils/progress'

export default function Topics() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        // Используем локальные данные с дополнительными полями
        const topicsData = allTopics.map(topic => ({
          ...topic,
          lessons: topic.subTopics.length,
          duration: `${topic.subTopics.length * 15} мин`,
          progress: currentUser ? getTopicProgress(currentUser.id, topic.id, topic.subTopics.length) : 0,
          completed: currentUser ? isTopicCompleted(currentUser.id, topic.id) : false
        }))
        setTopics(topicsData)
      } catch (err) {
        setError('Ошибка при загрузке тем')
        console.error('Error fetching topics:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTopics()
  }, [currentUser])

  const handleNavigate = (id: string) => {
    navigate(`/topics/${id}`)
  }

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    )
  }

  if (topics.length === 0) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Темы пока не добавлены
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Темы будут доступны в ближайшее время
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Темы для изучения
        </Typography>
        <Grid container spacing={3}>
          {topics.map((topic) => (
            <Grid item xs={12} sm={6} md={4} key={topic.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {topic.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {topic.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                      label={`${topic.lessons} уроков`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={topic.duration}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  </Box>
                  {currentUser?.role === 'student' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Прогресс:
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {topic.progress}%
                      </Typography>
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleNavigate(topic.id)}
                  >
                    Изучить тему
                  </Button>
                  {currentUser?.role === 'student' && topic.completed && (
                    <Chip
                      label="Завершено"
                      size="small"
                      color="success"
                      sx={{ ml: 'auto' }}
                    />
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
} 