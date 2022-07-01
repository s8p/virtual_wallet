import { Request, Response, NextFunction } from 'express'
type TMessage = string | Record<string, any>
class AppError {
  statusCode: number
  message: TMessage

  constructor(statusCode: number, message: TMessage) {
    this.statusCode = statusCode
    this.message = message
  }
}

const errorHandler = (
  e: Error,
  _: Request,
  res: Response,
  __: NextFunction
): Response => {
  if (e instanceof AppError) {
    return res.status(e.statusCode).json({ error: e.message })
  }
  console.error(e)
  return res.status(500).json({ error: 'Internal server error' })
}
export { AppError, errorHandler }
