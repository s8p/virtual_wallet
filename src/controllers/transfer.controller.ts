import { Request, Response } from 'express'
import transferService from '../services/transfer.service'

class TransferController {
  update = async (req: Request, res: Response) => {
    const user = await transferService.updateBalance(req)
    return res.status(200).json(user)
  }
  transfer = async (req: Request, res: Response) => {
    const user = await transferService.transfer(req)
    return res.status(200).json(user)
  }
}

export default new TransferController()
