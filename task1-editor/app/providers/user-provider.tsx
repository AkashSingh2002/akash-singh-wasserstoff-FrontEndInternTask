'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type UserContextType = {
  username: string | null
  setUsername: (name: string) => void
  color: string
  setColor: (color: string) => void
  clearUser: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsernameState] = useState<string | null>(null)
  const [color, setColorState] = useState<string>('#3B82F6') // Default blue

  // Load user data from localStorage on mount
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    const savedUsername = localStorage.getItem('editor-username')
    const savedColor = localStorage.getItem('editor-color')
    
    if (savedUsername) {
      setUsernameState(savedUsername)
    }
    
    if (savedColor) {
      setColorState(savedColor)
    }
  }, [])

  // Save user data to localStorage when updated
  const setUsername = (name: string) => {
    setUsernameState(name)
    localStorage.setItem('editor-username', name)
  }

  const setColor = (newColor: string) => {
    setColorState(newColor)
    localStorage.setItem('editor-color', newColor)
  }

  const clearUser = () => {
    setUsernameState(null)
    localStorage.removeItem('editor-username')
    localStorage.removeItem('editor-color')
  }

  return (
    <UserContext.Provider value={{ 
      username, 
      setUsername, 
      color, 
      setColor,
      clearUser 
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}