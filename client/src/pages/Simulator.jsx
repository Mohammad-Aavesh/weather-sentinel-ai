import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FlaskConical,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Flame,
  Gauge,
  Droplets,
  Snowflake,
  TrendingUp,
  Radio,
  FileQuestion,
  CloudLightning
} from 'lucide-react';
import { simulatorService } from '../services/api';
import CounterfactualCard from '../components/cards/CounterfactualCard';
import SeverityBadge from '../components/alerts/SeverityBadge';

const SCENARIOS = [
  { id: 'TEMPERATURE_SPIKE', name: 'Temperature Spike (Primary Demo)', icon: Flame, desc: '55.0°C isolated spike on AWS-042 while neighbors remain 31–33°C', color: 'red' },
  { id: 'PRESSURE_SPIKE', name: 'Barometric Surge / Drop', icon: Gauge, desc: 'Sudden pressure drop to 942.0 hPa without synoptic cyclone confirmation', color: 'blue' },
  { id: 'HUMIDITY_SPIKE', name: 'Humidity Saturation Spike', icon: Droplets, desc: '99.8% saturated humidity jump in dry afternoon time slot', color: 'cyan' },
  { id: 'FROZEN_VALUE', name: 'Frozen Sensor / Flatline', icon: Snowflake, desc: 'Analog sensor deadlocks reporting identical reading for 6+ intervals', color: 'indigo' },
  { id: 'CALIBRATION_DRIFT', name: 'Calibration Drift', icon: TrendingUp, desc: 'Subtle +0.18°C/week progressive transducer baseline degradation', color: 'amber' },
  { id: 'COMMUNICATION_GAP', name: 'Telemetry Gap / Packet Loss', icon: Radio, desc: 'Modem telemetry silence and missing data packets', color: 'slate' },
  { id: 'DATA_CORRUPTION', name: 'Data Corruption / ADC Glitch', icon: FileQuestion, desc: 'Impossible value (e.g. 999.9°C or negative humidity)', color: 'purple' },
  { id: 'GENUINE_EXTREME_WEATHER', name: 'Genuine Extreme Weather (Heatwave)', icon: CloudLightning, desc: '52.4°C extreme heat confirmed by neighboring consensus (genuine event, not fault)', color: 'emerald' }
];

