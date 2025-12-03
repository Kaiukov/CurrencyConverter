import { useLocalStorage } from '../hooks/useLocalStorage';
import { SUPPORTED } from '../features/rates/types';

export function useAppState() {
  const [baseCode, setBaseCode] = useLocalStorage<string>('baseCode', 'USD');
  const [amount, setAmount] = useLocalStorage<string>('amount', '');
  const [order, setOrder] = useLocalStorage<string[]>('order', SUPPORTED.map((c) => c.code));
  return { baseCode, setBaseCode, amount, setAmount, order, setOrder };
}
