'use client'

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import { useYjs } from '../lib/yjs-provider'
import { useUser } from '../providers'
import { useEffect, useState } from 'react'

export default function Editor({ roomId }: { roomId: string }) {
  const { username, color } = useUser()
  const { yDoc, provider, isConnected, error } = useYjs(roomId)
  const [isSaving, setIsSaving] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting')

  // Track connection status
  useEffect(() => {
    if (error) {
      setConnectionStatus('disconnected')
    } else if (isConnected) {
      setConnectionStatus('connected')
    } else {
      setConnectionStatus('connecting')
    }
  }, [isConnected, error])

  // Initialize editor only when yDoc and provider are available
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // Disable built-in history as we're using Yjs
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({
        placeholder: 'Start typing to collaborate…',
      }),
      // Use appropriate Tiptap collaboration extensions
      Collaboration.configure({
        document: yDoc,
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: username || 'Anonymous',
          color: color || '#000000',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none',
      },
    },
  }, [yDoc, provider, username, color])

  // Simulate periodic saving
  useEffect(() => {
    if (!editor || !isConnected) return
    
    const interval = setInterval(() => {
      setIsSaving(true)
      // Simulate saving to server
      setTimeout(() => {
        setIsSaving(false)
      }, 1000)
    }, 10000) // Every 10 seconds
    
    return () => clearInterval(interval)
  }, [editor, isConnected])

  // Connection status indicator
  const StatusIndicator = () => {
    let bgColor = 'bg-gray-300'
    let text = 'Connecting...'
    
    if (connectionStatus === 'connected') {
      bgColor = 'bg-green-500'
      text = 'Connected'
    } else if (connectionStatus === 'disconnected') {
      bgColor = 'bg-red-500'
      text = 'Disconnected'
    }
    
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className={`w-2 h-2 rounded-full ${bgColor}`}></span>
        <span>{text}</span>
        {isSaving && <span className="ml-2 text-gray-500">(Saving...)</span>}
      </div>
    )
  }

  // Toolbar buttons
  const ToolbarButton = ({ 
    icon, 
    action, 
    isActive = false 
  }: { 
    icon: React.ReactNode, 
    action: () => void, 
    isActive?: boolean 
  }) => (
    <button
      onClick={action}
      className={`p-2 rounded ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
    >
      {icon}
    </button>
  )

  if (error) {
    return (
      <div className="border rounded-lg p-4 bg-red-50 text-red-600">
        {error} - Try refreshing the page
      </div>
    )
  }

  if (!editor) {
    return (
      <div className="border rounded-lg p-4 min-h-[500px] bg-gray-50 animate-pulse">
        Loading editor...
      </div>
    )
  }

  return (
    <div className="editor-container bg-white border rounded-lg shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="border-b p-2 flex items-center justify-between bg-gray-50">
        <div className="flex gap-1">
          <ToolbarButton 
            icon={<span className="font-bold">H1</span>} 
            action={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
          />
          <ToolbarButton 
            icon={<span className="font-bold">H2</span>} 
            action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
          />
          <span className="mx-1 text-gray-300">|</span>
          <ToolbarButton 
            icon={<span className="font-bold">B</span>} 
            action={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
          />
          <ToolbarButton 
            icon={<span className="italic">I</span>} 
            action={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
          />
          <ToolbarButton 
            icon={<span className="line-through">S</span>} 
            action={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
          />
          <span className="mx-1 text-gray-300">|</span>
          <ToolbarButton 
            icon={<span>• List</span>} 
            action={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
          />
          <ToolbarButton 
            icon={<span>1. List</span>} 
            action={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
          />
        </div>
        
        <StatusIndicator />
      </div>
      
      {/* Editor content */}
      <div className="p-4 min-h-[500px]">
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="flex bg-white shadow rounded border overflow-hidden">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
              >
                B
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
              >
                I
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
              >
                S
              </button>
            </div>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}