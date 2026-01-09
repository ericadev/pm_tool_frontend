import { createContext, ReactNode, useState, useEffect } from 'react'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (from localStorage or API)
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (token) {
          // TODO: Verify token with backend and get current user
          // For now, just mark as done loading
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    // TODO: Implement login with backend API
    // Save token to localStorage
    // Set user state
    console.log('Login called with:', { email, password })
  }

  const register = async (email: string, password: string, name: string) => {
    // TODO: Implement register with backend API
    // Save token to localStorage
    // Set user state
    console.log('Register called with:', { email, password, name })
  }

  const logout = async () => {
    // TODO: Call backend logout endpoint
    localStorage.removeItem('authToken')
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
