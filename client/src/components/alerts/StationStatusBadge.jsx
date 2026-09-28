import React from 'react';

export default function StationStatusBadge({ status = 'normal' }) {
  const map = {
    normal: { bg: 'bg-emerald-50/80', text: 'text-emerald-700', border: 'border-emerald-200/80', dot: 'bg-emerald-500' },
    warning: { bg: 'bg-amber-50/80', text: 'text-amber-600', border: 'border-amber-200/80', dot: 'bg-amber-400' },
    anomaly: { bg: 'bg-orange-50/80', text: 'text-orange-700', border: 'border-orange-200/80', dot: 'bg-orange-400' },
    quarantined: { bg: 'bg-blue-50/80', text: 'text-blue-700', border: 'border-blue-200/80', dot: 'bg-blue-500' },
    offline: { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200', dot: 'bg-slate-400' }
  };

  const current = map[status.toLowerCase()] || map.normal;

  return (
    <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold capitalize border ${current.bg} ${current.text} ${current.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot} ${status === 'anomaly' ? 'animate-pulse' : ''}`}></span>
      <span>{status}</span>
    </span>
  );
}
