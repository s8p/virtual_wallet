import { User } from '../entities'
import { IUserCreation } from '../interfaces'

declare global {
  namespace Express {
    interface Request {
      validated: User | IUserCreation
    }
  }
}
