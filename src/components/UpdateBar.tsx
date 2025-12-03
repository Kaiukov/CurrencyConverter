import React from 'react';

export const UpdateBar: React.FC<{ timestamp?: string; onRefresh?: () => void }> = ({ timestamp, onRefresh }) => (
  <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-300 bg-slate-800 border-b border-slate-700">
    <span>Updated: {timestamp ?? '—'}</span>
    <button
      className="px-2 py-1 rounded bg-slate-700 text-slate-200 hover:bg-slate-600"
      onClick={onRefresh}
    >
      Refresh
    </button>
  </div>
);
