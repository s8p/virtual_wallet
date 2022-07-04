export interface IUserCreation {
  name?: string
  username: string
  password: string
  balance: number
}

interface IUser {
  name?: string
  username: string
  balance: number
}
export interface IUserOutput {
  user: IUser
  token: string
}

export interface IDeposit {
  value: number
}
