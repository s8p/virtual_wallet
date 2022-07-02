import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User.entity'

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @CreateDateColumn()
  date?: Date

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'usernameOrigin' })
  usernameOrigin: User

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'usernameRecipient' })
  usernameRecipient?: User

  @Column({ type: 'float8' })
  transferedValue: number
}
