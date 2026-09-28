import React from 'react';
import { Thermometer, Gauge, Droplets, AlertCircle } from 'lucide-react';

export default function WeatherMetricCard({
  parameter = 'temperature',
  value,
  expected,
  isAnomaly = false,
  unit = '°C',
  stationId = 'AWS-042'
}) {
  const configs = {
    temperature: {
      name: 'Temperature',
      icon: Thermometer,
      unit: '°C',
      normalRange: '22 - 35°C',
      accentColor: isAnomaly ? 'text-orange-600' : 'text-blue-600',
      iconBg: isAnomaly ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-600',
      bgGlow: isAnomaly ? 'border-orange-200 bg-orange-50/20' : 'border-slate-100 hover:border-blue-200 bg-white'
    },
    pressure: {
      name: 'Atmospheric Pressure',
      icon: Gauge,
      unit: 'hPa',
      normalRange: '1000 - 1008 hPa',
      accentColor: isAnomaly ? 'text-orange-600' : 'text-blue-600',
      iconBg: isAnomaly ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-600',
      bgGlow: isAnomaly ? 'border-orange-200 bg-orange-50/20' : 'border-slate-100 hover:border-blue-200 bg-white'
    },
    humidity: {
      name: 'Relative Humidity',
      icon: Droplets,
      unit: '%',
      normalRange: '45 - 85%',
      accentColor: isAnomaly ? 'text-orange-600' : 'text-blue-600',
      iconBg: isAnomaly ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-600',
      bgGlow: isAnomaly ? 'border-orange-200 bg-orange-50/20' : 'border-slate-100 hover:border-blue-200 bg-white'
    }
  };

  const cfg = configs[parameter] || configs.temperature;
  const Icon = cfg.icon;

  return (
    <div className={`sentinel-card p-5 rounded-2xl border transition-all ${cfg.bgGlow}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className={`w-8 h-8 rounded-full ${cfg.iconBg} flex items-center justify-center`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-600">{cfg.name}</span>
        </div>
        <span className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${
          isAnomaly
            ? 'bg-orange-100 text-orange-600 border border-orange-200'
            : 'bg-emerald-50 text-emerald-600 border border-emerald-200/80'
        }`}>
          {isAnomaly ? 'Anomaly' : 'Normal'}
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div className="flex items-baseline space-x-1">
          <span className={`text-3xl font-black tracking-tight ${isAnomaly ? 'text-orange-600' : 'text-slate-800'}`}>
            {value !== undefined && value !== null ? Number(value).toFixed(1) : '--'}
          </span>
          <span className="text-xs font-bold text-slate-400">{cfg.unit}</span>
        </div>
        {expected !== undefined && expected !== null && isAnomaly && (
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">Expected Normal</span>
            <span className="text-xs font-bold text-emerald-600">{Number(expected).toFixed(1)} {cfg.unit}</span>
          </div>
        )}
      </div>

      {isAnomaly && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Expected: <strong className="text-emerald-600 font-semibold">{Number(expected).toFixed(1)} {cfg.unit}</strong></span>
          <span className="text-orange-500 font-semibold flex items-center space-x-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Outlier</span>
          </span>
        </div>
      )}
    </div>
  );
}
