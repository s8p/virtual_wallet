import { compare } from 'bcrypt'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryColumn()
  username: string

  @Column()
  password: string

  @Column({ nullable: true })
  name?: string

  comparePwd = async (pwd: string): Promise<boolean> => {
    return await compare(pwd, this.password)
  }
}
