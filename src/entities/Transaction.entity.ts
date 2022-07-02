import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User.entity'

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @CreateDateColumn()
  date?: Date

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'usernameOrigin' })
  usernameOrigin: User

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'usernameRecipient' })
  usernameRecipient: User

  @Column({ type: 'float8' })
  transferedValue: number
}
