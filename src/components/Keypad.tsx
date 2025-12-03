import React from 'react';

// Mobile-first 4x5 grid; operators on left per reference feel
const layout: string[][] = [
  ['C', '7', '8', '9'],
  ['↺', '4', '5', '6'],
  ['', '1', '2', '3'],
  ['', '0', ',', '⌫'],
  ['', '', '', ''],
];

export const Keypad: React.FC<{ value: string; onChange: (next: string) => void; onOp?: (op: string) => void }> = ({
  value,
  onChange,
  onOp,
}) => {
  const handleKey = (k: string) => {
    if (k === 'C') return onChange('');
    if (k === '↺') return onChange(value); // placeholder for refresh/undo
    if (k === '⌫') return onChange(value.length > 0 ? value.slice(0, -1) : '');
    if (['+', '-', '/', '*', '×', '÷'].includes(k)) {
      onOp?.(k);
      return;
    }
    if (k === ',') {
      if (value.includes(',')) return;
      return onChange(value + ',');
    }
    // digit
    onChange(value + k);
  };

  return (
    <div className="grid grid-cols-4 gap-2 p-3 bg-slate-900">
      {layout.flatMap((row, rIdx) =>
        row.map((k, idx) => (
          <button
            key={`${rIdx}-${idx}`}
            onClick={() => k && handleKey(k)}
            className={`rounded bg-slate-800 text-slate-100 py-4 text-2xl hover:bg-slate-700 ${
              k ? '' : 'opacity-0 cursor-default'
            }`}
            disabled={!k}
          >
            {k}
          </button>
        ))
      )}
    </div>
  );
};
