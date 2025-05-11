'use client'

import { useYjs } from "../lib/yjs-provider"
import { useEffect, useState } from 'react'

type User = {
  name: string;
  color: string;
}

export default function UserList({ roomId }: { roomId: string }) {
  const { provider, isConnected } = useYjs(roomId)
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!provider || !isConnected) {
      setIsLoading(true)
      return
    }

    // Get initial users on mount
    const currentStates = Array.from(provider.awareness.getStates().values())
    setUsers(currentStates
      .map(state => state.user)
      .filter(Boolean)
    )
    setIsLoading(false)

    // Update when awareness changes
    const handleAwarenessChange = () => {
      const states = Array.from(provider.awareness.getStates().values())
      const activeUsers = states
        .map(state => state.user)
        .filter(Boolean) // Filter out undefined users
      
      setUsers(activeUsers)
    }

    // Register event handler
    provider.awareness.on('change', handleAwarenessChange)
    
    // Cleanup on unmount
    return () => {
      provider.awareness.off('change', handleAwarenessChange)
    }
  }, [provider, isConnected])

  if (isLoading) {
    return (
      <div className="space-y-2">
        <h3 className="font-medium">Active Users</h3>
        <div className="animate-pulse space-y-2">
          {[1, 2].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Active Users ({users.length})</h3>
      {users.length === 0 ? (
        <p className="text-gray-500 text-sm">No active users</p>
      ) : (
        <ul className="space-y-1">
          {users.map((user, i) => (
            <li key={i} className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: user.color || '#ccc' }}
                aria-hidden="true"
              />
              <span>{user.name || 'Anonymous'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}