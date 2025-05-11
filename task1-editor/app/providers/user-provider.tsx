'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

type UserContextType = {
  username: string
  setUsername: (name: string) => void
  color: string
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState('')
  const color = `hsl(${Math.random() * 360}, 70%, 60%)`

  return (
    <UserContext.Provider value={{ username, setUsername, color }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context
}