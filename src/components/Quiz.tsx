import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Paper,
  Stack
} from '@mui/material'

interface QuizProps {
  questions: {
    question: string
    options: string[]
    correctAnswer: number
  }[]
}

const Quiz = ({ questions }: QuizProps) => {
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleSubmit = () => {
    if (answers.includes(-1)) {
      alert('Пожалуйста, ответьте на все вопросы')
      return
    }

    const correctAnswers = answers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0)
    }, 0)

    setScore(correctAnswers)
    setIsSubmitted(true)
  }

  const handleAnswerChange = (questionIndex: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = parseInt(value)
    setAnswers(newAnswers)
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight="bold">
        Проверьте свои знания
      </Typography>
      
      {questions.map((q, qIndex) => (
        <Paper 
          key={qIndex} 
          elevation={1}
          sx={{ p: 3 }}
        >
          <Typography variant="h6" gutterBottom>
            {qIndex + 1}. {q.question}
          </Typography>
          <FormControl component="fieldset">
          <RadioGroup 
            value={answers[qIndex].toString()}
              onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
          >
              <Stack spacing={1}>
              {q.options.map((option, oIndex) => (
                  <FormControlLabel
                  key={oIndex} 
                  value={oIndex.toString()}
                    control={
                      <Radio
                        disabled={isSubmitted}
                        color={
                    isSubmitted 
                      ? oIndex === q.correctAnswer 
                              ? 'success'
                        : answers[qIndex] === oIndex 
                                ? 'error'
                                : 'default'
                            : 'primary'
                  }
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>{option}</Typography>
                    {isSubmitted && (
                      oIndex === q.correctAnswer ? (
                            <Typography color="success.main">(Правильный ответ)</Typography>
                      ) : answers[qIndex] === oIndex ? (
                            <Typography color="error.main">(Ваш ответ)</Typography>
                      ) : null
                    )}
                      </Box>
                    }
                  />
              ))}
              </Stack>
          </RadioGroup>
          </FormControl>
        </Paper>
      ))}

      {isSubmitted ? (
        <Paper 
          sx={{ 
            p: 2, 
            bgcolor: score === questions.length ? 'success.light' : 'info.light' 
          }}
        >
          <Typography variant="h6">
            Ваш результат: {score} из {questions.length} ({Math.round(score/questions.length * 100)}%)
          </Typography>
        </Paper>
      ) : (
        <Button 
          variant="contained" 
          size="large" 
          onClick={handleSubmit}
          disabled={answers.includes(-1)}
        >
          Проверить ответы
        </Button>
      )}
    </Stack>
  )
}

export default Quiz 