'use client'

import { useYjs } from "../lib/yjs-provider"
import { useEffect, useState } from 'react'

export default function UserList() {
  const { provider } = useYjs('shared-room')
  const [users, setUsers] = useState<Array<{ name: string; color: string }>>([])

  useEffect(() => {
    if (!provider) return

    const handleAwarenessChange = () => {
      const states = Array.from(provider.awareness.getStates().values())
      setUsers(states.map(state => state.user))
    }

    provider.awareness.on('change', handleAwarenessChange)
    return () => provider.awareness.off('change', handleAwarenessChange)
  }, [provider])

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Active Users</h3>
      <ul className="space-y-1">
        {users.map((user, i) => (
          <li key={i} className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: user.color }}
            />
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}