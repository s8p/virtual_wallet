import { Request, Response } from 'express'
import { IUserOutput } from '../interfaces'
import { userService } from '../services'

class UserController {
  login = async (req: Request, res: Response) => {
    const token = await userService.login(req)
    return res.status(200).json({ token })
  }
  register = async (req: Request, res: Response) => {
    const user: IUserOutput = await userService.create(req)
    return res.status(201).json(user)
  }
  getById = async (req: Request, res: Response) => {
    const user = await userService.getById(req)
    return res.status(200).json(user)
  }
  update = async (req: Request, res: Response) => {
    const user = await userService.updateBalance(req)
    return res.status(200).json(user)
  }
}
export default new UserController()
