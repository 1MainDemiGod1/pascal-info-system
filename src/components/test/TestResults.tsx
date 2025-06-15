import React from 'react'
import {
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  Chip,
  Container,
  LinearProgress
} from '@mui/material'
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Timer as TimerIcon,
  Star as StarIcon
} from '@mui/icons-material'
import type { Test } from '../../types'

interface TestResultsProps {
  test: Test
  answers: { [key: string]: number }
  score: number
  timeSpent: number
  onBack: () => void
}

export default function TestResults({ test, answers, score, timeSpent, onBack }: TestResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    return 'error'
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const correctAnswers = test.questions.filter(
    question => answers[question.id] === question.correctAnswer
  ).length

  const scoreColor = getScoreColor(score)

  const isFinal = test.type === 'final'

  return (
    <Container>
      <Paper 
        sx={{ 
          p: 3, 
          mt: 4,
          bgcolor: 'background.paper',
          boxShadow: 3
        }}
      >
        <Typography variant="h4" gutterBottom>
          Результаты теста
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <StarIcon color={scoreColor} sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h5" color={`${scoreColor}.main`}>
                {score.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Правильных ответов: {correctAnswers} из {test.questions.length}
              </Typography>
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={score}
            color={scoreColor}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <Chip
            icon={<TimerIcon />}
            label={`Время: ${formatTime(timeSpent)}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<CheckCircleIcon />}
            label={`Правильных: ${correctAnswers}`}
            color="success"
            variant="outlined"
          />
          <Chip
            icon={<CancelIcon />}
            label={`Ошибок: ${test.questions.length - correctAnswers}`}
            color="error"
            variant="outlined"
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Детальный разбор
        </Typography>

        <Box sx={{ mt: 3 }}>
          {test.questions.map((question, index) => {
            const isCorrect = answers[question.id] === question.correctAnswer
            const userAnswer = answers[question.id] !== undefined ? question.options[answers[question.id]] : 'Не отвечено'

            return (
              <Box 
                key={question.id} 
                sx={{ 
                  mb: 3,
                  p: 2,
                  borderRadius: 1,
                  bgcolor: isFinal ? 'background.default' : (isCorrect ? 'success.light' : 'error.light'),
                  opacity: isFinal ? 1 : 0.1
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Вопрос {index + 1}
                </Typography>
                <Typography variant="body1" paragraph>
                  {question.text}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Ваш ответ:
                  </Typography>
                  <Chip
                    label={userAnswer}
                    color={isFinal ? 'default' : (isCorrect ? 'success' : 'error')}
                    size="small"
                    icon={isFinal ? undefined : (isCorrect ? <CheckCircleIcon /> : <CancelIcon />)}
                  />
                </Box>
                {!isFinal && (
                  <Divider sx={{ my: 2 }} />
                )}
              </Box>
            )
          })}
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onBack}
            size="large"
          >
            Вернуться на главную
          </Button>
        </Box>
      </Paper>
    </Container>
  )
} 