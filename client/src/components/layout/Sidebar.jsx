import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Radio,
  MapPin,
  AlertTriangle,
  Activity,
  HeartPulse,
  ShieldAlert,
  Wrench,
  FileBarChart2,
  Cpu,
  FlaskConical,
  Settings,
  LogOut,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSentinel } from '../../context/SentinelContext';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/stations', label: 'Stations', icon: Radio },
  { to: '/live-map', label: 'Live Map', icon: MapPin },
  { to: '/alerts', label: 'Alerts', icon: AlertTriangle, badge: true },
  { to: '/anomalies', label: 'Anomaly Analysis', icon: Activity },
  { to: '/sensor-health', label: 'Sensor Health', icon: HeartPulse },
  { to: '/quarantine', label: 'Quarantine', icon: ShieldAlert },
  { to: '/maintenance', label: 'Maintenance', icon: Wrench },
  { to: '/reports', label: 'Reports', icon: FileBarChart2 },
  { to: '/model-performance', label: 'Model Performance', icon: Cpu },
  { to: '/simulator', label: 'Simulator', icon: FlaskConical, highlight: true },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { recentAlerts, isMobileMode, toggleMobileMode } = useSentinel();
  const navigate = useNavigate();

  const activeAlertsCount = recentAlerts.filter(a => a.status === 'ACTIVE').length;

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col flex-shrink-0 text-slate-600 select-none shadow-sm">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
            <Radio className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-none">
              Weather Sentinel <span className="text-blue-600">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">AWS Quality Control</p>
          </div>
        </div>
      </div>

      {/* Tagline Badge */}
      <div className="px-3 py-2">
        <div className="px-3 py-1.5 bg-blue-50/70 border border-blue-100/80 text-[10px] text-blue-700 font-medium rounded-full text-center">
          "Trustworthy Weather Data. Safer Decisions."
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center justify-between px-3.5 py-2 text-xs font-medium rounded-full transition-all duration-150
                ${isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/25'
                  : item.highlight
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/70 hover:bg-blue-100/70'
                    : 'text-slate-600 hover:bg-blue-50/60 hover:text-blue-600'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${item.highlight ? 'text-blue-600' : ''}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && activeAlertsCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white shadow-xs">
                  {activeAlertsCount}
                </span>
              )}
              {item.highlight && (
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-blue-200/60 text-blue-800">
                  Demo
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Mobile Device Simulator Toggle */}
      <div className="px-3 py-2 border-t border-slate-100">
        <button
          onClick={toggleMobileMode}
          className={`w-full flex items-center justify-between px-3.5 py-2 text-xs rounded-full border transition-all ${
            isMobileMode
              ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-xs'
              : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-blue-50/50 hover:text-blue-600 hover:border-blue-200'
          }`}
          title="Toggle Android/iOS Mobile Simulator View"
        >
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Mobile UI View</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
            isMobileMode ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
          }`}>
            {isMobileMode ? 'ON' : 'OFF'}
          </span>
        </button>
      </div>

      {/* System Status & User Section */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] text-slate-500 font-medium">Engine: Operational</span>
          </div>
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-blue-100/70 text-blue-700 border border-blue-200/60">
            {user?.role || 'OPERATOR'}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
          <div className="truncate pr-2">
            <p className="text-xs font-semibold text-slate-800 truncate">{user?.name || 'Operator'}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email || 'operator@weathersentinel.ai'}</p>
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
