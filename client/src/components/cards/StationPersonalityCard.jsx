import React from 'react';
import { Sun, CloudSun, Moon } from 'lucide-react';

export default function StationPersonalityCard({ profile, stationId = 'AWS-042' }) {
  const p = profile || {
    morning: { tempMin: 24, tempMax: 29, humidityMin: 65, humidityMax: 85, pressureMin: 1002, pressureMax: 1008 },
    afternoon: { tempMin: 31, tempMax: 37, humidityMin: 45, humidityMax: 65, pressureMin: 998, pressureMax: 1005 },
    night: { tempMin: 22, tempMax: 26, humidityMin: 70, humidityMax: 90, pressureMin: 1004, pressureMax: 1009 },
    typicalNoise: '±0.25°C, ±0.4 hPa, ±1.5%',
    typicalRateOfChange: '< 1.8°C/hr',
    historicalAnomalyFrequency: '0.42% (Normal)'
  };

  return (
    <div className="sentinel-card p-5 rounded-2xl border border-slate-100 hover:border-blue-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Station Personality</h3>
          <p className="text-[11px] text-slate-400">Locally learned diurnal climatological baseline ({stationId})</p>
        </div>
        <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
          Adaptive Baseline
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        {/* Morning */}
        <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
          <div className="flex items-center space-x-1.5 text-blue-700 mb-2">
            <Sun className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-800">Morning Baseline</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Temperature:</span>
              <span className="font-semibold text-slate-800">{p.morning.tempMin} - {p.morning.tempMax}°C</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Humidity:</span>
              <span className="font-semibold text-slate-800">{p.morning.humidityMin} - {p.morning.humidityMax}%</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Pressure:</span>
              <span className="font-semibold text-slate-800">{p.morning.pressureMin} - {p.morning.pressureMax} hPa</span>
            </div>
          </div>
        </div>

        {/* Afternoon */}
        <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
          <div className="flex items-center space-x-1.5 text-blue-700 mb-2">
            <CloudSun className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold text-slate-800">Afternoon Baseline</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Temperature:</span>
              <span className="font-semibold text-slate-800">{p.afternoon.tempMin} - {p.afternoon.tempMax}°C</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Humidity:</span>
              <span className="font-semibold text-slate-800">{p.afternoon.humidityMin} - {p.afternoon.humidityMax}%</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Pressure:</span>
              <span className="font-semibold text-slate-800">{p.afternoon.pressureMin} - {p.afternoon.pressureMax} hPa</span>
            </div>
          </div>
        </div>

        {/* Night */}
        <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
          <div className="flex items-center space-x-1.5 text-blue-700 mb-2">
            <Moon className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold text-slate-800">Night Baseline</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Temperature:</span>
              <span className="font-semibold text-slate-800">{p.night.tempMin} - {p.night.tempMax}°C</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Humidity:</span>
              <span className="font-semibold text-slate-800">{p.night.humidityMin} - {p.night.humidityMax}%</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Pressure:</span>
              <span className="font-semibold text-slate-800">{p.night.pressureMin} - {p.night.pressureMax} hPa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Volatility & Characteristics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-100 text-xs">
        <div>
          <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">Typical Noise</span>
          <span className="font-semibold text-slate-700">{p.typicalNoise}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">Rate of Change Bound</span>
          <span className="font-semibold text-slate-700">{p.typicalRateOfChange}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">Historical Anomaly Rate</span>
          <span className="font-semibold text-slate-700">{p.historicalAnomalyFrequency}</span>
        </div>
      </div>
    </div>
  );
}
