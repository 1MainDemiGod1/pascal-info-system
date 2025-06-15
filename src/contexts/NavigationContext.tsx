import React, { createContext, useContext, useState } from 'react'

interface NavigationContextType {
  currentPage: string
  setCurrentPage: (page: string) => void
  isMenuOpen: boolean
  toggleMenu: () => void
  closeMenu: () => void
}

const NavigationContext = createContext<NavigationContextType>({} as NavigationContextType)

export function useNavigation() {
  return useContext(NavigationContext)
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const value = {
    currentPage,
    setCurrentPage,
    isMenuOpen,
    toggleMenu,
    closeMenu
  }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
} 