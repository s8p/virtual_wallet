import { Router } from 'express'
import { userController } from '../controllers'
import {
  checkForConflicts,
  validateSchema,
  validateToken,
} from '../middlewares'
import { userSchema } from '../schemas'

const userRouter = Router()

userRouter.post(
  '/login',
  validateSchema(userSchema.login),
  userController.login
)
userRouter.post(
  '/register',
  validateSchema(userSchema.registration),
  checkForConflicts,
  userController.register
)
userRouter.get('/user', validateToken, userController.getById)

export default userRouter
