export interface Article {
  id: string
  title: string
  content: string
  imageUrl?: string
  tags: string[]
  createdAt: number
  readingTime: number
  codeExample?: string
  exercises?: string[]
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  displayName: string
  photoURL?: string
  role: 'student' | 'teacher' | 'admin'
  createdAt: number
  lastLoginAt: number
  userId: string;
  completedTests: string[]
  averageScore: number
  totalTests: number
  completedTestsCount: number
  completedTopics: string[]
  completedSubTopics: string[]
  completedExercises: string[]
  completedArticles: string[]
  completedVideos: string[]
  completedQuizzes: string[]
} 

export type UserRole = 'student' | 'teacher' | 'admin'

export interface User {
  id: string
  uid?: string
  email: string
  displayName: string
  photoURL?: string
  role: UserRole
  createdAt: number
  lastLoginAt: number
  completedTests?: string[]
  completedTopics?: string[]
  progress?: number
  lessons?: number
  duration?: string
  completed?: boolean
  score?: number | null
}

export interface Test {
  id: string
  title: string
  description: string
  questions: Question[]
  timeLimit: number
  type?: 'selfCheck' | 'final' | 'practice'
  passingScore?: number
  createdAt?: number
  updatedAt?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  duration?: string
  progress?: number
  completed?: boolean
  score?: number | null
  subTopicId?: string
  finalTest?: { id: string }
}

export interface Question {
  id: string
  text: string
  type?: 'single' | 'multiple' | 'text'
  options: string[]
  correctAnswer: number
  correctAnswers?: string[]
  points?: number
}

export interface TestResult {
  id: string
  testId: string
  userId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  answers: {
    questionId: string
    answer: string[]
    selectedAnswer?: number
    isCorrect?: boolean
  }[]
  startedAt: number
  completedAt: number
  timeSpent?: number
}

export interface UserAnswer {
  questionId: string
  selectedOption: number
  isCorrect: boolean
}

export interface Topic {
  id: string
  title: string
  description: string
  order: number
  subTopics: SubTopic[]
  createdAt?: number
  updatedAt?: number
  lessons?: number
  duration?: string
  progress?: number
  completed?: boolean
  finalTest?: { id: string }
}

export interface SubTopic {
  id: string
  title: string
  description?: string
  order: number
  content: string
  topicId?: string
  exercises?: string[]
  createdAt?: number
  updatedAt?: number
  test?: { id: string }
  examples?: string[]
  progress?: number
}

export interface Progress {
  id: string
  userId: string
  topicId: string
  subTopicId: string
  completed: boolean
  score?: number
  lastAccessedAt: number
  createdAt: number
  updatedAt: number
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: number
}

export interface Error {
  id: string
  message: string
  code: string
  details?: any
  createdAt: number
}

export interface Loading {
  id: string
  message: string
  progress?: number
  createdAt: number
}

export interface Navigation {
  id: string
  userId: string
  path: string
  timestamp: number
}

export interface Profile {
  id: string
  userId: string
  bio?: string
  interests?: string[]
  education?: string[]
  experience?: string[]
  skills?: string[]
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  createdAt: number
  updatedAt: number
}
