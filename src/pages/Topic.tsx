import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { Topic, SubTopic } from '../types/index'
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
  Divider,
  Chip,
  Paper
} from '@mui/material'
import {
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Timer as TimerIcon
} from '@mui/icons-material'
import { allTopics } from '../data/content'
import { isSubTopicDone, getTopicProgress, markTopicCompleted, isTopicCompleted } from '../utils/progress'

interface SubTopicCardProps {
  subTopic: SubTopic
  onNavigate: (id: string) => void
  onTestNavigate: (id: string) => void
  showTestButton: boolean
  progress?: number
}

function SubTopicCard({ 
  subTopic, 
  onNavigate, 
  onTestNavigate, 
  showTestButton,
  progress 
}: SubTopicCardProps) {
  const hasTest = subTopic.test && subTopic.test.id

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <BookIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">
            {subTopic.title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          {subTopic.content.substring(0, 150)}...
        </Typography>
        {progress !== undefined && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Прогресс: {progress}%
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
                  width: `${progress}%`,
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
          onClick={() => onNavigate(subTopic.id)}
        >
          Изучить подтему
        </Button>
        {showTestButton && hasTest && (
          <Button 
            size="small" 
            color="secondary"
            onClick={() => onTestNavigate(subTopic.test!.id)}
            startIcon={<AssignmentIcon />}
          >
            Пройти тест
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

type TopicParams = {
  id: string
}

export default function Topic() {
  const { id } = useParams<TopicParams>()
  const [topic, setTopic] = useState<Topic | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!id) {
      setError('ID темы не указан')
      setLoading(false)
      return
    }
    const found = allTopics.find(t=>t.id===id)
    if(found){
      setTopic(found)
      if(currentUser){
        setCompleted(isTopicCompleted(currentUser.id, found.id))
      }
    }else{
      setError('Тема не найдена')
    }
    setLoading(false)
  }, [id, currentUser])

  const handleNavigate = (subTopicId: string) => {
    navigate(`/subtopic/${subTopicId}`)
  }

  const handleTestNavigate = (testId: string) => {
    navigate(`/test/${testId}`)
  }

  const overallProgress = (topic && currentUser) ? getTopicProgress(currentUser.id, topic.id, topic.subTopics.length) : 0

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

  if (!topic) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Тема не найдена
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Возможно, она была удалена или перемещена
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {topic.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {topic.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            icon={<TimerIcon />}
            label={topic.duration}
            size="small"
          />
          <Chip
            icon={<BookIcon />}
            label={`${topic.lessons} уроков`}
            size="small"
          />
        </Box>

        {currentUser?.role === 'student' && (
          <Box sx={{ mb:4 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Общий прогресс: {overallProgress}%
            </Typography>
            <Paper variant="outlined" sx={{ height:8, borderRadius:4 }}>
              <Box sx={{ height:'100%', width:`${overallProgress}%`, bgcolor:'primary.main', borderRadius:4 }} />
            </Paper>
          </Box>
        )}

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Подтемы
        </Typography>
        {topic.subTopics.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Подтемы будут добавлены в ближайшее время
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {topic.subTopics.map((subTopic) => (
              <Grid item xs={12} sm={6} md={4} key={subTopic.id}>
                <SubTopicCard
                  subTopic={subTopic}
                  onNavigate={handleNavigate}
                  onTestNavigate={handleTestNavigate}
                  showTestButton={currentUser?.role === 'student'}
                  progress={currentUser?.role === 'student' ? (currentUser ? (isSubTopicDone(currentUser.id, topic.id, subTopic.id) ? 100 : 0) : 0) : undefined}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {currentUser?.role === 'student' && topic.finalTest && (
          <>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" gutterBottom>
              Проверка знаний
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Итоговый тест по теме
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Проверьте свои знания по всей теме
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => navigate(`/test/${topic.finalTest?.id}`)}
                  startIcon={<AssignmentIcon />}
                >
                  Начать тест
                </Button>
              </CardActions>
            </Card>
          </>
        )}

        {currentUser?.role==='student' && overallProgress===100 && !completed && (
          <Box sx={{ mt:4, textAlign:'center' }}>
            <Button variant="outlined" color="success" onClick={()=>{if(currentUser) {markTopicCompleted(currentUser.id, topic!.id); setCompleted(true);} }}>Завершить тему</Button>
          </Box>
        )}
      </Box>
    </Container>
  )
} 