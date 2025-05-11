'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '../providers'
import LoginModal from '../components/LoginModal'

export default function Home() {
  const { username } = useUser()
  const router = useRouter()
  const [roomId, setRoomId] = useState('')
  const [recentRooms, setRecentRooms] = useState<string[]>([])

  // Load recent rooms from localStorage on mount
  useEffect(() => {
    const savedRooms = localStorage.getItem('recent-rooms')
    if (savedRooms) {
      try {
        const rooms = JSON.parse(savedRooms)
        setRecentRooms(Array.isArray(rooms) ? rooms : [])
      } catch (e) {
        // Handle parse error
        localStorage.removeItem('recent-rooms')
      }
    }
  }, [])

  // Generate a random room ID
  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8)
  }

  // Create a new document with a random ID
  const createNewDocument = () => {
    const newRoomId = generateRoomId()
    router.push(`/editor/${newRoomId}`)
  }

  // Join an existing room
  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (roomId.trim()) {
      router.push(`/editor/${roomId.trim()}`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <LoginModal />
      
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Collaborative Document Editor
        </h1>
        
        <div className="grid gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Create New Document</h2>
            <p className="text-gray-600 mb-4">
              Start a new collaborative document with a randomly generated ID.
            </p>
            <button
              onClick={createNewDocument}
              disabled={!username}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {username ? 'Create New Document' : 'Sign in to create a document'}
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Join Existing Document</h2>
            <form onSubmit={joinRoom}>
              <div className="mb-4">
                <label htmlFor="room-id" className="block text-sm font-medium text-gray-700 mb-1">
                  Document ID
                </label>
                <input
                  id="room-id"
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter document ID"
                  className="w-full p-2 border rounded"
                  disabled={!username}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={!username || !roomId.trim()}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
              >
                {username ? 'Join Document' : 'Sign in to join a document'}
              </button>
            </form>
          </div>
          
          {/* Recent documents section */}
          {recentRooms.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Recent Documents</h2>
              <ul className="space-y-2">
                {recentRooms.map((room) => (
                  <li key={room}>
                    <Link
                      href={`/editor/${room}`}
                      className="block p-3 border rounded hover:bg-gray-50 transition"
                    >
                      Document: {room}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}