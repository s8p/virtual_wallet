import { NextFunction, Request, Response } from 'express'
import { User } from '../entities'
import { AppError } from '../errors/errors'
import { UserRepository } from '../repositories'

const getUserOr404 = async (req: Request, _: Response, next: NextFunction) => {
  const { username, name } = req.body
  if (!username && !name) {
    throw new AppError(400, 'Missing ´username´ or ´name´')
  }
  const user: User = await UserRepository.getBy({ username, name })
  if (!user) {
    throw new AppError(404, `User ´${username}´ not found`)
  }
  req.user = user
  return next()
}
export default getUserOr404
