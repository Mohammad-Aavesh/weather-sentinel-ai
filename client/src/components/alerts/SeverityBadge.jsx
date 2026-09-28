import React from 'react';

export default function SeverityBadge({ severity = 'LOW' }) {
  const map = {
    CRITICAL: 'bg-orange-50 text-orange-700 border-orange-200',
    HIGH: 'bg-orange-50 text-orange-600 border-orange-200',
    MEDIUM: 'bg-amber-50 text-amber-600 border-amber-200',
    LOW: 'bg-blue-50 text-blue-700 border-blue-200',
    NONE: 'bg-slate-50 text-slate-500 border-slate-200'
  };

  const style = map[severity.toUpperCase()] || map.LOW;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${style}`}>
      {severity}
    </span>
  );
}
