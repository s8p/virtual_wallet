import { Repository } from 'typeorm'
import AppDataSource from '../data-source'
import { Transaction } from '../entities'

interface ITransactionRepo {
  save: (user: Partial<Transaction>) => Promise<Transaction>
  getBy: (payload: object) => Promise<Transaction>
  listAll: () => Promise<Transaction[]>
}

class TransactionRepository implements ITransactionRepo {
  private transactionRepo: Repository<Transaction>

  constructor() {
    this.transactionRepo = AppDataSource.getRepository(Transaction)
  }

  save = async (transaction: Transaction): Promise<Transaction> =>
    await this.transactionRepo.save(transaction)

  getBy = async (payload: object): Promise<Transaction> =>
    await this.transactionRepo.findOneBy({ ...payload })

  listAll = async (): Promise<Transaction[]> =>
    await this.transactionRepo.find()
}

export default new TransactionRepository()
