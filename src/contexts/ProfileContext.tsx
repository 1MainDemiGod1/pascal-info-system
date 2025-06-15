import React, { createContext, useContext, useState, useEffect } from 'react'
import { UserProfile } from '../types'
import { useAuth } from './AuthContext'

interface ProfileContextType {
  profile: UserProfile | null
  loading: boolean
  error: string
  getProfile: () => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
}

const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType)

export function useProfile() {
  return useContext(ProfileContext)
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { currentUser, setCurrentUser } = useAuth()

  const getProfile = async () => {
    if (!currentUser) return

    setLoading(true)
    setError('')
    try {
      const stored = localStorage.getItem(`profile_${currentUser.id}`)
      if (stored) {
        setProfile(JSON.parse(stored))
      } else {
        const newProfile: UserProfile = {
          id: currentUser.id,
          userId: currentUser.id,
          name: currentUser.displayName || '',
          email: currentUser.email || '',
          displayName: currentUser.displayName || '',
          photoURL: currentUser.photoURL || '',
          role: currentUser.role,
          createdAt: Date.now(),
          lastLoginAt: Date.now(),
          completedTests: [],
          averageScore: 0,
          totalTests: 0,
          completedTestsCount: 0,
          completedTopics: [],
          completedSubTopics: [],
          completedExercises: [],
          completedArticles: [],
          completedVideos: [],
          completedQuizzes: []
        }
        localStorage.setItem(`profile_${currentUser.id}`, JSON.stringify(newProfile))
        setProfile(newProfile)
      }
    } catch (err: any) {
      setError('Ошибка загрузки профиля: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser || !profile) return

    try {
      setError('')
      const updatedProfile = {
        ...profile,
        ...data,
        email: data.email || profile.email,
        displayName: data.displayName || profile.displayName
      }
      localStorage.setItem(`profile_${currentUser.id}`, JSON.stringify(updatedProfile))
      setProfile(updatedProfile)
      setCurrentUser && setCurrentUser(prev => prev ? { ...prev, displayName: updatedProfile.displayName, photoURL: updatedProfile.photoURL } : prev)
    } catch (err: any) {
      setError('Ошибка обновления профиля: ' + err.message)
      throw err
    }
  }

  useEffect(() => {
    if (currentUser) {
      getProfile()
    } else {
      setProfile(null)
    }
  }, [currentUser])

  const value = {
    profile,
    loading,
    error,
    getProfile,
    updateProfile
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
} 