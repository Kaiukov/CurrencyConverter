// All rates are expressed as UAH per 1 unit of currency.
// To convert from base -> target: amount * (rateBase / rateTarget).
export function crossConvert(amount: number, rateBase: number, rateTarget: number): number {
  return amount * (rateBase / rateTarget);
}
