'use client';

import React from 'react';
import { toast } from 'react-hot-toast';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
  duration?: number;
}

export const showToast = ({
  message,
  type = 'success',
  onClose,
  duration = 4000,
}: ToastProps) => {
  const bgColor =
    type === 'success'
      ? 'bg-green-600'
      : type === 'error'
      ? 'bg-red-600'
      : 'bg-blue-600';

  const icon =
    type === 'success'
      ? <CheckCircle size={20} />
      : type === 'error'
      ? <XCircle size={20} />
      : <Info size={20} />;

  toast((t) => (
    <div
      onClick={() => {
        toast.dismiss(t.id);
        onClose?.();
      }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-white shadow-2xl cursor-pointer ${bgColor} animate-in fade-in slide-in-from-bottom-4 duration-300`}
    >
      {icon}
      <span className="font-medium">{message}</span>
    </div>
  ), { duration });
};
