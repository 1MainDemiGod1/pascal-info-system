import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from 'firebase/firestore'

interface Progress {
  completedArticles: number[]
  quizResults: {
    [articleId: number]: {
      score: number
      total: number
      completedAt: string
    }
  }
}

interface ProgressContextType {
  progress: Progress
  markArticleComplete: (articleId: number) => Promise<void>
  saveQuizResult: (articleId: number, score: number, total: number) => Promise<void>
}

const ProgressContext = createContext<ProgressContextType>({} as ProgressContextType)

export function useProgress() {
  return useContext(ProgressContext)
}

const defaultProgress: Progress = {
  completedArticles: [],
  quizResults: {}
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(defaultProgress)
  const { currentUser } = useAuth()
  const db = getFirestore()

  useEffect(() => {
    if (!currentUser) {
      setProgress(defaultProgress)
      return
    }

    const loadProgress = async () => {
      const docRef = doc(db, 'progress', currentUser.uid)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        setProgress(docSnap.data() as Progress)
      } else {
        await setDoc(docRef, defaultProgress)
      }
    }

    loadProgress()
  }, [currentUser, db])

  const markArticleComplete = async (articleId: number) => {
    if (!currentUser) return

    const newProgress = {
      ...progress,
      completedArticles: [...new Set([...progress.completedArticles, articleId])]
    }

    await updateDoc(doc(db, 'progress', currentUser.uid), newProgress)
    setProgress(newProgress)
  }

  const saveQuizResult = async (articleId: number, score: number, total: number) => {
    if (!currentUser) return

    const newProgress = {
      ...progress,
      quizResults: {
        ...progress.quizResults,
        [articleId]: {
          score,
          total,
          completedAt: new Date().toISOString()
        }
      }
    }

    await updateDoc(doc(db, 'progress', currentUser.uid), newProgress)
    setProgress(newProgress)
  }

  const value = {
    progress,
    markArticleComplete,
    saveQuizResult
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
} 