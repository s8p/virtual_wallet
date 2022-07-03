import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
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
  const columns = ['ID', 'Data', 'Valor Transferido', 'De', 'Para']
  return (
    <Container>
      <Typography variant='h1'>History</Typography>
      <Button variant='contained' onClick={getHist}>
        Get stuff
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} align='right'>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transHist.map((entry) => (
              <TableRow hover key={`${entry.id}`}>
                <TableCell align='right'>{entry.id}</TableCell>
                <TableCell align='right'>{entry.date}</TableCell>
                <TableCell align='right'>{entry.transferedValue}</TableCell>
                <TableCell align='right'>{entry.userOrigin.username}</TableCell>
                <TableCell align='right'>
                  {entry.userRecipient?.username}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to='/home'>Voltar</Link>
    </Container>
  )
}
export default History
