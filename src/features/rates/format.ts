import { formatAmount } from '../../utils/locale';
import { CurrencyMeta } from './types';

export function formatValue(value: number, meta: CurrencyMeta) {
  return formatAmount(value, meta.precision);
}
