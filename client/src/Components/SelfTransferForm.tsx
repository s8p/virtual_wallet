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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUser } from '../Context/UserContext'
import { useAuth } from '../Context/AuthContext'

interface TransferData {
  value: number
}
interface Props {
  setIsOpen: () => void
}
const transferSchema = yup.object().shape({
  value: yup.number().min(1).required(),
})
const SelfTransferForm = ({ setIsOpen }: Props) => {
  const [operation, setOperation] = useState('deposit')
  const { accessToken } = useAuth()
  const { makeDeposit } = useUser()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TransferData>({ resolver: yupResolver(transferSchema) })
  const submit = async ({ value }: TransferData) => {
    makeDeposit(value, accessToken, operation as 'deposit' | 'withdraw')
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
        inputProps={{ step: '0.01' }}
        label='Valor'
        variant='filled'
        error={!!errors.value?.message}
        helperText={errors.value?.message}
        {...register('value')}
      />
      <RadioGroup
        sx={{ display: 'flex', flexDirection: 'row' }}
        defaultValue='deposit'
        onChange={(e) => setOperation(e.target.value)}
      >
        <FormControlLabel
          value='deposit'
          control={<Radio />}
          label='Depositar'
        />
        <FormControlLabel value='withdraw' control={<Radio />} label='Sacar' />
      </RadioGroup>
      <Button
        disabled={!!errors.value?.message}
        variant='contained'
        type='submit'
      >
        {operation === 'deposit' ? 'Depositar' : 'Sacar'}
      </Button>
    </FormControl>
  )
}
export default SelfTransferForm
