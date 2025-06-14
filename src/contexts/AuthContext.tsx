import { createContext, useContext, useEffect, useState } from 'react'
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
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
  loginWithGoogle: () => Promise<void>
  register: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    
    if (!userDoc.exists()) {
      // При первом входе через Google создаем запись пользователя
      await setDoc(doc(db, 'users', result.user.uid), {
        id: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        role: 'student' as UserRole,
        createdAt: new Date()
      })
    }
  }

  async function login(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    if (userDoc.exists()) {
      setCurrentUser(userDoc.data() as User)
    }
  }

  async function register(email: string, password: string, displayName: string, role: UserRole) {
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
  }

  async function logout() {
    await signOut(auth)
    setCurrentUser(null)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
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
    loginWithGoogle,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}