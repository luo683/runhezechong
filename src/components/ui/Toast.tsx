import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastData { id: number; message: string; }

const ToastContext = createContext<{ toast: (msg: string) => void }>({ toast: () => {} });

export function useToast() { return useContext(ToastContext); }

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="flex items-center gap-2 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 animate-[slideIn_0.3s_ease-out]">
            <CheckCircle size={16} className="text-green-500" />
            <span className="text-sm">{t.message}</span>
            <button onClick={() => setToasts((l) => l.filter((x) => x.id !== t.id))} className="ml-2 text-gray-400 hover:text-gray-600"><X size={14} /></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
