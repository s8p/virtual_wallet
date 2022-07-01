import { NextFunction, Request, Response } from 'express'
import { User } from '../entities'
import { AppError } from '../errors/errors'
import { UserRepository } from '../repositories'

const checkForConflicts = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { username } = req.validated as User
  const user = await UserRepository.getBy({ username })
  if (user) {
    throw new AppError(409, 'Username already registered')
  }
  return next()
}
export default checkForConflicts
