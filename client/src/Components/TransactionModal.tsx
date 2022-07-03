import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

interface Props {
  isOpen: boolean
  setIsOpen: () => void
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const TransactionModal = ({ isOpen, setIsOpen }: Props) => {
  const [type, setType] = useState('deposit')
  return (
    <Modal open={isOpen} onClose={setIsOpen}>
      <Box sx={style}>
        <Typography variant='h3'>Transferencia</Typography>
        <Select
          value={type}
          label='Tipo de Transferencia'
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value='deposit'>Deposito</MenuItem>
          <MenuItem value='withdraw'>Saque</MenuItem>
          <MenuItem value='transfer'>Transferencia</MenuItem>
        </Select>
        <TextField label='Para' variant='filled' />
        <TextField type='number' label='Valor' variant='filled' />
        <Button>Tranferir</Button>
      </Box>
    </Modal>
  )
}
export default TransactionModal
