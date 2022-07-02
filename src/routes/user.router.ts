import { Router } from 'express'
import userController from '../controllers/user.controller'
import {
  checkForConflicts,
  getUserOr404,
  validateSchema,
  validateToken,
} from '../middlewares'
import { transferSchema, userSchema } from '../schemas'

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
userRouter.post(
  '/deposit',
  validateToken,
  validateSchema(userSchema.deposit),
  userController.update
)
userRouter.post(
  '/withdraw',
  validateToken,
  validateSchema(userSchema.deposit),
  userController.update
)
userRouter.post(
  '/transfer',
  validateToken,
  validateSchema(transferSchema.transaction),
  getUserOr404,
  userController.transfer
)

export default userRouter
