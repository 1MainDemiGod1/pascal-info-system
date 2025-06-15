import React, { createContext, useContext, useState, useEffect } from 'react'
import { collection, query, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { Topic } from '../types/index'
import { useAuth } from './AuthContext'

interface TopicContextType {
  topics: Topic[]
  loading: boolean
  error: string
  getTopics: () => Promise<void>
  updateTopicProgress: (topicId: string, progress: number) => Promise<void>
}

const TopicContext = createContext<TopicContextType>({} as TopicContextType)

export function useTopic() {
  return useContext(TopicContext)
}

export function TopicProvider({ children }: { children: React.ReactNode }) {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { currentUser } = useAuth()

  const getTopics = async () => {
    try {
      setError('')
      setLoading(true)
      const topicsQuery = query(collection(db, 'topics'))
      const querySnapshot = await getDocs(topicsQuery)
      const topicsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Topic[]
      setTopics(topicsData)
    } catch (err) {
      if (err instanceof Error) {
        setError('Ошибка загрузки тем: ' + err.message)
      } else {
        setError('Ошибка загрузки тем')
      }
    } finally {
      setLoading(false)
    }
  }

  const updateTopicProgress = async (topicId: string, progress: number) => {
    if (!currentUser) return

    try {
      setError('')
      const topicRef = doc(db, 'topics', topicId)
      const completed = progress === 100

      await updateDoc(topicRef, {
        progress,
        completed
      })

      setTopics(prev =>
        prev.map(topic =>
          topic.id === topicId
            ? { ...topic, progress, completed }
            : topic
        )
      )

      // Обновляем профиль пользователя
      const userRef = doc(db, 'users', currentUser.id)
      await updateDoc(userRef, {
        completedTopics: [...(currentUser.completedTopics || []), topicId]
      })
    } catch (err) {
      if (err instanceof Error) {
        setError('Ошибка обновления прогресса: ' + err.message)
      } else {
        setError('Ошибка обновления прогресса')
      }
      throw err
    }
  }

  useEffect(() => {
    getTopics()
  }, [])

  const value = {
    topics,
    loading,
    error,
    getTopics,
    updateTopicProgress
  }

  return <TopicContext.Provider value={value}>{children}</TopicContext.Provider>
} 