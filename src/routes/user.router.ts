import { Router } from 'express'
import userController from '../controllers/user.controller'
import { checkForConflicts, validateSchema } from '../middlewares'
import { userSchema } from '../schemas'

const userRouter = Router()

userRouter.post('/login', userController.login)

userRouter.post(
  '/register',
  validateSchema(userSchema.registration),
  checkForConflicts,
  userController.register
)
userRouter.get('/user/:username', userController.getById)

export default userRouter
