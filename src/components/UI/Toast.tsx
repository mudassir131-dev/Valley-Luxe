import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, AlertTriangle, X } from 'lucide-react';

interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

// Global Helper to trigger toasts from anywhere in the app
export const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
  const event = new CustomEvent('valley-luxe-toast', {
    detail: { message, type }
  });
  window.dispatchEvent(event);
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; type: 'success' | 'info' | 'error' }>;
      const { message, type } = customEvent.detail;
      const id = Math.random().toString(36).substring(2, 9);
      
      setToasts((prev) => [...prev, { id, message, type }]);

      // Auto-remove toast after 4 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };

    window.addEventListener('valley-luxe-toast', handleToastEvent);
    return () => {
      window.removeEventListener('valley-luxe-toast', handleToastEvent);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-99999 flex flex-col gap-3 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = Info;
          let iconColor = 'text-saffron-gold';
          
          if (toast.type === 'success') {
            Icon = Check;
            iconColor = 'text-emerald-500';
          } else if (toast.type === 'error') {
            Icon = AlertTriangle;
            iconColor = 'text-red-500';
          }

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="pointer-events-auto flex items-center justify-between w-full p-4 glass-card-dark rounded border border-saffron-gold/30 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1 bg-kashmir-night rounded border border-saffron-gold/10 ${iconColor}`}>
                  <Icon size={18} />
                </div>
                <p className="font-ui text-xs tracking-wider text-ivory-cream font-medium">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-ivory-cream/40 hover:text-saffron-gold transition-colors ml-4 cursor-pointer"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
