'use client'

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { useEffect, useState } from 'react'

export function useYjs(roomId: string) {
  const [yDoc] = useState(new Y.Doc())
  const [yText] = useState(yDoc.getText('content'))
  const [provider, setProvider] = useState<WebsocketProvider | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const wsProvider = new WebsocketProvider(
      process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:1234',
      roomId,
      yDoc
    )

    const handleStatus = (event: { status: 'connected' | 'disconnected' }) => {
      setIsConnected(event.status === 'connected')
    }

    wsProvider.on('status', handleStatus)
    setProvider(wsProvider)

    return () => {
      wsProvider.off('status', handleStatus)
      wsProvider.destroy()
      yDoc.destroy()
    }
  }, [roomId, yDoc])

  return { 
    yDoc,
    yText,
    provider: isConnected ? provider : null,
    isConnected
  }
}