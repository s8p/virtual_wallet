import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('balances')
export class Balance {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ type: 'float8' })
  balance: number
}
