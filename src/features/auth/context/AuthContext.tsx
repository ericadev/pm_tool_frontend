import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { authService } from '../services/auth.service'

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
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

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Restore user session from localStorage
    const restoreSession = () => {
      try {
        const token = localStorage.getItem('authToken')
        const userJson = localStorage.getItem('user')

        if (token && userJson) {
          const user = JSON.parse(userJson)
          setUser(user)
        }
      } catch {
        // Invalid data in localStorage, clear it
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      } finally {
        setIsLoading(false)
      }
    }

    restoreSession()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const data = await authService.login(email, password)
      const token = data.access_token
      const userData: User = {
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.avatar,
      }

      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    // TODO: Implement register with backend API
    // Save token to localStorage
    // Set user state
    console.log('Register called with:', { email, password, name })
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch {
      // Logout may fail, but we still clear locally
    }
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
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
