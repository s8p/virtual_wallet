import { Express } from 'express'
import transferRoute from './transfer.route'
import userRouter from './user.router'

const registerRoutes = (app: Express) => {
  app.use('/api/', userRouter)
  app.use('/api/', transferRoute)
}
export default registerRoutes
