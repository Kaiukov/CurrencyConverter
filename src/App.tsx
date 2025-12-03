import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRates } from './features/rates/api';
import { SUPPORTED, CurrencyMeta } from './features/rates/types';
import { crossConvert } from './utils/conversion';
import { formatAmount } from './utils/locale';
import { useAppState } from './state/store';
import { Header } from './components/Header';
import { UpdateBar } from './components/UpdateBar';
import { CurrencyRow } from './components/CurrencyRow';
import { Keypad } from './components/Keypad';

const TARGET_CODES = SUPPORTED.map((c) => c.code);

export default function App() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['rates'],
    queryFn: fetchRates,
    staleTime: 5 * 60 * 1000,
  });
  const { baseCode, setBaseCode, amount, setAmount, order } = useAppState();
  const [pending, setPending] = useState<{ op: string; acc: number } | null>(null);

  const baseRate = data?.[baseCode]?.rate ?? 1;
  const timestamp = data ? Object.values(data)[0]?.date : undefined;

  const rows: { meta: CurrencyMeta; value: number; rate: number }[] = useMemo(() => {
    if (!data) return [] as { meta: CurrencyMeta; value: number; rate: number }[];
    return order
      .filter((code) => TARGET_CODES.includes(code))
      .map((code) => {
        const meta = SUPPORTED.find((c) => c.code === code)!;
        const rate = data[code]?.rate ?? (code === 'UAH' ? 1 : 0);
        const value = crossConvert(parseInput(amount), baseRate, rate);
        return { meta, value, rate } satisfies { meta: CurrencyMeta; value: number; rate: number };
      });
  }, [data, order, amount, baseRate, baseCode]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col min-h-screen">
        <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-900 pt-[env(safe-area-inset-top)]">
          <Header />
          <UpdateBar timestamp={timestamp} onRefresh={() => refetch()} />
        </div>

        <main className="flex-1 overflow-y-auto pb-4">
          {isFetching && <div className="px-4 py-2 text-xs text-slate-400">Refreshing…</div>}
          <div className="divide-y divide-slate-800">
            {rows.map(({ meta, value, rate }) => (
              <CurrencyRow
                key={meta.code}
                meta={meta}
                value={value}
                isBase={meta.code === baseCode}
                displayAmount={amount}
                onAmountChange={(v) => setAmount(sanitizeInput(v))}
                onSelect={() => {
                  if (meta.code !== baseCode) {
                    const nextAmount = formatForInput(value, meta.precision);
                    setBaseCode(meta.code);
                    setAmount(nextAmount);
                    setPending(null);
                  }
                }}
              />
            ))}
          </div>
        </main>

        {/* Keep keypad component wired, but hide on small screens so mobile uses native keyboard */}
        <div className="hidden md:block w-full bg-slate-950/95 backdrop-blur sticky bottom-0 pt-2 shadow-[0_-6px_12px_-8px_rgba(0,0,0,0.6)]">
          <Keypad
            value={amount}
            onChange={(v) => setAmount(sanitizeInput(v))}
            onOp={(op) => {
              const current = parseInput(amount);
              if (!pending) {
                setPending({ op, acc: current });
                setAmount('');
                return;
              }
              const nextAcc = applyOp(pending.acc, current, pending.op);
              setPending({ op, acc: nextAcc });
              setAmount(String(nextAcc));
            }}
          />
        </div>
      </div>
    </div>
  );
}

function parseInput(raw: string): number {
  const normalized = raw.replace(/\s+/g, '').replace(',', '.');
  const n = parseFloat(normalized);
  return Number.isFinite(n) ? n : 0;
}

function sanitizeInput(v: string): string {
  const cleaned = v.replace(/[^0-9,]/g, '');
  // Trim leading zeros for integers (keep single leading zero only when typing decimals like 0,5)
  if (cleaned.length > 1 && cleaned[0] === '0' && cleaned[1] !== ',') {
    const trimmed = cleaned.replace(/^0+(?=\d)/, '');
    return trimmed === '' ? '0' : trimmed;
  }
  return cleaned;
}

function formatForInput(value: number, precision: number): string {
  const raw = value.toFixed(precision);
  const trimmed = raw.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  const normalized = trimmed.replace('.', ',');
  return normalized;
}

function applyOp(a: number, b: number, op: string): number {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
    case '×':
      return a * b;
    case '/':
    case '÷':
      return b === 0 ? a : a / b;
    default:
      return b;
  }
}
