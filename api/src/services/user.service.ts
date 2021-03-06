import { Request } from 'express'
import { sign } from 'jsonwebtoken'
import { Decimal } from 'decimal.js'
import { Balance, User } from '../entities'
import { AppError } from '../errors/errors'
import { BalanceRepository, UserRepository } from '../repositories'
import dotenv from 'dotenv'
import { IUserCreation } from '../interfaces'
import { userSchema } from '../schemas'
dotenv.config({ path: '../../.env' })

class UserService {
  login = async ({ body }: Request) => {
    if (!body || !body.username || !body.password) {
      throw new AppError(400, 'Invalid request')
    }
    const user: User = await UserRepository.getBy({ username: body.username })

    if (!user || !(await user.comparePwd(body.password))) {
      throw new AppError(401, 'Invalid username or password')
    }
    const token = sign({ username: user.username }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    })
    return token
  }
  create = async ({ validated }: Request) => {
    const { balance: balanceValue, ...userInfo } = validated as IUserCreation
    const savedUser = await UserRepository.save({ ...(userInfo as User) })
    const { user, balance } = await BalanceRepository.save({
      user: savedUser,
      balance: Number(
        Decimal.add(balanceValue, 100).toDecimalPlaces(2, Decimal.ROUND_DOWN)
      ),
    } as Balance)
    const serializedUser = await userSchema.serialization.validate(
      { ...user, balance },
      {
        stripUnknown: true,
        abortEarly: false,
      }
    )
    const token = sign(
      { username: serializedUser.username },
      process.env.SECRET_KEY,
      { expiresIn: process.env.EXPIRES_IN }
    )
    return { user: serializedUser, token }
  }
  getById = async ({ authenticatedUser }: Request) => {
    const { username } = authenticatedUser
    const { balance } = await BalanceRepository.getBy({
      userUsername: username,
    })
    const serializedUser = await userSchema.serialization.validate(
      { ...authenticatedUser, balance },
      {
        stripUnknown: true,
        abortEarly: false,
      }
    )
    return serializedUser
  }
}
export default new UserService()
