import React, { createContext, useContext, useState } from 'react'

interface LoadingContextType {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  loadingMessage: string
  setLoadingMessage: (message: string) => void
}

const LoadingContext = createContext<LoadingContextType>({} as LoadingContextType)

export function useLoading() {
  return useContext(LoadingContext)
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')

  const setLoading = (loading: boolean) => {
    setIsLoading(loading)
    if (!loading) {
      setLoadingMessage('')
    }
  }

  const value = {
    isLoading,
    setLoading,
    loadingMessage,
    setLoadingMessage
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  )
} 