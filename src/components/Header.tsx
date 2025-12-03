import React from 'react';

export const Header: React.FC<{ onEdit?: () => void }> = ({ onEdit }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-slate-900 text-slate-100">
      <div className="flex items-center gap-3">
        <span className="text-xl">☰</span>
        <div className="text-sm tracking-wide text-slate-300">CURRENCYPLUS</div>
      </div>
      <button onClick={onEdit} className="text-sm text-blue-300 hover:text-blue-100">
        Edit
      </button>
    </header>
  );
};
