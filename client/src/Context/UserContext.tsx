import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../Services/api'

interface UserProviderProps {
  children: ReactNode
}
interface User {
  username: string
  name?: string
  balance: number
}
interface Transfer {
  userOrigin: User
  userRecipient: User
  transferedValue: number
  id: number
  date: string
}
interface UserProviderData {
  makeDeposit: (
    value: number,
    token: string,
    operation: 'deposit' | 'withdraw'
  ) => void
  makeTransfer: (
    value: number,
    token: string,
    identifier: string,
    recipient: string
  ) => void
  getTransactionHistory: (token: string) => Promise<Transfer[]>
  getUserInfo: (token: string) => Promise<User>
  user: User
}

const UserContext = createContext<UserProviderData>({} as UserProviderData)

const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used whithin an UserProvider')
  }
  return context
}
const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(() => {
    const localUser = localStorage.getItem('@Wallet:User')
    if (localUser) return JSON.parse(localUser)
    return {} as User
  })
  const makeDeposit = (
    value: number,
    token: string,
    operation: 'deposit' | 'withdraw'
  ) => {
    api
      .post(
        `/${operation}`,
        { value },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((_) => {
        const verb = operation === 'deposit' ? 'depositado' : 'sacado'
        toast.success(`Valor ${verb} com sucesso`)
        getUserInfo(token)
      })
  }
  const makeTransfer = (
    value: number,
    token: string,
    identifier: string,
    recipient: string
  ) => {
    const request =
      identifier === 'name'
        ? { value, name: recipient }
        : { value, username: recipient }
    api
      .post(
        '/transfer',
        { ...request },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((_) => {
        toast.success(`Transferência concluída com sucesso!`)
        getUserInfo(token)
      })
  }
  const getTransactionHistory = async (token: string) => {
    const { data } = await api.get('/history', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  }
  const getUserInfo = async (token: string) => {
    const { data } = await api.get('/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
    localStorage.setItem('@Wallet:User', JSON.stringify(data))
    setUser(data)
    return data
  }
  return (
    <UserContext.Provider
      value={{
        makeDeposit,
        makeTransfer,
        getTransactionHistory,
        getUserInfo,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
export { UserProvider, useUser }
