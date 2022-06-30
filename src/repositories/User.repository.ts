import { Repository } from 'typeorm'
import AppDataSource from '../data-source'
import { User } from '../entities'

interface ICourseRepo {
  save: (user: Partial<User>) => Promise<User>
  getBy: (payload: object) => Promise<User>
}

class UserRepository implements ICourseRepo {
  private userRepo: Repository<User>

  constructor() {
    this.userRepo = AppDataSource.getRepository(User)
  }

  save = async (user: User): Promise<User> => await this.userRepo.save(user)

  getBy = async (payload: object): Promise<User> =>
    await this.userRepo.findOneBy({ ...payload })
}

export default new UserRepository()
