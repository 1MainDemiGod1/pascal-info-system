import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { User, UserRole } from '../types/index'

interface AuthContextType {
  currentUser: User | null
  userRole: UserRole | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (data: Partial<User>) => Promise<void>
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const userData = userDoc.data()
        
        if (!userData) {
          console.warn(`No user document found in Firestore for UID ${user.uid}. Defaulting to 'student' role. This may be due to Firestore rules or a missing document.`);
        }
        
        const role = userData?.role || 'student';
        setCurrentUser({
          id: user.uid,
          email: user.email!,
          displayName: user.displayName || '',
          role: role,
          photoURL: user.photoURL || undefined,
          createdAt: user.metadata.creationTime ? new Date(user.metadata.creationTime).getTime() : Date.now(),
          lastLoginAt: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).getTime() : Date.now()
        })
        setUserRole(role);
      } else {
        setCurrentUser(null)
        setUserRole(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const handleError = (error: any) => {
    let errorMessage = 'Произошла ошибка'
    
    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Неверный email или пароль'
          break
        case 'auth/email-already-in-use':
          errorMessage = 'Этот email уже используется'
          break
        case 'auth/weak-password':
          errorMessage = 'Пароль слишком слабый'
          break
        case 'auth/invalid-email':
          errorMessage = 'Неверный формат email'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Слишком много попыток. Попробуйте позже'
          break
        default:
          errorMessage = error.message
      }
    }
    
    setError(errorMessage)
    setTimeout(() => setError(null), 5000)
    throw error
  }

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      handleError(error)
    }
  }

  const register = async (email: string, password: string, displayName: string, role: UserRole) => {
    try {
      setError(null)
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      
      await updateProfile(user, { displayName })
      
      await setDoc(doc(db, 'users', user.uid), {
        email,
        displayName,
        role,
        createdAt: Date.now(),
        lastLoginAt: Date.now()
      })
    } catch (error) {
      handleError(error)
    }
  }

  const logout = async () => {
    try {
      setError(null)
      await signOut(auth)
    } catch (error) {
      handleError(error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setError(null)
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      handleError(error)
    }
  }

  const updateUserProfile = async (data: Partial<User>) => {
    try {
      setError(null)
      if (!currentUser) throw new Error('Пользователь не авторизован')
      
      if (data.displayName || data.photoURL) {
        await updateProfile(auth.currentUser as FirebaseUser, {
          displayName: data.displayName,
          photoURL: data.photoURL
        })
      }
      
      await setDoc(doc(db, 'users', currentUser.id), {
        ...data,
        updatedAt: Date.now()
      }, { merge: true })
      
      setCurrentUser(prev => prev ? { ...prev, ...data } : null)
    } catch (error) {
      handleError(error)
    }
  }

  const value = {
    currentUser,
    userRole,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile,
    setCurrentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export type { UserRole }