'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Collaboration } from '@tiptap/extension-collaboration'
import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor'
import { useYjs } from '../lib/yjs-provider'
import { useUser } from '../providers'
import { useEffect, useState } from 'react'

export default function Editor({ roomId }: { roomId: string }) {
  const { username, color } = useUser()
  const { yDoc, yText, provider, isConnected } = useYjs(roomId)
  const [error, setError] = useState<string | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Collaboration.configure({
        document: yDoc,
      }),
      // Only add collaboration cursor when provider is available
      ...(provider ? [
        CollaborationCursor.configure({
          provider,
          user: {
            name: username || 'Anonymous',
            color: color || '#3b82f6',
          },
        })
      ] : [])
    ],
    content: '<p>Start collaborating!</p>',
  }, [yDoc, provider, username, color])

  useEffect(() => {
    if (!provider) {
      setError('Initializing collaboration server...')
    } else if (!isConnected) {
      setError('Connecting to collaboration server...')
    } else if (!username) {
      setError('User authentication required')
    } else {
      setError(null)
    }
  }, [isConnected, provider, username])

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy()
      }
    }
  }, [editor])

  if (error) {
    return (
      <div className="border rounded-lg p-4 bg-yellow-50 text-yellow-800">
        {error}
        {!isConnected && (
          <div className="mt-2 h-1 w-full bg-gray-200">
            <div className="h-1 bg-blue-500 animate-pulse" />
          </div>
        )}
      </div>
    )
  }

  if (!editor || !provider) {
    return (
      <div className="border rounded-lg p-4 min-h-[300px] bg-gray-50 animate-pulse" />
    )
  }

  return (
    <div className="editor-container border rounded-lg p-4 min-h-[300px] bg-white">
      <EditorContent editor={editor} />
    </div>
  )
}