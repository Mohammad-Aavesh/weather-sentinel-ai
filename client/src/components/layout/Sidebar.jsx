import React, { useState } from 'react';
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
  const [expanded, setExpanded] = useState(false);

  const activeAlertsCount = recentAlerts.filter(a => a.status === 'ACTIVE').length;

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{ width: expanded ? '240px' : '64px' }}
      className="relative bg-white border-r border-slate-200/80 flex flex-col flex-shrink-0 text-slate-600 select-none shadow-sm overflow-hidden transition-all duration-300 ease-in-out"
    >
      {/* Brand Header */}
      <div
        className="flex items-center px-3 py-3.5 border-b border-slate-100 cursor-pointer flex-shrink-0 overflow-hidden"
        onClick={() => navigate('/dashboard')}
        title="Weather Sentinel AI"
      >
        {/* Icon — always visible */}
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 flex-shrink-0">
          <Radio className="w-4.5 h-4.5 text-white" style={{ width: '18px', height: '18px' }} />
        </div>

        {/* Brand text — fades in when expanded */}
        <div
          className="ml-3 overflow-hidden transition-all duration-300"
          style={{ opacity: expanded ? 1 : 0, width: expanded ? '160px' : '0px' }}
        >
          <h1 className="text-sm font-bold text-slate-800 tracking-tight leading-none whitespace-nowrap">
            Weather Sentinel <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-[10px] text-slate-400 mt-0.5 font-medium whitespace-nowrap">AWS Quality Control</p>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              title={!expanded ? item.label : undefined}
              className={({ isActive }) => `
                flex items-center py-2 text-xs font-medium rounded-full transition-all duration-150 overflow-hidden
                ${expanded ? 'px-3' : 'px-0 justify-center'}
                ${isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/25'
                  : item.highlight
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/70 hover:bg-blue-100/70'
                    : 'text-slate-600 hover:bg-blue-50/60 hover:text-blue-600'
                }
              `}
            >
              {/* Icon — always visible, centered when collapsed */}
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-5">
                <Icon className={`w-4 h-4 ${item.highlight ? 'text-blue-600' : ''}`} />
              </span>

              {/* Label + badges — slide in when expanded */}
              <span
                className="flex items-center justify-between flex-1 overflow-hidden transition-all duration-300"
                style={{ opacity: expanded ? 1 : 0, maxWidth: expanded ? '180px' : '0px' }}
              >
                <span className="whitespace-nowrap ml-1">{item.label}</span>
                <span className="flex items-center space-x-1 ml-1">
                  {item.badge && activeAlertsCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-orange-500 text-white">
                      {activeAlertsCount}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-full bg-blue-200/60 text-blue-800">
                      Demo
                    </span>
                  )}
                </span>
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Mobile Simulator Toggle */}
      <div className="px-2 py-2 border-t border-slate-100 flex-shrink-0">
        <button
          onClick={toggleMobileMode}
          title={!expanded ? 'Mobile UI View' : undefined}
          className={`w-full flex items-center py-2 rounded-full border transition-all overflow-hidden
            ${expanded ? 'px-3 justify-between' : 'px-0 justify-center'}
            ${isMobileMode
              ? 'bg-blue-50 border-blue-300 text-blue-700'
              : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-blue-50/50 hover:text-blue-600 hover:border-blue-200'
            }`}
        >
          <span className="flex items-center space-x-0">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-5">
              <Smartphone className="w-4 h-4 text-blue-600" />
            </span>
            <span
              className="text-xs font-medium whitespace-nowrap overflow-hidden transition-all duration-300"
              style={{ opacity: expanded ? 1 : 0, maxWidth: expanded ? '120px' : '0px' }}
            >
              Mobile UI View
            </span>
          </span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase flex-shrink-0 overflow-hidden transition-all duration-300
              ${isMobileMode ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}
            style={{ opacity: expanded ? 1 : 0, maxWidth: expanded ? '40px' : '0px' }}
          >
            {isMobileMode ? 'ON' : 'OFF'}
          </span>
        </button>
      </div>

      {/* User Section */}
      <div className="p-2 border-t border-slate-100 bg-slate-50/60 flex-shrink-0">
        <div
          className="flex items-center overflow-hidden"
          style={{ justifyContent: expanded ? 'space-between' : 'center' }}
        >
          {/* Avatar / Status dot */}
          <div className="flex items-center space-x-2 overflow-hidden flex-shrink-0">
            <span
              title={!expanded ? (user?.name || 'Operator') : undefined}
              className="w-7 h-7 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-700"
            >
              {(user?.name || 'O')[0].toUpperCase()}
            </span>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ opacity: expanded ? 1 : 0, maxWidth: expanded ? '130px' : '0px' }}
            >
              <p className="text-xs font-semibold text-slate-700 truncate whitespace-nowrap">{user?.name || 'Operator'}</p>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                <span className="text-[9px] text-slate-400 whitespace-nowrap">Online</span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0 ml-1"
            title="Log out"
            style={{ opacity: expanded ? 1 : 0, pointerEvents: expanded ? 'auto' : 'none' }}
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
