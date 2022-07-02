export interface IUserCreation {
  name?: string
  username: string
  password: string
  balance: number
}

export interface IUserOutput {
  name?: string
  username: string
  balance: number
}

export interface IDeposit {
  value: number
}
