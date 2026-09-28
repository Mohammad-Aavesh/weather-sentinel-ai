import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radio,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Wrench,
  Activity,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  FlaskConical,
  ExternalLink
} from 'lucide-react';
import KpiCard from '../components/cards/KpiCard';
import WeatherMetricCard from '../components/cards/WeatherMetricCard';
import TrustScoreCard from '../components/cards/TrustScoreCard';
import StationMap from '../components/maps/StationMap';
import WeatherChart from '../components/charts/WeatherChart';
import SeverityBadge from '../components/alerts/SeverityBadge';
import StationStatusBadge from '../components/alerts/StationStatusBadge';
import { stationService, alertService, readingService, healthService } from '../services/api';
import { useSentinel } from '../context/SentinelContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { liveEvent } = useSentinel();

  const [stations, setStations] = useState([]);
  const [kpis, setKpis] = useState({
    total: 25,
    online: 24,
    offline: 1,
    normal: 22,
    anomalies: 2,
    quarantined: 1,
    maintenanceRequired: 3
  });
  const [alerts, setAlerts] = useState([]);
  const [readings, setReadings] = useState([]);
  const [primaryStation, setPrimaryStation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const [stRes, alRes, rdRes] = await Promise.all([
        stationService.getAll(),
        alertService.getAll({ limit: 6 }),
        readingService.getByStation('AWS-042', { limit: 15 })
      ]);

      if (stRes.data?.success) {
        setStations(stRes.data.data);
        if (stRes.data.kpis) setKpis(stRes.data.kpis);
        const aws042 = stRes.data.data.find(s => s.stationId === 'AWS-042');
        setPrimaryStation(aws042 || stRes.data.data[0]);
      }

      if (alRes.data?.success) {
        setAlerts(alRes.data.data);
      }

      if (rdRes.data?.success) {
        setReadings(rdRes.data.data);
      }
    } catch (err) {
      console.warn('Dashboard data fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update when real-time WebSocket event arrives
  useEffect(() => {
    if (liveEvent) {
      if (liveEvent.stationId === 'AWS-042' || !primaryStation) {
        setPrimaryStation(prev => ({
          ...prev,
          status: liveEvent.status,
          currentReadings: liveEvent.observation,
          trustScore: liveEvent.trustScore?.score || prev?.trustScore
        }));
        if (liveEvent.observation) {
          setReadings(prev => [...prev.slice(-14), {
            ...liveEvent.observation,
            expectedTemperature: liveEvent.fusion?.expectedValues?.temperature,
            expectedPressure: liveEvent.fusion?.expectedValues?.pressure,
            expectedHumidity: liveEvent.fusion?.expectedValues?.humidity,
            anomalyScore: liveEvent.fusion?.anomalyScore
          }]);
        }
      }
      if (liveEvent.alert) {
        setAlerts(prev => [liveEvent.alert, ...prev.slice(0, 5)]);
      }
    }
  }, [liveEvent]);

  const pReadings = primaryStation?.currentReadings || {
    temperature: 55.0,
    pressure: 987.2,
    humidity: 96.0
  };

  const isAWS042Anomalous = primaryStation?.status === 'anomaly' || primaryStation?.status === 'quarantined';

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <h2 className="text-sm font-bold text-slate-700 tracking-tight">Live Monitoring — 25 Stations</h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/simulator')}
            className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm shadow-blue-500/25 transition-all"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Anomaly Simulator</span>
          </button>
          <button
            onClick={fetchData}
            className="p-2 rounded-full bg-white hover:bg-blue-50 border border-slate-200 text-slate-500 hover:text-blue-600 transition-colors shadow-xs"
            title="Refresh Telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top KPI Cards (7 metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <KpiCard
          title="Total AWS"
          value={kpis.total}
          subtitle="Registered"
          icon={Radio}
          color="blue"
          onClick={() => navigate('/stations')}
        />
        <KpiCard
          title="Online"
          value={kpis.online}
          subtitle="96% Fresh"
          icon={CheckCircle2}
          color="green"
          onClick={() => navigate('/stations?status=online')}
        />
        <KpiCard
          title="Offline"
          value={kpis.offline}
          subtitle="1 Silenced"
          icon={Radio}
          color="slate"
          onClick={() => navigate('/stations?status=offline')}
        />
        <KpiCard
          title="Normal"
          value={kpis.normal}
          subtitle="Verified"
          icon={CheckCircle2}
          color="green"
          onClick={() => navigate('/stations?status=normal')}
        />
        <KpiCard
          title="Anomalies"
          value={kpis.anomalies}
          subtitle="Flagged"
          icon={AlertTriangle}
          color="red"
          onClick={() => navigate('/anomalies')}
        />
        <KpiCard
          title="Quarantined"
          value={kpis.quarantined}
          subtitle="Awaiting QC"
          icon={ShieldAlert}
          color="amber"
          onClick={() => navigate('/quarantine')}
        />
        <KpiCard
          title="Maintenance"
          value={kpis.maintenanceRequired}
          subtitle="Predicted"
          icon={Wrench}
          color="purple"
          onClick={() => navigate('/maintenance')}
        />
      </div>

      {/* Main Grid: AWS Map (Left) + Recent Alerts (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Map View (7 cols) */}
        <div className="lg:col-span-7 sentinel-card p-5 rounded-2xl flex flex-col border border-slate-100 hover:border-blue-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div>
              <h3 className="text-xs font-semibold text-slate-600">Station Network</h3>
            </div>
            <button
              onClick={() => navigate('/live-map')}
              className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100/80 text-xs font-semibold flex items-center space-x-1.5 transition-all border border-blue-200/80"
            >
              <span>Full Screen Map</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 min-h-[350px]">
            <StationMap stations={stations} height="100%" />
          </div>
        </div>

        {/* Right Recent Alerts (5 cols) */}
        <div className="lg:col-span-5 sentinel-card p-5 rounded-2xl flex flex-col border border-slate-100 hover:border-blue-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <h3 className="text-xs font-semibold text-slate-600">Alerts</h3>
            </div>
            <button
              onClick={() => navigate('/alerts')}
              className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100/80 text-xs font-semibold transition-all border border-blue-200/80"
            >
              View All ({alerts.length})
            </button>
          </div>

          <div className="flex-1 space-y-1.5 overflow-y-auto max-h-[360px] pr-1">
            {alerts.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">No active alerts recorded.</p>
            ) : (
              alerts.map((al) => (
                <div
                  key={al._id || al.id}
                  onClick={() => navigate(`/stations/${al.stationId}`)}
                  className="p-3 hover:bg-blue-50/40 rounded-2xl cursor-pointer transition-all border border-slate-100/60 hover:border-blue-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <SeverityBadge severity={al.severity} />
                      <span className="font-bold text-xs text-slate-800">{al.stationId}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {al.timestamp ? new Date(al.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 mt-1 truncate">{al.rootCause || al.type}</p>
                  <p className="text-[11px] text-slate-500 truncate">{al.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Featured Primary Demo Section: AWS-042 Real-Time Quality Control */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-xs font-semibold text-slate-600">
              <span className="text-blue-600 font-bold">{primaryStation?.stationId || 'AWS-042'}</span> — {primaryStation?.name || 'Chikkamagaluru Hill Station'}
            </h3>
            <StationStatusBadge status={primaryStation?.status || 'anomaly'} />
          </div>
          <button
            onClick={() => navigate(`/stations/${primaryStation?.stationId || 'AWS-042'}`)}
            className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100/80 border border-blue-200/80 text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-xs"
          >
            <span>Deep Forensic Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Weather Parameters Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <WeatherMetricCard
            parameter="temperature"
            value={pReadings.temperature}
            expected={31.8}
            isAnomaly={pReadings.temperature > 40}
            unit="°C"
          />
          <WeatherMetricCard
            parameter="pressure"
            value={pReadings.pressure}
            expected={1003.2}
            isAnomaly={pReadings.pressure < 990}
            unit="hPa"
          />
          <WeatherMetricCard
            parameter="humidity"
            value={pReadings.humidity}
            expected={64.5}
            isAnomaly={pReadings.humidity > 95 && pReadings.temperature > 45}
            unit="%"
          />
        </div>

        {/* Chart + Trust Score + Sensor Health Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Live Chart (8 cols) */}
          <div className="lg:col-span-8">
            <WeatherChart readings={readings} height={280} stationId={primaryStation?.stationId || 'AWS-042'} />
          </div>

          {/* Trust Score & Health Breakdown (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <TrustScoreCard
              score={primaryStation?.trustScore || 87}
              grade="A+"
              label="High Integrity"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
