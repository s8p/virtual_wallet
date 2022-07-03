import { Switch } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import History from '../Pages/History'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Route from './route'

const Routes = () => {
  const { accessToken } = useAuth()
  return (
    <Switch>
      <Route isPrivate={!accessToken} exact path='/' component={Home} />
      <Route isPrivate path='/home' component={Home} />
      <Route isPrivate path='/history' component={History} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </Switch>
  )
}
export default Routes
