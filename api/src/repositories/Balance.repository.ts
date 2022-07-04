import { Repository, UpdateResult } from 'typeorm'
import AppDataSource from '../data-source'
import { Balance } from '../entities'

interface IBalanceRepo {
  save: (balance: Balance) => Promise<Balance>
  getBy: (payload: object) => Promise<Balance>
  update: (id: string, payload: Partial<Balance>) => Promise<UpdateResult>
}

class BalanceRepository implements IBalanceRepo {
  private balanceRepo: Repository<Balance>

  constructor() {
    this.balanceRepo = AppDataSource.getRepository(Balance)
  }

  save = async (balance: Balance): Promise<Balance> =>
    await this.balanceRepo.save(balance)

  getBy = async (payload: object): Promise<Balance> =>
    await this.balanceRepo.findOneBy({ ...payload })

  listAll = async (): Promise<Balance[]> => await this.balanceRepo.find()

  update = async (
    id: string,
    payload: Partial<Balance>
  ): Promise<UpdateResult> => await this.balanceRepo.update(id, { ...payload })
}

export default new BalanceRepository()
