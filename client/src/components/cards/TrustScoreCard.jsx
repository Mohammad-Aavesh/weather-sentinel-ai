import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function TrustScoreCard({
  score = 87,
  grade = 'A+',
  label = 'High Integrity',
  components = {
    temporalConsistency: 92,
    physicalConsistency: 95,
    multivariateConsistency: 88,
    spatialAgreement: 84,
    sensorHealth: 72,
    dataFreshness: 99
  }
}) {
  // SVG circular calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (val) => {
    if (val >= 85) return '#10B981'; // emerald
    if (val >= 70) return '#2563EB'; // blue
    if (val >= 50) return '#F59E0B'; // amber
    return '#EF4444'; // red
  };

  const ringColor = getScoreColor(score);

  const items = [
    { label: 'Temporal Consistency', val: components.temporalConsistency ?? 92 },
    { label: 'Physical Consistency', val: components.physicalConsistency ?? 95 },
    { label: 'Multivariate Consistency', val: components.multivariateConsistency ?? 88 },
    { label: 'Spatial Agreement', val: components.spatialAgreement ?? 84 },
    { label: 'Sensor Digital Twin Health', val: components.sensorHealth ?? 72 },
    { label: 'Telemetry Freshness', val: components.dataFreshness ?? 99 }
  ];

  return (
    <div className="sentinel-card p-5 rounded-2xl border border-slate-100 hover:border-blue-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800">Weather Trust Score</h3>
            <span className="text-[10px] text-slate-400 font-medium">{label}</span>
          </div>
        </div>
        <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
          Composite Index
        </span>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Circular Gauge */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <svg className="w-28 h-28 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="#F1F5F9"
              strokeWidth="7"
              fill="transparent"
            />
            {/* Value circle */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke={ringColor}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-slate-900 leading-none">{score}</span>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">/ 100</span>
            <span className="text-[9px] font-bold text-blue-600 uppercase mt-0.5">{grade}</span>
          </div>
        </div>

        {/* Breakdown Progress Bars */}
        <div className="flex-1 w-full space-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500 font-medium">{item.label}</span>
                <span className="font-semibold text-slate-700">{item.val}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(100, Math.max(0, item.val))}%`,
                    backgroundColor: getScoreColor(item.val)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
