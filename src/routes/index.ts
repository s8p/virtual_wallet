import { Express } from 'express'
import userRouter from './user.router'

const registerRoutes = (app: Express) => {
  app.use('/api/', userRouter)
}
export default registerRoutes
