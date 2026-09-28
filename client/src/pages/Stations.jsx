import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Radio, Search, Filter, ArrowRight, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import StationStatusBadge from '../components/alerts/StationStatusBadge';
import { stationService } from '../services/api';

export default function Stations() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get('status') || '';
  const initialSearch = searchParams.get('search') || '';

  const [stations, setStations] = useState([]);
  const [filterStatus, setFilterStatus] = useState(initialStatus);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    stationService.getAll({ status: filterStatus, search: searchTerm })
      .then(res => {
        if (res.data?.success) {
          setStations(res.data.data);
        }
      })
      .finally(() => setLoading(false));
  }, [filterStatus, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Automatic Weather Stations (AWS)</h2>
          <p className="text-xs text-slate-500 mt-0.5">Fleet inventory of 25 active meteorological telemetry units</p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search station or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs bg-white border border-slate-200/90 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 w-56 text-slate-800 placeholder:text-slate-400 transition-all shadow-xs"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-white border border-slate-200/90 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-slate-700 shadow-xs"
          >
            <option value="">All Statuses</option>
            <option value="normal">Normal</option>
            <option value="warning">Warning</option>
            <option value="anomaly">Anomaly</option>
            <option value="quarantined">Quarantined</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Stations Table */}
      <div className="sentinel-card rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3.5 px-4">Station ID</th>
                <th className="py-3.5 px-4">Station Name & Location</th>
                <th className="py-3.5 px-4">Coordinates / Elev</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Temp (°C)</th>
                <th className="py-3.5 px-4 text-center">Pressure (hPa)</th>
                <th className="py-3.5 px-4 text-center">Humidity (%)</th>
                <th className="py-3.5 px-4 text-center">Trust Score</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stations.map((st) => {
                const r = st.currentReadings || {};
                const isAnomaly = st.status === 'anomaly';

                return (
                  <tr
                    key={st.stationId || st._id}
                    className={`hover:bg-blue-50/30 transition-colors cursor-pointer ${
                      isAnomaly ? 'bg-red-50/20' : ''
                    }`}
                    onClick={() => navigate(`/stations/${st.stationId}`)}
                  >
                    <td className="py-3 px-4 font-bold text-blue-700">{st.stationId}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{st.name}</div>
                      <div className="text-[11px] text-slate-400">{st.location}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <div>{st.latitude?.toFixed(2)}°N, {st.longitude?.toFixed(2)}°E</div>
                      <div className="text-[10px] text-slate-400">{st.elevation} m MSL</div>
                    </td>
                    <td className="py-3 px-4">
                      <StationStatusBadge status={st.status} />
                    </td>
                    <td className={`py-3 px-4 text-center font-bold ${isAnomaly && r.temperature > 45 ? 'text-red-600' : 'text-slate-800'}`}>
                      {r.temperature !== undefined ? `${Number(r.temperature).toFixed(1)}°C` : '--'}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-800">
                      {r.pressure !== undefined ? Number(r.pressure).toFixed(1) : '--'}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-800">
                      {r.humidity !== undefined ? `${Number(r.humidity).toFixed(0)}%` : '--'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80">
                        {st.trustScore || 85}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/stations/${st.stationId}`);
                        }}
                        className="px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-semibold flex items-center space-x-1 ml-auto transition-all shadow-xs border border-blue-200/60"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
