import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip
} from '@mui/material'
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { Test, TestResult } from '../types/index'
import { useAuth } from '../contexts/AuthContext'

export default function TestResultPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const [test, setTest] = useState<Test | null>(null)
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTestAndResult = async () => {
      if (!id) return

      try {
        // Получаем тест
        const testDoc = await getDoc(doc(db, 'tests', id))
        if (!testDoc.exists()) {
          setError('Тест не найден')
          return
        }
        setTest({ id: testDoc.id, ...testDoc.data() } as Test)

        // Получаем результат теста
        const testResultsQuery = query(
          collection(db, 'testResults'),
          where('testId', '==', id),
          where('userId', '==', currentUser?.id),
          orderBy('completedAt', 'desc'),
          limit(1)
        )
        const testResultsSnapshot = await getDocs(testResultsQuery)
        if (!testResultsSnapshot.empty) {
          const resultDoc = testResultsSnapshot.docs[0]
          setTestResult({ id: resultDoc.id, ...resultDoc.data() } as TestResult)
        }
      } catch (error) {
        console.error('Error fetching test result:', error)
        setError('Ошибка при загрузке результатов')
      } finally {
        setLoading(false)
      }
    }

    fetchTestAndResult()
  }, [id, currentUser?.id])

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error || !test || !testResult) {
    return (
      <Container>
        <Alert severity="error">{error || 'Результаты не найдены'}</Alert>
      </Container>
    )
  }

  const score = location.state?.score || testResult.score
  const totalQuestions = location.state?.totalQuestions || test.questions.length
  const percentage = (score / (totalQuestions * 2)) * 100 // Предполагаем, что каждый вопрос стоит 2 балла
  const passed = percentage >= (test.passingScore || 70)

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Результаты теста
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            {test.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
            <Chip
              label={passed ? 'Тест пройден' : 'Тест не пройден'}
              color={passed ? 'success' : 'error'}
              sx={{ fontSize: '1.1rem', py: 2 }}
            />
            <Typography variant="h6">
              {score} из {totalQuestions * 2} баллов ({percentage.toFixed(1)}%)
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary">
            Время выполнения: {Math.floor((testResult.timeSpent || 0) / 60)} мин {(testResult.timeSpent || 0) % 60} сек
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Детали ответов
        </Typography>

        <List>
          {test.questions.map((question, index) => {
            const answer = testResult.answers.find(a => a.questionId === question.id)
            const isCorrect = answer?.isCorrect

            return (
              <React.Fragment key={question.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          Вопрос {index + 1}: {question.text}
                        </Typography>
                        <Chip
                          label={isCorrect ? 'Верно' : 'Неверно'}
                          color={isCorrect ? 'success' : 'error'}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={null}
                  />
                </ListItem>
                {index < test.questions.length - 1 && <Divider />}
              </React.Fragment>
            )
          })}
        </List>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={() => navigate(`/topic/${test.subTopicId}`)}
          >
            Вернуться к теме
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/test/${test.id}`)}
          >
            Пройти тест снова
          </Button>
        </Box>
      </Paper>
    </Container>
  )
} 