export default function Simulator() {
  const navigate = useNavigate();
  const [stationId, setStationId] = useState('AWS-042');
  const [anomalyType, setAnomalyType] = useState('TEMPERATURE_SPIKE');
  const [severity, setSeverity] = useState('HIGH');
  const [noiseLevel, setNoiseLevel] = useState(0.5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleInject = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await simulatorService.inject({
        stationId,
        anomalyType,
        severity,
        noiseLevel: parseFloat(noiseLevel)
      });
      if (res.data?.success) {
        setResult(res.data);
      }
    } catch (err) {
      console.error('Simulator error:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentScenario = SCENARIOS.find(s => s.id === anomalyType) || SCENARIOS[0];

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <FlaskConical className="w-5 h-5 text-amber-500" />
            <span>Interactive Anomaly Simulator & Synthetic Injection</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Test the live multi-layer quality-control engine by streaming synthetic meteorological anomalies
          </p>
        </div>

        {/* Quick Demo Scenario Button */}
        <button
          onClick={() => {
            setStationId('AWS-042');
            setAnomalyType('TEMPERATURE_SPIKE');
            handleInject();
          }}
          className="px-4 py-2 text-xs font-semibold rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm shadow-blue-500/25 flex items-center space-x-2 transition-all"
        >
          <Flame className="w-4 h-4 text-blue-200" />
          <span>Run Primary Demo Scenario</span>
        </button>
      </div>

      {/* Simulator Controls & Scenario Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenario Selector (7 cols) */}
        <div className="lg:col-span-7 sentinel-card p-5 rounded-2xl border border-slate-100 hover:border-blue-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Select Anomaly / Event Scenario
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SCENARIOS.map((sc) => {
              const Icon = sc.icon;
              const isSelected = anomalyType === sc.id;
              return (
                <div
                  key={sc.id}
                  onClick={() => setAnomalyType(sc.id)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                      : 'hover:bg-slate-50/80 border-slate-200/80 bg-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                      {sc.name}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                      {sc.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Injection Parameters (5 cols) */}
        <div className="lg:col-span-5 sentinel-card p-5 rounded-2xl border border-slate-100 hover:border-blue-200 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Injection Control Parameters
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1.5 ml-1">Target Weather Station</label>
                <select
                  value={stationId}
                  onChange={(e) => setStationId(e.target.value)}
                  className="w-full bg-white border border-slate-200/90 rounded-full px-4 py-2 text-xs focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-slate-800 shadow-xs"
                >
                  <option value="AWS-042">AWS-042 — Chikkamagaluru Hill Station (Primary)</option>
                  <option value="AWS-017">AWS-017 — Shivamogga Agri Sector</option>
                  <option value="AWS-009">AWS-009 — Hassan Valley AWS</option>
                  <option value="AWS-001">AWS-001 — Bengaluru Central AWS</option>
                  <option value="AWS-023">AWS-023 — Koppal Heritage Met AWS</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1.5 ml-1">Target Severity Level</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setSeverity(sev)}
                      className={`py-1.5 rounded-full text-[11px] font-bold transition-all border ${
                        severity === sev
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1 ml-1">
                  <span>Simulated Environmental Noise</span>
                  <span className="font-mono text-blue-600">±{noiseLevel}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2.0"
                  step="0.1"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(e.target.value)}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 text-[11px] text-slate-600">
                <span className="font-semibold text-slate-800 block mb-0.5">Scenario Behavior:</span>
                {currentScenario.desc}
              </div>
            </div>
          </div>

          <button
            onClick={handleInject}
            disabled={loading}
            className="w-full mt-6 py-3 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-full text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{loading ? 'Running Anomaly Engine...' : 'Inject & Stream Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* Simulator Execution Output Panel */}
      {result && (
        <div className="sentinel-card p-6 rounded-2xl bg-white border border-blue-200 shadow-sm animate-fadeIn space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Live Engine Execution Complete
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2">
                AI Quality-Control Assessment: {result.pipelineResult?.fusion?.rootCause}
              </h3>
            </div>
            <button
              onClick={() => navigate(`/stations/${result.simulatedParameters?.stationId}`)}
              className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold border border-blue-200/80 text-xs flex items-center space-x-1.5 transition-all shadow-xs"
            >
              <span>View Updated Station</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Anomaly Score</span>
              <span className="text-2xl font-black text-red-600">
                {result.pipelineResult?.fusion?.anomalyScore}%
              </span>
            </div>
            <div className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Confidence</span>
              <span className="text-2xl font-black text-blue-600">
                {result.pipelineResult?.fusion?.confidence}%
              </span>
            </div>
            <div className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Severity</span>
              <div className="mt-1">
                <SeverityBadge severity={result.pipelineResult?.fusion?.severity || 'HIGH'} />
              </div>
            </div>
            <div className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Quarantine State</span>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-block mt-1">
                {result.pipelineResult?.reading?.qualityStatus || 'QUARANTINED'}
              </span>
            </div>
          </div>

          {/* Reasons List */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Decision Evidence & Forensic Explanation:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              {result.pipelineResult?.fusion?.reasons?.map((reason, i) => (
                <li key={i} className="leading-relaxed">{reason}</li>
              ))}
            </ul>
          </div>

          {/* Counterfactual AI Panel */}
          <CounterfactualCard
            observed={result.pipelineResult?.reading || { temperature: 55, pressure: 987.2, humidity: 96 }}
            expected={result.pipelineResult?.fusion?.expectedValues || { temperature: 31.8, pressure: 1003.2, humidity: 64.5 }}
            featureContributions={result.pipelineResult?.fusion?.featureContributions || { temperature: 87, pressure: 21, humidity: 11 }}
          />
        </div>
      )}
    </div>
  );
}
