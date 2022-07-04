import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/errors'
import { User } from '../entities'
import { UserRepository } from '../repositories'
dotenv.config()

const validateToken = async (req: Request, _: Response, next: NextFunction) => {
  const token: string = req.headers.authorization?.split(' ')[1]

  if (!token) {
    throw new AppError(400, 'Missing authorization token')
  }
  try {
    const { username } = verify(token, process.env.SECRET_KEY) as User
    const user = await UserRepository.getBy({ username })
    if (!user) {
      throw new AppError(401, 'Invalid token')
    }
    req.authenticatedUser = user
    return next()
  } catch (e) {
    throw new AppError(401, 'Invalid token')
  }
}

export default validateToken
