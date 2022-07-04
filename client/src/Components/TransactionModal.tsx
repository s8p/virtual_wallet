import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import SelfTransferForm from './SelfTransferForm'
import TransferForm from './TransferForm'

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
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'strech',
  gap: 2,
}
const TransactionModal = ({ isOpen, setIsOpen }: Props) => {
  const [type, setType] = useState('self')
  return (
    <Modal open={isOpen} onClose={setIsOpen}>
      <Box sx={style}>
        <Select
          variant='filled'
          value={type}
          label='Tipo de Transferência'
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value='self'>Deposito / Saque</MenuItem>
          <MenuItem value='transfer'>Transferência</MenuItem>
        </Select>
        {type === 'self' ? (
          <SelfTransferForm setIsOpen={setIsOpen} />
        ) : (
          <TransferForm setIsOpen={setIsOpen} />
        )}
      </Box>
    </Modal>
  )
}
export default TransactionModal
