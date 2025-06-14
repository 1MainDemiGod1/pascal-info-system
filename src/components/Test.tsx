import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Text,
  VStack,
  HStack,
  useToast,
  Progress,
  Heading
} from '@chakra-ui/react'
import { Test as TestType, TestResult } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

interface TestProps {
  test: TestType
  onComplete?: (result: TestResult) => void
}

const Test = ({ test, onComplete }: TestProps) => {
  const [answers, setAnswers] = useState<number[]>(new Array(test.questions.length).fill(-1))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = parseInt(value)
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    if (answers.includes(-1)) {
      toast({
        title: 'Не все вопросы отвечены',
        description: 'Пожалуйста, ответьте на все вопросы перед отправкой',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const correctAnswers = answers.reduce((acc, answer, index) => {
      return acc + (answer === test.questions[index].correctAnswer ? 1 : 0)
    }, 0)

    setScore(correctAnswers)
    setIsSubmitted(true)

    if (currentUser) {
      const result: TestResult = {
        id: Date.now().toString(),
        userId: currentUser.id,
        testId: test.id,
        score: correctAnswers,
        totalQuestions: test.questions.length,
        completedAt: new Date(),
        answers
      }

      try {
        await setDoc(doc(db, 'testResults', result.id), result)
        if (onComplete) {
          onComplete(result)
        }
        toast({
          title: 'Результаты сохранены',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } catch (error) {
        toast({
          title: 'Ошибка при сохранении результатов',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100

  return (
    <VStack spacing={6} align="stretch" w="100%">
      <Box>
        <Progress value={progress} colorScheme="blue" mb={2} />
        <Text fontSize="sm" color="gray.500">
          Вопрос {currentQuestion + 1} из {test.questions.length}
        </Text>
      </Box>

      <Box p={6} borderWidth="1px" borderRadius="lg" bg="white" shadow="sm">
        <Heading size="md" mb={4}>
          {test.questions[currentQuestion].question}
        </Heading>
        <RadioGroup
          value={answers[currentQuestion].toString()}
          onChange={handleAnswerChange}
        >
          <VStack align="stretch" spacing={3}>
            {test.questions[currentQuestion].options.map((option, index) => (
              <Radio
                key={index}
                value={index.toString()}
                isDisabled={isSubmitted}
                colorScheme={
                  isSubmitted
                    ? index === test.questions[currentQuestion].correctAnswer
                      ? 'green'
                      : answers[currentQuestion] === index
                        ? 'red'
                        : 'gray'
                    : 'blue'
                }
              >
                <HStack spacing={2}>
                  <Text>{option}</Text>
                  {isSubmitted && (
                    index === test.questions[currentQuestion].correctAnswer ? (
                      <Text color="green.500">(Правильный ответ)</Text>
                    ) : answers[currentQuestion] === index ? (
                      <Text color="red.500">(Ваш ответ)</Text>
                    ) : null
                  )}
                </HStack>
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
      </Box>

      <HStack spacing={4} justify="space-between">
        <Button
          onClick={handlePrevious}
          isDisabled={currentQuestion === 0}
          colorScheme="blue"
          variant="outline"
        >
          Назад
        </Button>
        {currentQuestion < test.questions.length - 1 ? (
          <Button
            onClick={handleNext}
            isDisabled={answers[currentQuestion] === -1}
            colorScheme="blue"
          >
            Далее
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            isDisabled={isSubmitted || answers.includes(-1)}
            colorScheme="green"
          >
            Завершить тест
          </Button>
        )}
      </HStack>

      {isSubmitted && (
        <Box p={4} bg={score === test.questions.length ? "green.100" : "blue.100"} borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            Ваш результат: {score} из {test.questions.length} ({Math.round(score/test.questions.length * 100)}%)
          </Text>
        </Box>
      )}
    </VStack>
  )
}

export default Test 