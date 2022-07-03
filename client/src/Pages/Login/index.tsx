import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Box, Button, Container, TextField, Typography } from '@mui/material'

interface LoginData {
  username: string
  password: string
}
const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
})
const Login = () => {
  const history = useHistory()
  const { signIn } = useAuth()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({ resolver: yupResolver(loginSchema) })

  const submit = (data: LoginData) => {
    signIn(data).then(() => history.push('/home'))
  }
  return (
    <>
      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          top: 86,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
        }}
        component='form'
        onSubmit={handleSubmit(submit)}
      >
        <Typography variant='h1'>Entrar</Typography>
        <TextField
          error={!!errors.username?.message}
          helperText={errors.username?.message}
          label='Nome de Usuario'
          {...register('username')}
        ></TextField>
        <TextField
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          type='password'
          label='Senha'
          {...register('password')}
        ></TextField>
        <Button variant='outlined' type='submit'>
          Entrar
        </Button>
        <Link to='/register'>Cadastrar</Link>
      </Box>
    </>
  )
}
export default Login
