import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Container,
  LinearProgress
} from '@mui/material'
import { getTest, saveTestResult } from '../services/testService'
import { useAuth } from '../contexts/AuthContext'
import type { Test, UserAnswer } from '../types/index'
import TestQuestion from '../components/test/TestQuestion'
import TestResults from '../components/test/TestResults'
import { allTests } from '../data/content'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

type TestParams = {
  id: string
}

export default function Test() {
  const { id } = useParams<keyof TestParams>()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [test, setTest] = useState<Test | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchTest = () => {
      const found = allTests.find(t=>t.id===id)
      if(found){
        setTest(found)
      }else{
        setError('Тест не найден')
      }
      setLoading(false)
    }

    fetchTest()
  }, [id])

  useEffect(() => {
    if (!test || showResults) return

    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [test, showResults])

  const handleAnswer = (value: number) => {
    if (!test) return
    setAnswers(prev => ({
      ...prev,
      [test.questions[currentQuestion].id]: value
    }))
  }

  const handleNext = () => {
    if (!test) return
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowConfirmDialog(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!test || !currentUser) return;

    setIsSubmitting(true);
    try {
      const correctAnswersCount = test.questions.filter(
        question => answers[question.id] === question.correctAnswer
      ).length;

      const calculatedScore = (correctAnswersCount / test.questions.length) * 100;
      setScore(calculatedScore);

      const userAnswers: UserAnswer[] = Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
        isCorrect: test.questions.find(q => q.id === questionId)?.correctAnswer === selectedOption
      }));

      const result = {
        id: Date.now().toString(),
        userId: currentUser.id,
        testId: test.id,
        score: calculatedScore,
        totalQuestions: test.questions.length,
        correctAnswers: correctAnswersCount,
        timeSpent,
        answers: userAnswers.map(ua => ({
          questionId: ua.questionId,
          answer: [ua.selectedOption.toString()],
          selectedAnswer: ua.selectedOption,
          isCorrect: ua.isCorrect
        })),
        startedAt: Date.now() - timeSpent * 1000,
        completedAt: Date.now()
      };

      // Save to Local Storage
      const localStorageKey = `testResults_${currentUser.id}`;
      const storedResults = JSON.parse(localStorage.getItem(localStorageKey) || '[]') as any[];
      localStorage.setItem(localStorageKey, JSON.stringify([...storedResults, result]));

      // Save to Firestore
      try {
        await addDoc(collection(db, 'results'), result);
      } catch (e) {
        console.error('Firestore save error', e);
      }

      setShowResults(true);
    } catch (err) {
      console.error('Error saving test results:', err);
      setError(err instanceof Error ? err.message : 'Ошибка при сохранении результатов теста');
    } finally {
      setIsSubmitting(false);
      setShowConfirmDialog(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
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
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Вернуться на главную
        </Button>
      </Container>
    )
  }

  if (!test) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 4 }}>
          Тест не найден
        </Alert>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Вернуться на главную
        </Button>
      </Container>
    )
  }

  if (showResults) {
    return (
      <TestResults
        test={test}
        answers={answers}
        score={score}
        timeSpent={timeSpent}
        onBack={() => navigate('/')}
      />
    )
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100

  return (
    <Container>
      <Paper sx={{ p: 3, mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">
            {test.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Время: {formatTime(timeSpent)}
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          {test.description}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Вопрос {currentQuestion + 1} из {test.questions.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress)}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} />
        </Box>

        <TestQuestion
          question={test.questions[currentQuestion]}
          value={answers[test.questions[currentQuestion].id] !== undefined ? answers[test.questions[currentQuestion].id] : -1}
          onChange={handleAnswer}
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Назад
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={answers[test.questions[currentQuestion].id] === undefined}
          >
            {currentQuestion === test.questions.length - 1 ? 'Завершить' : 'Далее'}
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
      >
        <DialogTitle>Завершить тест?</DialogTitle>
        <DialogContent>
          <Typography>
            Вы уверены, что хотите завершить тест? После завершения вы не сможете изменить свои ответы.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>
            Отмена
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Сохранение...' : 'Завершить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
} 