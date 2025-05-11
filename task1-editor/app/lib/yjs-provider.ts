import { useEffect, useState, useRef } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { useUser } from '../providers'

interface YjsState {
  yDoc: Y.Doc | null
  yText: Y.Text | null
  provider: WebsocketProvider | null
  isConnected: boolean
  error: string | null
}

const providersCache = new Map<string, {
  doc: Y.Doc,
  provider: WebsocketProvider,
  text: Y.Text,
  connectionCount: number
}>()

export function useYjs(roomId: string): YjsState {
  const { username, color } = useUser()
  const [state, setState] = useState<YjsState>({
    yDoc: null,
    yText: null,
    provider: null,
    isConnected: false,
    error: null
  })
  
  const cleanup = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!roomId) {
      setState(prev => ({ ...prev, error: 'No room ID provided' }))
      return
    }

    const fullRoomName = `collaborative-editor-${roomId}`
    let cacheEntry = providersCache.get(fullRoomName)
    let doc: Y.Doc
    let provider: WebsocketProvider
    let text: Y.Text
    
    if (!cacheEntry) {
      doc = new Y.Doc()
      text = doc.getText('editor')
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://demos.yjs.dev'
      
      provider = new WebsocketProvider(wsUrl, fullRoomName, doc)
      
      // Set initial awareness state
      if (username) {
        provider.awareness.setLocalStateField('user', {
          name: username,
          color: color
        })
      }

      cacheEntry = {
        doc,
        provider,
        text,
        connectionCount: 1
      }
      providersCache.set(fullRoomName, cacheEntry)
    } else {
      doc = cacheEntry.doc
      provider = cacheEntry.provider
      text = cacheEntry.text
      cacheEntry.connectionCount++
      providersCache.set(fullRoomName, cacheEntry)
    }

    const handleStatusChange = (event: { status: 'connected' | 'disconnected' }) => {
      setState(prev => ({
        ...prev,
        isConnected: event.status === 'connected',
        error: event.status === 'disconnected' ? 'WebSocket disconnected' : null
      }))
    }
    
    provider.on('status', handleStatusChange)
    
    setState({
      yDoc: doc,
      yText: text,
      provider,
      isConnected: provider.wsconnected,
      error: null
    })

    cleanup.current = () => {
      provider.off('status', handleStatusChange)
      
      const entry = providersCache.get(fullRoomName)
      if (entry) {
        entry.connectionCount--
        
        if (entry.connectionCount <= 0) {
          provider.disconnect()
          doc.destroy()
          providersCache.delete(fullRoomName)
        } else {
          providersCache.set(fullRoomName, entry)
        }
      }
    }

    return () => {
      cleanup.current?.()
    }
  }, [roomId, username, color])

  return state
}