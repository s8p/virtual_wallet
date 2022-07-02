import { Request } from 'express'
import { Balance } from '../entities'
import { AppError } from '../errors/errors'
import { IDeposit } from '../interfaces'
import { BalanceRepository, TransactionRepository } from '../repositories'
import { transferSchema } from '../schemas'
import { addFloat, normalizeFloat } from '../utils'

class TransferService {
  transfer = async ({ authenticatedUser, user, validated }: Request) => {
    if (authenticatedUser.username === user.username) {
      throw new AppError(422, 'Invalid transaction')
    }
    const originBalance = await BalanceRepository.getBy({
      userUsername: authenticatedUser.username,
    })
    const recipientBalance = await BalanceRepository.getBy({
      userUsername: user.username,
    })
    if (originBalance.balance < (validated as IDeposit).value) {
      throw new AppError(422, 'Insufficient founds')
    }
    originBalance.balance = addFloat(
      -(validated as IDeposit).value,
      originBalance.balance
    )
    recipientBalance.balance = addFloat(
      recipientBalance.balance,
      (validated as IDeposit).value
    )
    await BalanceRepository.save(originBalance)
    await BalanceRepository.save(recipientBalance)
    const transaction = TransactionRepository.save({
      userOrigin: authenticatedUser,
      userRecipient: user,
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
    balanceToUpdate.balance = addFloat(
      (validated as IDeposit).value,
      balanceToUpdate.balance
    )
    if (balanceToUpdate.balance < 0) {
      throw new AppError(422, 'Insufficient founds')
    }
    await BalanceRepository.save(balanceToUpdate)
    const transaction = await TransactionRepository.save({
      userOrigin: authenticatedUser,
      transferedValue: normalizeFloat((validated as IDeposit).value),
      userRecipient: null,
    })
    const serializedTransaction = await transferSchema.serialization.validate(
      transaction,
      {
        stripUnknown: true,
        abortEarly: false,
      }
    )
    return serializedTransaction
  }
  getAll = async ({ authenticatedUser }: Request) => {
    const transactionHistory = await TransactionRepository.listAllFromUsername(
      authenticatedUser.username
    )
    const serializedHistory =
      await transferSchema.historySerialization.validate(transactionHistory, {
        stripUnknown: true,
        abortEarly: false,
      })
    return serializedHistory
  }
}

export default new TransferService()
