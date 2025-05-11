'use client'

import { useUser } from "../providers"
import { useState, FormEvent, useRef, useEffect } from 'react'

export default function LoginModal() {
  const { username, setUsername, color, setColor } = useUser()
  const [input, setInput] = useState('')
  const [selectedColor, setSelectedColor] = useState(color || '#3B82F6') // Default to blue
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Common colors for user selection
  const colorOptions = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#6B7280', // Gray
  ]

  useEffect(() => {
    // Focus the input field when component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // If user is already logged in, don't show the modal
  if (username) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    const trimmedInput = input.trim()
    if (!trimmedInput) return
    
    setUsername(trimmedInput)
    setColor(selectedColor)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h2 className="text-xl font-bold text-black mb-4">Join Collaboration</h2>
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            id="username"
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your name"
            className="w-full text-black p-2 border rounded mb-4"
            maxLength={30}
            required
          />
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Your Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full ${selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={!input.trim()}
          >
            Join Editor
          </button>
        </form>
      </div>
    </div>
  )
}