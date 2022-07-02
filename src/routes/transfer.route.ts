import { Router } from 'express'
import { transferController } from '../controllers'
import { getUserOr404, validateSchema, validateToken } from '../middlewares'
import { transferSchema } from '../schemas'

const transferRoute = Router()

transferRoute.get('/history', validateToken, transferController.getHistory)
transferRoute.post(
  '/deposit',
  validateToken,
  validateSchema(transferSchema.transfer),
  transferController.update
)
transferRoute.post(
  '/withdraw',
  validateToken,
  validateSchema(transferSchema.transfer),
  transferController.update
)
transferRoute.post(
  '/transfer',
  validateToken,
  validateSchema(transferSchema.transaction),
  getUserOr404,
  transferController.transfer
)
export default transferRoute
