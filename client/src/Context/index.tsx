import { ReactNode } from 'react'
import { AuthProvider } from './AuthContext'
import { UserProvider } from './UserContext'

interface ProvidersData {
  children: ReactNode
}
export const Providers = ({ children }: ProvidersData) => (
  <AuthProvider>
    <UserProvider>{children}</UserProvider>
  </AuthProvider>
)
