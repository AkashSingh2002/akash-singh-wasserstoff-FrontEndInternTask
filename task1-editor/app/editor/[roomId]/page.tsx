'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Editor from '../../../components/Editor'
import UserList from '../../../components/UserList'
import LoginModal from '../../../components/LoginModal'
import { useUser } from '../../../providers'

export default function EditorPage({ params }: { params: { roomId: string } }) {
  const { roomId } = params
  const { username } = useUser()
  const router = useRouter()

  // Save room to recent rooms
  useEffect(() => {
    if (!roomId) return
    
    try {
      // Get existing recent rooms
      const savedRooms = localStorage.getItem('recent-rooms')
      let recentRooms: string[] = []
      
      if (savedRooms) {
        recentRooms = JSON.parse(savedRooms)
        if (!Array.isArray(recentRooms)) {
          recentRooms = []
        }
      }
      
      // Add current room to beginning, remove duplicates
      recentRooms = [roomId, ...recentRooms.filter(r => r !== roomId)]
      
      // Keep only the 5 most recent rooms
      recentRooms = recentRooms.slice(0, 5)
      
      // Save back to localStorage
      localStorage.setItem('recent-rooms', JSON.stringify(recentRooms))
    } catch (e) {
      console.error('Error saving recent rooms:', e)
    }
  }, [roomId])

  return (
    <div className="min-h-screen bg-gray-50">
      <LoginModal />
      
      {/* Header with navigation */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="ml-2">Home</span>
          </Link>
          
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">
              Document ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{roomId}</span>
            </span>
            
            {username && (
              <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-700 text-sm flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                {username}
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Side panel */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-8">
            <UserList roomId={roomId} />
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Share This Document</h3>
              <p className="text-sm text-gray-600 mb-2">
                Share this ID with others to collaborate:
              </p>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={roomId}
                  className="block w-full bg-gray-50 border rounded-l py-2 px-3 text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(roomId);
                    alert('Copied to clipboard!');
                  }}
                  className="bg-blue-100 text-blue-600 px-3 rounded-r border-y border-r hover:bg-blue-200"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Editor */}
        <div className="md:col-span-3">
          <Editor roomId={roomId} />
        </div>
      </main>
    </div>
  )
}