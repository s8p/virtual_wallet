import Decimal from 'decimal.js'

export const normalizeFloat = (
  float: number,
  decimalPlace: number = 2
): number => {
  return new Decimal(float)
    .toDecimalPlaces(decimalPlace, Decimal.ROUND_DOWN)
    .toNumber()
}
