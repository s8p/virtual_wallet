import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { User } from './User.entity'

@Entity('balances')
export class Balance {
  @PrimaryColumn()
  userUsername: string

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User

  @Column({ type: 'float8' })
  balance: number
}
