import { User } from '../entities'
import { IDeposit, IUserCreation } from '../interfaces'

declare global {
  namespace Express {
    interface Request {
      validated: User | IUserCreation | IDeposit
      user: User
      authenticatedUser: User
    }
  }
}
