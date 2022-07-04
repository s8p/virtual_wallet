import { Box, Button, Container, Typography } from '@mui/material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TransactionModal } from '../../Components'
import { useAuth } from '../../Context/AuthContext'
import { useUser } from '../../Context/UserContext'

const Home = () => {
  const { accessToken, signOut } = useAuth()
  const { user, getUserInfo } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleModal = () => setIsModalOpen(!isModalOpen)
  useEffect(() => {
    getUserInfo(accessToken)
  }, [])
  return (
    <Container>
      <Box
        sx={{
          padding: 1,
          border: 1,
          borderColor: 'black',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Button component={Link} to='/history'>
          Transações
        </Button>
        <Button onClick={handleModal}>Transferir</Button>
        <Button onClick={signOut}>
          <LogoutOutlinedIcon />
        </Button>
        <TransactionModal isOpen={isModalOpen} setIsOpen={handleModal} />
      </Box>
      <Box>
        <Typography marginTop={1}>
          Olá {user.name || user.username}! {user.balance}
        </Typography>
      </Box>
    </Container>
  )
}
export default Home
