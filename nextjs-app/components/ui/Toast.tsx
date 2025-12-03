'use client';

import React from 'react';
import { toast } from 'react-hot-toast';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  React.useEffect(() => {
    const showToast = () => {
      const bgColor =
        type === 'success'
          ? 'bg-green-500'
          : type === 'error'
          ? 'bg-red-500'
          : 'bg-blue-500';

      const icon =
        type === 'success'
          ? '✓'
          : type === 'error'
          ? '✕'
          : 'ℹ';

      toast((t) => (
        <div
          className={`flex items-center gap-2 px-4 py-3 rounded-lg text-white ${bgColor}`}
          onClick={() => {
            toast.dismiss(t.id);
            onClose?.();
          }}
        >
          <span className="text-lg font-bold">{icon}</span>
          <span>{message}</span>
        </div>
      ), { duration });
    };

    showToast();
  }, [message, type, duration, onClose]);

  return null;
};

export default Toast;
