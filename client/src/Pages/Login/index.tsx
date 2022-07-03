import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

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
      <form onSubmit={handleSubmit(submit)}>
        <input {...register('username')}></input>
        <input {...register('password')}></input>
        <button type='submit'>Entrar</button>
      </form>
      <Link to='/register'>cadastrar</Link>
    </>
  )
}
export default Login
