import { createContext, ReactNode, useContext, useState } from 'react'
import api from '../Services/api'

interface UserProviderProps {
  children: ReactNode
}
interface User {
  username: string
  name?: string
  balance: number
}
interface Deposit {
  userOrigin: User
  transferedValue: number
  id: number
  date: Date
}
interface Transfer {
  userOrigin: User
  userRecipient: User
  transferedValue: number
  id: number
  date: string
}
interface UserProviderData {
  makeDeposit: (value: number, token: string) => Promise<Deposit>
  getTransactionHistory: (token: string) => Promise<Transfer[]>
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
  const [data, setData] = useState([])
  // const apiOptions = {headers: {Authorization: }}
  const makeDeposit = async (value: number, token: string) => {
    const { data } = await api.post(
      '/deposit',
      { value },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return data
  }
  const getTransactionHistory = async (token: string) => {
    const { data } = await api.get('/history', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  }
  return (
    <UserContext.Provider
      value={{
        makeDeposit,
        getTransactionHistory,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
export { UserProvider, useUser }
