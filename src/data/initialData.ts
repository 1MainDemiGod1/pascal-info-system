import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const topics = [
  {
    id: 'topic1',
    title: 'Введение в Pascal',
    description: 'Основные понятия и структура программы на Pascal',
    order: 1,
    subTopics: [
      {
        id: 'subtopic1',
        title: 'История языка Pascal',
        content: 'Pascal был разработан в 1970 году Никлаусом Виртом...',
        order: 1
      },
      {
        id: 'subtopic2',
        title: 'Структура программы',
        content: 'Каждая программа на Pascal состоит из следующих частей...',
        order: 2
      }
    ]
  },
  {
    id: 'topic2',
    title: 'Типы данных',
    description: 'Изучение различных типов данных в Pascal',
    order: 2,
    subTopics: [
      {
        id: 'subtopic3',
        title: 'Простые типы данных',
        content: 'В Pascal существуют следующие простые типы данных...',
        order: 1
      },
      {
        id: 'subtopic4',
        title: 'Структурированные типы данных',
        content: 'К структурированным типам данных относятся...',
        order: 2
      }
    ]
  },
  {
    id: 'topic3',
    title: 'Операторы и выражения',
    description: 'Изучение операторов и выражений в Pascal',
    order: 3,
    subTopics: [
      {
        id: 'subtopic5',
        title: 'Арифметические операторы',
        content: 'В Pascal доступны следующие арифметические операторы...',
        order: 1
      },
      {
        id: 'subtopic6',
        title: 'Логические операторы',
        content: 'Логические операторы используются для...',
        order: 2
      }
    ]
  }
]

export const initializeData = async () => {
  try {
    // Добавляем темы
    for (const topic of topics) {
      await setDoc(doc(db, 'topics', topic.id), {
        title: topic.title,
        description: topic.description,
        order: topic.order
      })

      // Добавляем подтемы
      for (const subTopic of topic.subTopics) {
        await setDoc(doc(db, 'subTopics', subTopic.id), {
          ...subTopic,
          topicId: topic.id
        })
      }
    }
    console.log('Initial data added successfully')
  } catch (error) {
    console.error('Error adding initial data:', error)
  }
} 