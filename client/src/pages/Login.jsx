import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  // Demo user fast-fill
  const fillDemoUser = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50/70 via-white to-sky-50/50 px-4 relative overflow-hidden">
      {/* Background Subtle Radar / Grid glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

      <div className="max-w-md w-full bg-white border border-blue-100 rounded-3xl shadow-xl shadow-blue-500/5 p-8 relative z-10 text-slate-800">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center mx-auto mb-3">
            <Radio className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Weather Sentinel AI</h1>
          <p className="text-xs text-blue-600 font-semibold tracking-wider uppercase mt-1">
            AWS Quality Control & Anomaly Detection
          </p>
          <div className="mt-2 inline-block px-3 py-1 bg-blue-50 text-[11px] text-blue-700 font-medium rounded-full border border-blue-100/70">
            "Trustworthy Weather Data. Safer Decisions."
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">Meteorological ID / Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@weathersentinel.ai"
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50/80 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:bg-white text-slate-800 placeholder:text-slate-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">Access Credential / Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50/80 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:bg-white text-slate-800 placeholder:text-slate-400 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 mt-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Command Center'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* One-Click Demo Credentials */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5 text-center">
            One-Click Evaluator Accounts (Demo Mode)
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => fillDemoUser('operator@weathersentinel.ai', 'Operator@123')}
              className="p-2.5 rounded-2xl bg-slate-50/80 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 text-left transition-all"
            >
              <span className="font-bold text-blue-700 block text-[11px]">Duty Operator</span>
              <span className="text-[10px] text-slate-400 block truncate">operator@weathersentinel.ai</span>
            </button>

            <button
              type="button"
              onClick={() => fillDemoUser('admin@weathersentinel.ai', 'Admin@123')}
              className="p-2.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-200 text-left transition-all"
            >
              <span className="font-bold text-emerald-700 block text-[11px]">Administrator</span>
              <span className="text-[10px] text-slate-400 block truncate">admin@weathersentinel.ai</span>
            </button>

            <button
              type="button"
              onClick={() => fillDemoUser('engineer@weathersentinel.ai', 'Engineer@123')}
              className="p-2.5 rounded-2xl bg-slate-50/80 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-200 text-left transition-all"
            >
              <span className="font-bold text-amber-700 block text-[11px]">Field Engineer</span>
              <span className="text-[10px] text-slate-400 block truncate">engineer@weathersentinel.ai</span>
            </button>

            <button
              type="button"
              onClick={() => fillDemoUser('viewer@weathersentinel.ai', 'Viewer@123')}
              className="p-2.5 rounded-2xl bg-slate-50/80 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 text-left transition-all"
            >
              <span className="font-bold text-slate-700 block text-[11px]">Viewer / Forecaster</span>
              <span className="text-[10px] text-slate-400 block truncate">viewer@weathersentinel.ai</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
