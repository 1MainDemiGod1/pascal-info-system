import { useState } from 'react'
import { Box, Button, Radio, RadioGroup, Stack, Text, VStack, HStack } from '@chakra-ui/react'

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
    <VStack spacing={6} align="stretch">
      <Text fontSize="xl" fontWeight="bold">Проверьте свои знания</Text>
      
      {questions.map((q, qIndex) => (
        <Box 
          key={qIndex} 
          p={6} 
          borderWidth="1px" 
          borderRadius="lg"
          bg="white"
          shadow="sm"
        >
          <Text fontSize="lg" mb={4}>
            {qIndex + 1}. {q.question}
          </Text>
          <RadioGroup 
            value={answers[qIndex].toString()}
            onChange={(value) => handleAnswerChange(qIndex, value)}
          >
            <VStack align="stretch" spacing={3}>
              {q.options.map((option, oIndex) => (
                <Radio 
                  key={oIndex} 
                  value={oIndex.toString()}
                  isDisabled={isSubmitted}
                  colorScheme={
                    isSubmitted 
                      ? oIndex === q.correctAnswer 
                        ? 'green'
                        : answers[qIndex] === oIndex 
                          ? 'red'
                          : 'gray'
                      : 'blue'
                  }
                >
                  <HStack spacing={2}>
                    <Text>
                      {option}
                    </Text>
                    {isSubmitted && (
                      oIndex === q.correctAnswer ? (
                        <Text color="green.500">(Правильный ответ)</Text>
                      ) : answers[qIndex] === oIndex ? (
                        <Text color="red.500">(Ваш ответ)</Text>
                      ) : null
                    )}
                  </HStack>
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        </Box>
      ))}

      {isSubmitted ? (
        <Box p={4} bg={score === questions.length ? "green.100" : "blue.100"} borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            Ваш результат: {score} из {questions.length} ({Math.round(score/questions.length * 100)}%)
          </Text>
        </Box>
      ) : (
        <Button 
          colorScheme="blue" 
          size="lg" 
          onClick={handleSubmit}
          isDisabled={answers.includes(-1)}
        >
          Проверить ответы
        </Button>
      )}
    </VStack>
  )
}

export default Quiz 