import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  const bgStyles = {
    success: 'bg-[#121417] text-white border-[#25D366]/60',
    error: 'bg-red-950 text-white border-red-500/60',
    info: 'bg-[#121417] text-white border-[#C5A059]/60'
  }[type] || 'bg-[#121417] text-white border-[#C5A059]/60';

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#25D366] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#C5A059] shrink-0" />
  }[type];

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm">
      <div className={`flex items-start gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-md ${bgStyles}`}>
        {icons}
        <div className="text-xs sm:text-sm font-medium pr-2">
          {message}
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white shrink-0 -mt-1 -mr-1 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
