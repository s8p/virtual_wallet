import 'express-async-errors'
import express, { Request, Response } from 'express'
import cors from 'cors'
import registerRoutes from './routes'
import { errorHandler } from './errors/errors'

const app = express()
app.use(cors())
app.use(express.json())
registerRoutes(app)

app.use((_: Request, res: Response) => {
  res.status(404).json({ error: 'Route not valid' })
})

app.use(errorHandler)
export default app
