import React, { createContext, useContext, useState, useEffect } from 'react'
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { Test, TestResult } from '../types/index'
import { useAuth } from './AuthContext'

interface TestContextType {
  tests: Test[]
  testResults: TestResult[]
  loading: boolean
  error: string
  getTests: () => Promise<void>
  getTestResults: () => Promise<void>
  submitTestResult: (testId: string, answers: { questionId: string; selectedOption: number }[]) => Promise<void>
  calculateScore: (test: Test, answers: { questionId: string; selectedOption: number }[]) => number
}

const TestContext = createContext<TestContextType>({} as TestContextType)

export function useTest() {
  return useContext(TestContext)
}

export function TestProvider({ children }: { children: React.ReactNode }) {
  const [tests, setTests] = useState<Test[]>([])
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { currentUser } = useAuth()

  const getTests = async () => {
    try {
      setError('')
      setLoading(true)
      const testsQuery = query(collection(db, 'tests'))
      const querySnapshot = await getDocs(testsQuery)
      const testsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Test[]
      setTests(testsData)
    } catch (err) {
      if (err instanceof Error) {
        setError('Ошибка загрузки тестов: ' + err.message)
      } else {
        setError('Ошибка загрузки тестов')
      }
    } finally {
      setLoading(false)
    }
  }

  const getTestResults = async () => {
    if (!currentUser) return

    try {
      setError('')
      setLoading(true)
      const resultsQuery = query(
        collection(db, 'testResults'),
        where('userId', '==', currentUser.id)
      )
      const querySnapshot = await getDocs(resultsQuery)
      const resultsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TestResult[]
      setTestResults(resultsData)
    } catch (err) {
      if (err instanceof Error) {
        setError('Ошибка загрузки результатов: ' + err.message)
      } else {
        setError('Ошибка загрузки результатов')
      }
    } finally {
      setLoading(false)
    }
  }

  const calculateScore = (
    test: Test,
    answers: { questionId: string; selectedOption: number }[]
  ): number => {
    let correctAnswers = 0
    test.questions.forEach(question => {
      const answer = answers.find(a => a.questionId === question.id)
      if (answer && answer.selectedOption === question.correctAnswer) {
        correctAnswers++
      }
    })
    return (correctAnswers / test.questions.length) * 100
  }

  const submitTestResult = async (
    testId: string,
    answers: { questionId: string; selectedOption: number }[]
  ) => {
    if (!currentUser) return

    try {
      setError('')
      const test = tests.find(t => t.id === testId)
      if (!test) throw new Error('Тест не найден')

      const score = calculateScore(test, answers)
      const result: Omit<TestResult, 'id'> = {
        userId: currentUser.id,
        testId,
        score,
        totalQuestions: test.questions.length,
        correctAnswers: answers.filter(answer => 
          test.questions.find(q => q.id === answer.questionId)?.correctAnswer === answer.selectedOption
        ).length,
        timeSpent: 600, // 10 минут в секундах
        answers: answers.map(answer => ({
          questionId: answer.questionId,
          answer: [answer.selectedOption.toString()],
          selectedAnswer: answer.selectedOption,
          isCorrect:
            test.questions.find(q => q.id === answer.questionId)?.correctAnswer ===
            answer.selectedOption
        })),
        startedAt: Date.now() - 1000 * 60 * 10, // Примерно 10 минут назад
        completedAt: Date.now()
      }

      const docRef = await addDoc(collection(db, 'testResults'), result)
      setTestResults(prev => [...prev, { id: docRef.id, ...result }])

      // Обновляем прогресс теста
      const testRef = doc(db, 'tests', testId)
      await updateDoc(testRef, {
        progress: 100,
        completed: true
      })

      // Обновляем профиль пользователя
      const userRef = doc(db, 'users', currentUser.id)
      const userDoc = await getDocs(query(collection(db, 'testResults'), where('userId', '==', currentUser.id)))
      const totalScore = userDoc.docs.reduce((acc, doc) => acc + doc.data().score, 0)
      const averageScore = totalScore / userDoc.docs.length

      await updateDoc(userRef, {
        completedTests: [...(currentUser.completedTests || []), testId],
        averageScore,
        completedTestsCount: userDoc.docs.length
      })
    } catch (err) {
      if (err instanceof Error) {
        setError('Ошибка сохранения результата: ' + err.message)
      } else {
        setError('Ошибка сохранения результата')
      }
      throw err
    }
  }

  useEffect(() => {
    getTests()
    if (currentUser) {
      getTestResults()
    }
  }, [currentUser])

  const value = {
    tests,
    testResults,
    loading,
    error,
    getTests,
    getTestResults,
    submitTestResult,
    calculateScore
  }

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>
} 