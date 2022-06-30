import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @CreateDateColumn()
  date?: Date

  @Column({ type: 'float8' })
  transfered_value: number
}
