import axiosInstance from '@/lib/axios'

export interface LoginResponse {
  access_token: string
  id: string
  email: string
  firstName?: string
  lastName?: string
  avatar?: string
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const apiUrl = import.meta.env.VITE_API_URL
    const response = await fetch(`${apiUrl}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    return response.json()
  },

  async logout(): Promise<void> {
    try {
      await axiosInstance.post('users/logout')
    } catch {
      // Logout may fail if token is invalid, but we still want to clear locally
    }
  },
}
