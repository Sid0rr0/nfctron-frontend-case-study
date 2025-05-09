import { createContext, useContext, useState } from 'react'

interface User {
  firstName: string
  lastName: string
  email: string
}

interface AuthState {
  isLoggedIn: boolean
  user: User | null
}

interface AuthContextType {
  authState: AuthState
  login: (user: User) => void
  logout: () => void
}

// initialize auth state from localStorage
function initializeAuthFromStorage(): AuthState {
  const userString = localStorage.getItem('user')

  if (userString) {
    try {
      const user = JSON.parse(userString) as User
      return {
        isLoggedIn: true,
        user,
      }
    }
    catch (error) {
      console.error('Failed to parse user data from localStorage:', error)
      localStorage.removeItem('user')
    }
  }

  return {
    isLoggedIn: false,
    user: null,
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// context provider for user auth
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    return initializeAuthFromStorage()
  })

  const login = (user: User) => {
    setAuthState({
      isLoggedIn: true,
      user,
    })

    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      user: null,
    })

    localStorage.removeItem('user')
  }

  const value = { authState, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
export type { AuthState, User }
