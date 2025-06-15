import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc, writeBatch } from 'firebase/firestore'
import { allTopics, allTests } from '../data/content'
import { allArticles } from '../data/articles'

// Firebase конфигурация
const firebaseConfig = {
  apiKey: "AIzaSyBWf42yIQLkqZzKK57OK0AIaAd4kLkU5Rk",
  authDomain: "pascal-learning.firebaseapp.com",
  projectId: "pascal-learning",
  storageBucket: "pascal-learning.firebasestorage.app",
  messagingSenderId: "62511163956",
  appId: "1:62511163956:web:d734a22bb9ff3f0aa93861"
}

// Инициализация Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function uploadTopics() {
  console.log('Загрузка тем...')
  const batch = writeBatch(db)
  
  for (const topic of allTopics) {
    const topicRef = doc(collection(db, 'topics'), topic.id)
    batch.set(topicRef, {
      ...topic,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      lessons: topic.subTopics.length,
      duration: `${topic.subTopics.length * 15} мин`,
      progress: 0,
      completed: false
    })
    
    // Загружаем подтемы
    for (const subTopic of topic.subTopics) {
      const subTopicRef = doc(collection(db, 'subtopics'), subTopic.id)
      batch.set(subTopicRef, {
        ...subTopic,
        topicId: topic.id,
        createdAt: Date.now(),
        updatedAt: Date.now()
      })
    }
  }
  
  await batch.commit()
  console.log('Темы загружены успешно!')
}

async function uploadTests() {
  console.log('Загрузка тестов...')
  const batch = writeBatch(db)
  
  for (const test of allTests) {
    const testRef = doc(collection(db, 'tests'), test.id)
    batch.set(testRef, {
      ...test,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      questions: test.questions.length,
      duration: `${test.timeLimit} мин`,
      difficulty: test.type === 'final' ? 'hard' : test.type === 'practice' ? 'easy' : 'medium',
      progress: 0,
      completed: false,
      score: null,
      passingScore: test.passingScore || 70
    })
  }
  
  await batch.commit()
  console.log('Тесты загружены успешно!')
}

async function uploadArticles() {
  console.log('Загрузка статей...')
  const batch = writeBatch(db)
  
  for (const article of allArticles) {
    const articleRef = doc(collection(db, 'articles'), article.id.toString())
    batch.set(articleRef, {
      ...article,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      readingTime: Math.ceil(article.sections.reduce((total, section) => 
        total + section.content.length / 1000, 0)),
      tags: ['Pascal', 'Программирование', '8 класс'],
      imageUrl: '',
      codeExample: article.sections.find(s => s.content.includes('```'))?.content || '',
      exercises: []
    })
  }
  
  await batch.commit()
  console.log('Статьи загружены успешно!')
}

async function uploadAllData() {
  try {
    console.log('Начинаем загрузку данных в Firestore...')
    
    await uploadTopics()
    await uploadTests()
    await uploadArticles()
    
    console.log('Все данные загружены успешно!')
    process.exit(0)
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
    process.exit(1)
  }
}

// Запуск загрузки
uploadAllData() 