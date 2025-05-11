'use client'

import Editor from '@//_components/Editor'
import UserList from '@//_components/UserList'
import { useParams } from 'next/navigation'

export default function EditorPage() {
  const { roomId } = useParams()
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">Collaborative Editor</h1>
        <UserList />
      </div>
      <Editor roomId={Array.isArray(roomId) ? roomId[0] : roomId} />
    </div>
  )
}