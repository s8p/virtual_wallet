import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
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
  const history = useHistory()
  const signUp = useCallback(
    async ({ name, username, password }: SignInCredentials) => {
      api
        .post('/register', {
          name,
          username,
          password,
        })
        .then((response) => {
          const { token, user } = response.data
          localStorage.setItem('@Wallet:Token', token)
          localStorage.setItem('@Wallet:User', JSON.stringify(user))
          setData({ accessToken: token, user })
        })
        .catch((err) => {
          const errorMessage =
            err.response.status === 409
              ? 'Nome de Usuario já cadastrado'
              : 'Algo deu errado'
          toast.error(errorMessage)
        })
    },
    []
  )
  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      api
        .post('/login', { username, password })
        .then(async (response) => {
          const { token } = response.data
          localStorage.setItem('@Wallet:Token', token)
          const user = await getUserInfo()
          localStorage.setItem('@Wallet:User', JSON.stringify(user))
          setData({ accessToken: token, user })
          history.push('/home')
        })
        .catch((err) => {
          const errorMessage =
            err.response.status === 401
              ? 'Senha ou Nome de Usuario invalidos'
              : 'Algo deu errado'
          toast.error(errorMessage)
        })
    },
    []
  )
  const signOut = useCallback(() => {
    localStorage.removeItem('@Wallet:Token')
    localStorage.removeItem('@Wallet:User')
    history.push('/login')
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
  return (
    <AuthContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        signUp,
        signIn,
        signOut,
        getUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export { AuthProvider, useAuth }
