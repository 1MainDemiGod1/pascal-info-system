export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: Date;
}

export interface TestResult {
  id: string;
  userId: string;
  testId: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  answers: number[];
}

export interface Test {
  id: string;
  title: string;
  description: string;
  type: 'self-check' | 'knowledge-check';
  questions: Question[];
  subTopicId: string;
  createdAt: Date;
  createdBy: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface SubTopic {
  id: string;
  title: string;
  content: string;
  topicId: string;
  order: number;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  order: number;
  subTopics: SubTopic[];
} 