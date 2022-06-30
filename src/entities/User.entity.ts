import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { Balance } from './Balance.entity'

@Entity('users')
export class User {
  @PrimaryColumn()
  username: string
  @Column()
  password: string
  @Column({ nullable: true })
  name?: string

  @OneToOne(() => Balance, { cascade: true, eager: true, nullable: false })
  @JoinColumn()
  balance: Balance
}
