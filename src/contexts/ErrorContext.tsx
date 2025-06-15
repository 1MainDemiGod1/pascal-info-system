import React, { createContext, useContext, useState } from 'react'

interface ErrorContextType {
  error: string | null
  setError: (error: string | null) => void
  clearError: () => void
}

const ErrorContext = createContext<ErrorContextType>({} as ErrorContextType)

export function useError() {
  return useContext(ErrorContext)
}

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null)

  const clearError = () => {
    setError(null)
  }

  const value = {
    error,
    setError,
    clearError
  }

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  )
} 