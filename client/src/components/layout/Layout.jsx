import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';
import { useSentinel } from '../../context/SentinelContext';
import { X, ShieldAlert, Smartphone, Radio } from 'lucide-react';

export default function Layout() {
  const { toast, dismissToast, isMobileMode, toggleMobileMode } = useSentinel();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50/60">
      {/* Toast Alert Banner */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 max-w-md w-full bg-white border border-orange-200/90 shadow-2xl rounded-2xl p-4 text-slate-800 flex items-start space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center flex-shrink-0 text-orange-500 mt-0.5">
            <ShieldAlert className="w-5 h-5 text-orange-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-orange-600">{toast.title}</h4>
            <p className="text-xs text-slate-600 mt-0.5">{toast.message}</p>
          </div>
          <button onClick={dismissToast} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* When Mobile Mode is toggled on a desktop, render an iPhone/Android simulation canvas */}
      {isMobileMode ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-100/80 p-4 overflow-y-auto relative w-full h-full">
          {/* Top Banner to exit simulator */}
          <div className="absolute top-4 left-6 right-6 flex items-center justify-between text-xs text-slate-700 bg-white/95 px-5 py-2.5 rounded-full border border-slate-200/80 shadow-sm backdrop-blur-md">
            <div className="flex items-center space-x-2.5">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-slate-800">Weather Sentinel Mobile UI Simulator</span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">— Interactive native mobile experience</span>
            </div>
            <button
              onClick={toggleMobileMode}
              className="px-4 py-1.5 text-xs font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-all"
            >
              Back to Command Center
            </button>
          </div>

          {/* Smartphone Frame */}
          <div className="w-[390px] h-[800px] bg-slate-900 border-[8px] border-slate-300 rounded-[48px] shadow-2xl overflow-hidden flex flex-col relative mt-12 ring-1 ring-slate-900/10">
            {/* Speaker & Camera Notch */}
            <div className="w-36 h-5 bg-slate-950 rounded-b-2xl mx-auto flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-800 mr-2"></div>
              <div className="w-10 h-1 bg-slate-700 rounded-full"></div>
            </div>

            {/* Mobile Status Bar */}
            <div className="px-6 py-1 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>09:41</span>
              <div className="flex items-center space-x-1.5 text-[10px]">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Screen Content */}
            <div className="flex-1 overflow-y-auto pb-16 bg-slate-50">
              <Outlet />
            </div>

            {/* Mobile Bottom Navigation */}
            <MobileNav />
          </div>
        </div>
      ) : (
        /* Full Desktop Command Center Layout */
        <>
          {/* Desktop Left Sidebar */}
          <div className="hidden md:flex flex-shrink-0 h-full">
            <Sidebar />
          </div>

          {/* Right Main Stage */}
          <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
            {/* Blue Title Header */}
            <div className="bg-blue-600 px-6 py-2.5 flex items-center space-x-3 flex-shrink-0 shadow-sm">
              <Radio className="w-4 h-4 text-blue-200 flex-shrink-0" />
              <h1 className="text-sm font-bold text-white tracking-wide">Weather Sentinel AI</h1>
              <span className="text-blue-300 text-[10px] font-medium hidden sm:inline">— Trustworthy Weather Data. Safer Decisions.</span>
              <span className="ml-auto flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] text-blue-200 font-medium">Live</span>
              </span>
            </div>
            <Topbar />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
              <Outlet />
            </main>
          </div>

          {/* On native small screen mobile devices (<768px), display bottom navigation */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </>
      )}
    </div>
  );
}
