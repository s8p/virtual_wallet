import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { useUser } from '../../Context/UserContext'

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
const History = () => {
  const { getTransactionHistory } = useUser()
  const { accessToken } = useAuth()
  const [transHist, setTransHist] = useState<Transfer[]>([] as Transfer[])

  useEffect(() => {
    getHist()
  }, [])

  const getHist = async () => {
    const hist = await getTransactionHistory(accessToken)
    setTransHist(hist)
  }
  return (
    <div>
      <h1>History</h1>
      <button onClick={getHist}>Get stuff</button>
      <ul>
        {transHist.map((entry) => (
          <li key={`${entry.id}`}>
            <div>
              <span>{entry.date}</span> <span>{entry.transferedValue}</span>{' '}
              <span>{entry.userOrigin.name || entry.userOrigin.username}</span>{' '}
              <span>
                {entry.userRecipient?.name || entry.userRecipient?.username}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <Link to='/home'>Voltar</Link>
    </div>
  )
}
export default History
