import { useState, useEffect, useCallback, useRef } from 'react'
import type { Conversation, Message, User } from '../types'

/* Theme hook */
export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }, [])

  return { theme, toggleTheme }
}

/* Mobile detection hook */
export const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

/* Hook for managing conversations list */
export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    try {
      // Mock data will be loaded from data/mockData.ts
      setConversations([])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load conversations')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { conversations, isLoading, error, setConversations }
}

/* Hook for managing messages in a conversation */
export const useMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!conversationId) return

    setIsLoading(true)
    try {
      // Mock data will be loaded
      setMessages([])
      setError(null)
      scrollToBottom()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load messages')
    } finally {
      setIsLoading(false)
    }
  }, [conversationId, scrollToBottom])

  return { messages, isLoading, error, setMessages, messagesEndRef, scrollToBottom }
}

/* Hook for text input with character limit */
export const useTextInput = (maxLength = 5000) => {
  const [text, setText] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [isAtLimit, setIsAtLimit] = useState(false)

  const handleChange = useCallback(
    (value: string) => {
      if (value.length <= maxLength) {
        setText(value)
        setCharCount(value.length)
        setIsAtLimit(value.length === maxLength)
      }
    },
    [maxLength]
  )

  const reset = useCallback(() => {
    setText('')
    setCharCount(0)
    setIsAtLimit(false)
  }, [])

  return { text, setText: handleChange, charCount, isAtLimit, maxLength, reset }
}

/* Hook for debounced values */
export const useDebounce = <T,>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

/* Hook for handling visibility state */
export const useVisibility = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState)

  const show = useCallback(() => setIsVisible(true), [])
  const hide = useCallback(() => setIsVisible(false), [])
  const toggle = useCallback(() => setIsVisible((prev) => !prev), [])

  return { isVisible, show, hide, toggle, setIsVisible }
}

/* Hook for managing user preferences */
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState({
    soundEnabled: true,
    notificationsEnabled: true,
    showOnlineStatus: true,
    allowReadReceipts: true,
  })

  useEffect(() => {
    const saved = localStorage.getItem('userPreferences')
    if (saved) {
      try {
        setPreferences(JSON.parse(saved))
      } catch {
        // Use defaults if parsing fails
      }
    }
  }, [])

  const updatePreference = useCallback((key: keyof typeof preferences, value: boolean) => {
    setPreferences((prev) => {
      const updated = { ...prev, [key]: value }
      localStorage.setItem('userPreferences', JSON.stringify(updated))
      return updated
    })
  }, [])

  return { preferences, updatePreference }
}

/* Hook for local storage */
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error('Error setting localStorage:', error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue] as const
}

/* Hook for fetch with loading/error states */
export const useFetch = <T,>(url: string | null) => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(!!url)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, isLoading, error }
}

/* Hook for keyboard shortcuts */
export const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  dependencies: any[] = []
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        callback()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [key, callback, ...dependencies])
}

/* Hook for click outside detection */
export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, callback])
}
