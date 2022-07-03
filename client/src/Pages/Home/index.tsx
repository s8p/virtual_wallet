import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

const Home = () => {
  const { user } = useAuth()
  const [balance, setBalance] = useState(user?.balance)
  return (
    <div>
      <p>
        Ola {user.name || user.username}, você têm R$ {balance}
      </p>
      <Link to='/history'>Transações</Link>
    </div>
  )
}
export default Home
