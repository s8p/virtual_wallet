import { Router } from 'express'
import userController from '../controllers/user.controller'
import {
  checkForConflicts,
  validateSchema,
  validateToken,
} from '../middlewares'
import { userSchema } from '../schemas'

const userRouter = Router()

userRouter.post('/login', userController.login)

userRouter.post(
  '/register',
  validateSchema(userSchema.registration),
  checkForConflicts,
  userController.register
)
userRouter.get('/user/', validateToken, userController.getById)
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

export default userRouter
