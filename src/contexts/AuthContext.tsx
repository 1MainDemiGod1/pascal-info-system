import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { User, UserRole } from '../types'

interface AuthContextType {
  currentUser: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function login(email: string, password: string) {
    try {
      setError(null)
      const result = await signInWithEmailAndPassword(auth, email, password)
      const userDoc = await getDoc(doc(db, 'users', result.user.uid))
      if (userDoc.exists()) {
        setCurrentUser(userDoc.data() as User)
      } else {
        setError('Пользователь не найден')
      }
    } catch (err) {
      setError('Ошибка входа. Проверьте email и пароль')
    }
  }

  async function register(email: string, password: string, displayName: string, role: UserRole) {
    try {
      setError(null)
      // Проверка длины пароля
      if (password.length < 6) {
        throw new Error('Пароль должен содержать минимум 6 символов')
      }

      // Проверка формата email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Неверный формат email')
      }

      // Проверка имени пользователя
      if (displayName.length < 2) {
        throw new Error('Имя пользователя должно содержать минимум 2 символа')
      }

      const result = await createUserWithEmailAndPassword(auth, email, password)
      const user: User = {
        id: result.user.uid,
        email,
        displayName,
        role,
        createdAt: new Date()
      }
      await setDoc(doc(db, 'users', result.user.uid), user)
      setCurrentUser(user)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Ошибка при регистрации')
      }
    }
  }

  async function logout() {
    try {
      setError(null)
      await signOut(auth)
      setCurrentUser(null)
    } catch (err) {
      setError('Ошибка при выходе из системы')
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          setCurrentUser(userDoc.data() as User)
        }
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    error
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}