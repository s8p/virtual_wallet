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
  @JoinColumn({ name: 'userOrigin' })
  userOrigin: User

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userRecipient' })
  userRecipient?: User

  @Column({ type: 'float8' })
  transferedValue: number
}
