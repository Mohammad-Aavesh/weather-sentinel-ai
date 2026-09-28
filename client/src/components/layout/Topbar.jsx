import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, FlaskConical, Clock, ChevronRight } from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';

export default function Topbar() {
  const navigate = useNavigate();
  const { recentAlerts } = useSentinel();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/stations?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const activeAlerts = recentAlerts.filter(a => a.status === 'ACTIVE');

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-6 flex-shrink-0 z-20">
      {/* Search Bar & Station Quickjump */}
      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Station ID, Location, Sensor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 text-xs bg-slate-50/80 border border-slate-200/90 rounded-full w-72 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
          />
        </form>

        <div className="hidden lg:flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-medium">Quick Access:</span>
          <button
            onClick={() => navigate('/stations/AWS-042')}
            className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100/80 font-semibold transition-all border border-blue-200/80 flex items-center space-x-1 shadow-xs"
          >
            <span>Primary Demo: AWS-042</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right Controls: Clocks, Simulator Trigger, Alerts */}
      <div className="flex items-center space-x-3">
        {/* UTC / Local Clock */}
        <div className="hidden sm:flex items-center space-x-2 text-[11px] text-slate-500 bg-slate-50/80 px-3 py-1.5 rounded-full border border-slate-200/80">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>UTC: {currentTime.toISOString().substring(11, 19)}</span>
          <span className="text-slate-300">|</span>
          <span className="font-semibold text-slate-700">IST: {currentTime.toLocaleTimeString()}</span>
        </div>

        {/* Quick Simulator Button */}
        <button
          onClick={() => navigate('/simulator')}
          className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm shadow-blue-500/25 transition-all"
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Launch Simulator</span>
        </button>

        {/* Alerts Bell */}
        <div className="relative">
          <button
            onClick={() => navigate('/alerts')}
            className="p-2 rounded-full hover:bg-blue-50 text-slate-500 hover:text-blue-600 relative transition-colors border border-transparent hover:border-blue-100"
            title="View Active Alerts"
          >
            <Bell className="w-4 h-4" />
            {activeAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
