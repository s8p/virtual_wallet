import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../Context/AuthContext'
import { Link } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material'

interface UserData {
  username: string
  password: string
  name?: string
}

const registerSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  name: yup.string().nullable(),
})
const Register = () => {
  const { signUp } = useAuth()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserData>({ resolver: yupResolver(registerSchema) })

  const submit = (data: UserData) => {
    signUp(data)
  }
  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit(submit)}
        sx={{
          width: '100%',
          position: 'absolute',
          top: 86,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Typography variant='h1'>Cadastrar</Typography>
        <TextField
          error={!!errors.name?.message}
          helperText={errors.name?.message}
          label='Nome'
          {...register('name')}
        ></TextField>
        <TextField
          error={!!errors.username?.message}
          helperText={errors.username?.message}
          label='Nome de Usuario *'
          {...register('username')}
        ></TextField>
        <TextField
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          type='password'
          label='Senha *'
          {...register('password')}
        ></TextField>
        <Button variant='outlined' type='submit'>
          Registrar
        </Button>
        <Typography>
          Já possui uma conta? <Link to='/login'>Entrar</Link>
        </Typography>
      </Box>
    </>
  )
}
export default Register
