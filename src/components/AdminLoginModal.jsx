import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, X, AlertCircle, Sparkles } from 'lucide-react';

export const AdminLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // User specified exact credentials:
      // user id = G1homedecor
      // password = G1@home
      if (userId.trim() === 'G1homedecor' && password === 'G1@home') {
        sessionStorage.setItem('gone_admin_auth', 'true');
        setUserId('');
        setPassword('');
        setError('');
        setLoading(false);
        onLoginSuccess();
      } else {
        setLoading(false);
        setError('Incorrect User ID or Password. Access denied.');
      }
    }, 300);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-[#171A1E] text-white rounded-3xl p-7 sm:p-8 border border-[#C5A059]/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Gold Glow in Background */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-[#FCF9F0]/10 border border-[#C5A059]/50 mb-3 text-[#E8D3A2]">
            <Lock className="w-6 h-6 text-[#C5A059]" />
          </div>
          <h3 className="font-['Cinzel'] font-bold text-xl sm:text-2xl text-white tracking-wide">
            Admin Authentication
          </h3>
          <p className="text-xs text-[#E8D3A2] tracking-wider uppercase font-semibold mt-1">
            G One Home Décors · Management
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* User ID Field */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5 font-['Cinzel']">
              User ID
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#212529] border border-gray-700 focus:border-[#C5A059] focus:outline-none text-white text-xs sm:text-sm placeholder-gray-500 transition-colors"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5 font-['Cinzel']">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-11 rounded-xl bg-[#212529] border border-gray-700 focus:border-[#C5A059] focus:outline-none text-white text-xs sm:text-sm placeholder-gray-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 mt-2 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#ECC872] via-[#C5A059] to-[#9A7B2C] text-[#121417] shadow-lg shadow-[#C5A059]/25 hover:shadow-xl hover:shadow-[#C5A059]/40 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? 'Verifying...' : 'Unlock Admin Dashboard'}</span>
          </button>
        </form>

        <p className="text-center text-[10px] text-gray-500 mt-5">
          Confidential access for G One Home Décors management only.
        </p>
      </div>
    </div>
  );
};