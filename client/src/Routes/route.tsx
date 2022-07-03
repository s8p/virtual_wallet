import { ComponentType } from 'react'
import { Redirect, Route as ReactDOMRoute, RouteProps } from 'react-router-dom'

interface Props extends RouteProps {
  isPrivate?: boolean
  component: ComponentType<any>
}
const Route = ({ isPrivate = false, component: Component, ...rest }: Props) => {
  const authToken = localStorage.getItem('@Wallet:Token')
  return (
    <ReactDOMRoute
      {...rest}
      render={() =>
        isPrivate === !!authToken ? (
          <Component></Component>
        ) : (
          <Redirect to={isPrivate ? '/login' : '/home'} />
        )
      }
    />
  )
}
export default Route
