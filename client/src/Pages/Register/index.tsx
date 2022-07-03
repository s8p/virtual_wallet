import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

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
  const history = useHistory()
  const { signUp } = useAuth()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserData>({ resolver: yupResolver(registerSchema) })

  const submit = (data: UserData) => {
    signUp(data).then(() => history.push('/home'))
  }
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <input {...register('name')}></input>
        <input {...register('username')}></input>
        <input {...register('password')}></input>
        <button type='submit'>Registrar</button>
      </form>
      <Link to='/login'>Entrar</Link>
    </>
  )
}
export default Register
