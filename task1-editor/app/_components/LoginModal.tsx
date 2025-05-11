'use client'

import { useUser } from "../providers"
import { useState, FormEvent, useRef, useEffect } from 'react'

type ColorOption = {
  value: string
  label: string
}

export default function LoginModal() {
  const { username, setUsername, setColor } = useUser()
  const [input, setInput] = useState('')
  const [selectedColor, setSelectedColor] = useState('#3B82F6')
  const inputRef = useRef<HTMLInputElement>(null)
  
  const colorOptions: ColorOption[] = [
    { value: '#3B82F6', label: 'Blue' },
    { value: '#10B981', label: 'Green' },
    { value: '#F59E0B', label: 'Yellow' },
    { value: '#EF4444', label: 'Red' },
    { value: '#8B5CF6', label: 'Purple' },
    { value: '#EC4899', label: 'Pink' },
    { value: '#6B7280', label: 'Gray' }
  ]

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

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
      <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Join Collaboration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
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
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              maxLength={30}
              required
              aria-required="true"
              aria-label="Enter your username"
            />
          </div>
          
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                Choose Your Color
              </legend>
              <div className="flex gap-3 flex-wrap">
                {colorOptions.map(({ value, label }) => (
                  <div key={value} className="flex flex-col items-center">
                    <button
                      type="button"
                      className={`w-8 h-8 rounded-full transition-transform ${selectedColor === value ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'hover:scale-105'}`}
                      style={{ backgroundColor: value }}
                      onClick={() => setSelectedColor(value)}
                      aria-label={`Select color ${label}`}
                      aria-pressed={selectedColor === value}
                    />
                    <span className="sr-only">{label}</span>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input.trim()}
          >
            Join Editor
          </button>
        </form>
      </div>
    </div>
  )
}