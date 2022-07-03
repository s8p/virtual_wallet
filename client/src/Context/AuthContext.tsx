import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import api from '../Services/api'

interface AuthProviderProps {
  children: ReactNode
}
interface User {
  username: string
  name?: string
  balance: number
}
interface AuthState {
  accessToken: string
  user: User
}
interface SignInCredentials {
  name?: string
  username: string
  password: string
}
interface AuthContextData {
  user: User
  accessToken: string
  signUp: (userInfo: SignInCredentials) => Promise<void>
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  getUserInfo: () => Promise<User>
  getTransactions: () => Promise<any>
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem('@Wallet:Token')
    const user = localStorage.getItem('@Wallet:User')
    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) }
    }
    return {} as AuthState
  })
  const signUp = useCallback(
    async ({ name, username, password }: SignInCredentials) => {
      const response = await api.post('/register', {
        name,
        username,
        password,
      })
      const { token, user } = response.data
      localStorage.setItem('@Wallet:Token', token)
      localStorage.setItem('@Wallet:User', JSON.stringify(user))
      setData({ accessToken: token, user })
    },
    []
  )
  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      const response = await api.post('/login', { username, password })
      const { token } = response.data
      localStorage.setItem('@Wallet:Token', token)
      const user = await getUserInfo()
      localStorage.setItem('@Wallet:User', JSON.stringify(user))
      setData({ accessToken: token, user })
    },
    []
  )
  const signOut = useCallback(() => {
    localStorage.removeItem('@Wallet:Token')
    setData({} as AuthState)
  }, [])
  const getUserInfo = useCallback(async () => {
    const token = localStorage.getItem('@Wallet:Token')
    if (!token) throw new Error('f')
    const response = await api.get('user', {
      headers: { Authorization: `Bearer ${token}` },
    })
    const user: User = response.data
    return user
  }, [])
  const getTransactions = useCallback(async () => {
    const token = localStorage.getItem('@Wallet:Token')
    if (!token) throw new Error('f')
    const response = await api.get('/history', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  }, [])
  return (
    <AuthContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        signUp,
        signIn,
        signOut,
        getUserInfo,
        getTransactions,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export { AuthProvider, useAuth }
