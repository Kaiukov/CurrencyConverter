import React from 'react';
import { formatValue } from '../features/rates/format';
import { CurrencyMeta } from '../features/rates/types';
import { formatAmount } from '../utils/locale';

type Props = {
  meta: CurrencyMeta;
  value: number;
  isBase: boolean;
  displayAmount: string;
  onSelect: () => void;
  onAmountChange: (v: string) => void;
  onHistory?: () => void;
};

export const CurrencyRow: React.FC<Props> = ({
  meta,
  value,
  isBase,
  displayAmount,
  onSelect,
  onAmountChange,
  onHistory,
}) => {
  const formattedInput = displayAmount;

  return (
    <div
      className={`flex items-center justify-between px-4 py-4 border-b border-slate-800 text-left gap-3 ${
        isBase ? 'bg-slate-800/70' : 'hover:bg-slate-900'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-xl" aria-hidden>
          {meta.flag}
        </span>
        <div>
          <div className="text-sm font-semibold text-slate-100 leading-tight">{meta.code}</div>
          <div className="text-xs text-slate-400">{meta.name}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-1 justify-end">
        <input
          aria-label={`${meta.code} amount`}
          className={`w-full text-right bg-transparent text-slate-100 font-mono text-lg outline-none border-none px-1 ${
            isBase ? '' : ''
          }`}
          value={isBase ? formattedInput : valueDisplay(value, meta, displayAmount)}
          onChange={(e) => isBase && onAmountChange(e.target.value)}
          inputMode="decimal"
          autoFocus={isBase}
          onFocus={(e) => e.target.select()}
          readOnly={!isBase}
        />
        <button
          aria-label={`${meta.code} history`}
          className={`text-slate-500 hover:text-slate-200 ${isBase ? 'text-slate-300' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onHistory?.();
          }}
        >
          📈
        </button>
      </div>
    </div>
  );
};

function formatInputDisplay(raw: string, fractionDigits = 2): string {
  const normalized = raw.replace(/\s+/g, '').replace(',', '.');
  const num = parseFloat(normalized);
  if (!Number.isFinite(num)) return raw;
  return formatAmount(num, fractionDigits);
}

function valueDisplay(value: number, meta: CurrencyMeta, displayAmount: string) {
  if (!displayAmount.trim()) return '';
  if (value === 0) return '';
  return formatValue(value, meta);
}
