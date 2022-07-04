import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useAuth } from '../Context/AuthContext'
import { useUser } from '../Context/UserContext'
import { useState } from 'react'

interface TransferData {
  recipient: string
  value: number
}
interface Props {
  setIsOpen: () => void
}
const transferSchema = yup.object().shape({
  recipient: yup.string().required(),
  value: yup.number().required().min(1),
})
const TransferForm = ({ setIsOpen }: Props) => {
  const [identifier, setIdentifier] = useState('name')
  const { accessToken } = useAuth()
  const { makeTransfer } = useUser()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TransferData>({ resolver: yupResolver(transferSchema) })

  const submit = async ({ recipient, value }: TransferData) => {
    makeTransfer(value, accessToken, identifier, recipient)
    setIsOpen()
  }
  return (
    <FormControl
      component='form'
      onSubmit={handleSubmit(submit)}
      sx={{
        display: 'flex',
        alginItems: 'center',
        gap: 2,
      }}
    >
      <TextField
        type='number'
        label='Valor'
        variant='filled'
        error={!!errors.value?.message}
        helperText={errors.value?.message}
        {...register('value')}
      />
      <TextField
        label='Para'
        variant='filled'
        error={!!errors.recipient?.message}
        helperText={errors.recipient?.message}
        {...register('recipient')}
      />
      <RadioGroup
        sx={{ display: 'flex', flexDirection: 'row' }}
        defaultValue='name'
        onChange={(e) => setIdentifier(e.target.value)}
      >
        <FormControlLabel value='name' control={<Radio />} label='Nome' />
        <FormControlLabel
          value='username'
          control={<Radio />}
          label='Nome de Usuário'
        />
      </RadioGroup>
      <Button variant='contained' type='submit'>
        Transferir
      </Button>
    </FormControl>
  )
}
export default TransferForm
