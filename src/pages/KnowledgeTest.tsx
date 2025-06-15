import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Test, TestResult } from '../types/index'
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  LinearProgress,
  Alert
} from '@mui/material'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function KnowledgeTest() {
  const { id } = useParams<{ id: string }>()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [test, setTest] = useState<Test | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [testCompleted, setTestCompleted] = useState(false)

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const testDoc = await getDoc(doc(db, 'tests', id!))
        if (testDoc.exists()) {
          const testData = testDoc.data() as Test
          setTest(testData)
          setTimeLeft(testData.timeLimit * 60)
          setAnswers(new Array(testData.questions.length).fill(-1))
        } else {
          setError('Тест не найден')
        }
      } catch (err) {
        setError('Ошибка при загрузке теста')
      } finally {
        setLoading(false)
      }
    }

    fetchTest()
  }, [id])

  useEffect(() => {
    if (timeLeft > 0 && !testCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeLeft, testCompleted])

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    if (!test || !currentUser) return

    setTestCompleted(true)
    const startTime = test.timeLimit * 60 - timeLeft
    const correctAnswers = answers.filter((answer, index) => 
      answer === test.questions[index].correctAnswer
    ).length

    const testResult: TestResult = {
      id: Date.now().toString(),
      userId: currentUser.id,
      testId: test.id,
      score: (correctAnswers / test.questions.length) * 100,
      totalQuestions: test.questions.length,
      correctAnswers,
      timeSpent: startTime,
      answers: answers.map((answer, index) => ({
        questionId: test.questions[index].id,
        answer: [answer.toString()],
        selectedAnswer: answer,
        isCorrect: answer === test.questions[index].correctAnswer
      })),
      startedAt: Date.now() - (test.timeLimit * 60 - timeLeft) * 1000,
      completedAt: Date.now()
    }

    try {
      // Сохраняем результат теста
      await setDoc(doc(db, 'testResults', testResult.id), testResult)
      
      // Обновляем профиль пользователя
      const userProfileRef = doc(db, 'userProfiles', currentUser.id)
      const userProfileDoc = await getDoc(userProfileRef)
      
      if (userProfileDoc.exists()) {
        const userProfile = userProfileDoc.data()
        await setDoc(userProfileRef, {
          ...userProfile,
          testResults: [...(userProfile.testResults || []), testResult]
        })
      } else {
        await setDoc(userProfileRef, {
          userId: currentUser.id,
          testResults: [testResult],
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }

      navigate(`/test/${id}/result`)
    } catch (err) {
      setError('Ошибка при сохранении результатов')
    }
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

  if (!test) {
    return null
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {test.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {test.description}
        </Typography>
        
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">
            Время: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(currentQuestion / test.questions.length) * 100} 
            sx={{ mt: 1 }}
          />
        </Paper>

        {!testCompleted && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Вопрос {currentQuestion + 1} из {test.questions.length}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {test.questions[currentQuestion].text}
            </Typography>

            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <RadioGroup
                value={answers[currentQuestion]}
                onChange={(e) => handleAnswerChange(currentQuestion, parseInt(e.target.value))}
              >
                {test.questions[currentQuestion].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={index}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
              >
                Назад
              </Button>
              {currentQuestion < test.questions.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  disabled={answers[currentQuestion] === -1}
                >
                  Далее
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={answers.includes(-1)}
                >
                  Завершить тест
                </Button>
              )}
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  )
} 