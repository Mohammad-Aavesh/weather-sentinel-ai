import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Radio, AlertTriangle, HeartPulse, User } from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';

export default function MobileNav() {
  const { recentAlerts } = useSentinel();
  const activeAlertsCount = recentAlerts.filter(a => a.status === 'ACTIVE').length;

  const tabs = [
    { to: '/dashboard', label: 'Home', icon: Home },
    { to: '/stations', label: 'Stations', icon: Radio },
    { to: '/alerts', label: 'Alerts', icon: AlertTriangle, badge: activeAlertsCount },
    { to: '/sensor-health', label: 'Health', icon: HeartPulse },
    { to: '/settings', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/80 z-50 flex items-center justify-around px-2 text-slate-500 shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) => `
              flex flex-col items-center justify-center flex-1 py-1 relative text-[10px] font-medium transition-colors
              ${isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-500 text-slate-500'}
            `}
          >
            <div className="relative">
              <Icon className="w-5 h-5 mb-0.5" />
              {tab.badge > 0 && (
                <span className="absolute -top-1 -right-2 px-1 text-[9px] font-bold rounded-full bg-red-500 text-white shadow-xs">
                  {tab.badge}
                </span>
              )}
            </div>
            <span>{tab.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
