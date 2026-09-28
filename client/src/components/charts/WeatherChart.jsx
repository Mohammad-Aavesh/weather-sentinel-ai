import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';

export default function WeatherChart({ readings = [], height = 300, stationId = 'AWS-042' }) {
  const [selectedParam, setSelectedParam] = useState('temperature');

  const configs = {
    temperature: { name: 'Temperature', unit: '°C', color: '#DC2626', key: 'temperature', expectedKey: 'expectedTemperature' },
    pressure: { name: 'Pressure', unit: 'hPa', color: '#2563EB', key: 'pressure', expectedKey: 'expectedPressure' },
    humidity: { name: 'Humidity', unit: '%', color: '#0891B2', key: 'humidity', expectedKey: 'expectedHumidity' }
  };

  const currentCfg = configs[selectedParam];

  // Format data for Recharts
  const chartData = readings.map((r, idx) => {
    const timeStr = r.timestamp ? new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : `T-${idx}`;
    return {
      time: timeStr,
      value: r[currentCfg.key],
      expected: r[currentCfg.expectedKey] || (selectedParam === 'temperature' ? 31.8 : selectedParam === 'pressure' ? 1003.2 : 64.5),
      isQuarantined: r.isQuarantined || r.anomalyScore > 60
    };
  });

  return (
    <div className="sentinel-card p-5 rounded-2xl border border-slate-100 hover:border-blue-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Live Meteorological Telemetry</h3>
          <p className="text-[11px] text-slate-400">Continuous 10-minute reporting interval ({stationId})</p>
        </div>

        {/* Parameter Switcher Tabs: Rounded Pills */}
        <div className="flex items-center space-x-1 bg-slate-50/80 p-1 rounded-full text-xs font-semibold border border-slate-200/80">
          <button
            onClick={() => setSelectedParam('temperature')}
            className={`px-3.5 py-1 rounded-full transition-all ${
              selectedParam === 'temperature' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-blue-600'
            }`}
          >
            Temperature (°C)
          </button>
          <button
            onClick={() => setSelectedParam('pressure')}
            className={`px-3.5 py-1 rounded-full transition-all ${
              selectedParam === 'pressure' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-blue-600'
            }`}
          >
            Pressure (hPa)
          </button>
          <button
            onClick={() => setSelectedParam('humidity')}
            className={`px-3.5 py-1 rounded-full transition-all ${
              selectedParam === 'humidity' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-blue-600'
            }`}
          >
            Humidity (%)
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="mt-4" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94A3B8' }} stroke="#E2E8F0" />
            <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} stroke="#E2E8F0" domain={['auto', 'auto']} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white text-slate-800 text-xs p-3 rounded-2xl shadow-xl border border-blue-100 ring-1 ring-slate-900/5">
                      <p className="font-bold text-slate-900 border-b pb-1 mb-1.5">{label}</p>
                      <p className="text-red-600 font-semibold">
                        Observed: <span className="font-bold text-slate-800">{payload[0]?.value} {currentCfg.unit}</span>
                      </p>
                      {payload[1] && (
                        <p className="text-emerald-600 font-semibold mt-0.5">
                          Expected: <span className="font-bold text-slate-800">{payload[1]?.value} {currentCfg.unit}</span>
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Expected Normal Baseline Line */}
            <Line
              type="monotone"
              dataKey="expected"
              stroke="#10B981"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              dot={false}
              name="Expected Normal"
            />
            {/* Actual Observed Telemetry Line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke={currentCfg.color}
              strokeWidth={2.5}
              activeDot={{ r: 6 }}
              name="Observed"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <span className="w-3 h-1 bg-red-600 rounded"></span>
            <span>Observed Sensor Reading</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-1 bg-emerald-500 rounded border border-dashed border-emerald-500"></span>
            <span>Counterfactual Expected Normal</span>
          </div>
        </div>
        <span className="italic">AI Quality Control & Temporal Consistency Active</span>
      </div>
    </div>
  );
}
