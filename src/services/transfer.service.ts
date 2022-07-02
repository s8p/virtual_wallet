import Decimal from 'decimal.js'
import { Request } from 'express'
import { Balance } from '../entities'
import { AppError } from '../errors/errors'
import { IDeposit } from '../interfaces'
import { BalanceRepository, TransactionRepository } from '../repositories'
import { userSchema } from '../schemas'
import { normalizeFloat } from '../utils'

class TransferService {
  transfer = async ({ authenticatedUser, user, validated }: Request) => {
    const originBalance = await BalanceRepository.getBy({
      userUsername: authenticatedUser.username,
    })
    const recipientBalance = await BalanceRepository.getBy({
      userUsername: user.username,
    })
    if (originBalance.balance < (validated as IDeposit).value) {
      throw new AppError(422, 'Insufficient founds')
    }
    originBalance.balance = Decimal.sub(
      originBalance.balance,
      (validated as IDeposit).value
    )
      .toDecimalPlaces(2, Decimal.ROUND_DOWN)
      .toNumber()
    recipientBalance.balance = Decimal.add(
      recipientBalance.balance,
      (validated as IDeposit).value
    )
      .toDecimalPlaces(2, Decimal.ROUND_DOWN)
      .toNumber()
    await BalanceRepository.save(originBalance)
    await BalanceRepository.save(recipientBalance)
    const transaction = TransactionRepository.save({
      usernameOrigin: authenticatedUser,
      usernameRecipient: user,
      transferedValue: (validated as IDeposit).value,
    })
    return transaction
  }
  updateBalance = async ({ authenticatedUser, validated, path }: Request) => {
    if (path === '/withdraw') {
      ;(validated as IDeposit).value = -(validated as IDeposit).value
    }
    const balanceToUpdate: Balance = await BalanceRepository.getBy({
      userUsername: authenticatedUser.username,
    })
    balanceToUpdate.balance = normalizeFloat(
      Decimal.add(
        (validated as IDeposit).value,
        balanceToUpdate.balance
      ).toNumber()
    )
    if (balanceToUpdate.balance < 0) {
      throw new AppError(422, 'Insufficient founds')
    }
    const { balance } = await BalanceRepository.save(balanceToUpdate)
    await TransactionRepository.save({
      usernameOrigin: authenticatedUser,
      transferedValue: normalizeFloat((validated as IDeposit).value),
    })
    const serializedUser = await userSchema.serialization.validate(
      { ...authenticatedUser, balance },
      {
        stripUnknown: true,
        abortEarly: false,
      }
    )
    return serializedUser
  }
}

export default new TransferService()
