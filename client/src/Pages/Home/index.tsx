import { Paper, Box, Button, Container, Typography } from '@mui/material'
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
          paddingTop: 1,
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
      <Box
        paddingTop={5}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant='h3'>Olá, {user.name || user.username}!</Typography>
        <Paper sx={{ padding: 5, marginTop: 5, maxWidth: '290px' }}>
          <Typography align='center' variant='h4'>
            R$ {user.balance}
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}
export default Home
