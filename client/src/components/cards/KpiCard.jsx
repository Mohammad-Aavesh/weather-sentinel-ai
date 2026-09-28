import React from 'react';

export default function KpiCard({ title, value, subtitle, icon: Icon, color = 'blue', onClick }) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50/60',
      border: 'border-slate-100 hover:border-blue-200',
      text: 'text-blue-700',
      iconBg: 'bg-blue-50 text-blue-600',
      iconColor: 'text-blue-600'
    },
    green: {
      bg: 'bg-emerald-50/60',
      border: 'border-slate-100 hover:border-emerald-200',
      text: 'text-emerald-700',
      iconBg: 'bg-emerald-50 text-emerald-600',
      iconColor: 'text-emerald-600'
    },
    red: {
      bg: 'bg-orange-50/60',
      border: 'border-slate-100 hover:border-orange-200',
      text: 'text-orange-700',
      iconBg: 'bg-orange-50 text-orange-500',
      iconColor: 'text-orange-500'
    },
    amber: {
      bg: 'bg-amber-50/60',
      border: 'border-slate-100 hover:border-amber-200',
      text: 'text-amber-700',
      iconBg: 'bg-amber-50 text-amber-600',
      iconColor: 'text-amber-600'
    },
    slate: {
      bg: 'bg-slate-50/60',
      border: 'border-slate-100 hover:border-slate-200',
      text: 'text-slate-700',
      iconBg: 'bg-slate-100 text-slate-600',
      iconColor: 'text-slate-600'
    },
    purple: {
      bg: 'bg-purple-50/60',
      border: 'border-slate-100 hover:border-purple-200',
      text: 'text-purple-700',
      iconBg: 'bg-purple-50 text-purple-600',
      iconColor: 'text-purple-600'
    }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div
      onClick={onClick}
      className={`sentinel-card p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${scheme.border}`}
    >
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{title}</p>
        <div className="flex items-baseline space-x-1.5 mt-1">
          <span className="text-2xl font-black text-slate-700 tracking-tight">{value}</span>
          {subtitle && <span className="text-[11px] text-slate-400 font-medium">{subtitle}</span>}
        </div>
      </div>
      {Icon && (
        <div className={`w-9 h-9 rounded-full ${scheme.iconBg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105`}>
          <Icon className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
