import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { ThemeKey, THEMES, SWITCH_INTERVAL } from './themes';

export interface CartItem {
  productId: number;
  name: string;
  emoji: string;
  price: number;
  durationLabel: string;
  qty: number;
  server: ThemeKey;
}

interface ThemeContextValue {
  selected: ThemeKey | null;
  active: ThemeKey;
  timerPct: number;
  transitioning: boolean;
  cart: CartItem[];
  chooseServer: (key: ThemeKey) => void;
  resetSelection: () => void;
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (idx: number) => void;
  clearCart: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<ThemeKey | null>(null);
  const [active, setActive] = useState<ThemeKey>('anarchy');
  const [timerPct, setTimerPct] = useState(100);
  const [transitioning, setTransitioning] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const switchTheme = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setActive(prev => (prev === 'anarchy' ? 'classic' : 'anarchy'));
      setTransitioning(false);
      setTimerPct(100);
    }, 600);
  }, []);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (tickRef.current) clearInterval(tickRef.current);
    if (selected) return;
    setTimerPct(100);
    timerRef.current = setInterval(switchTheme, SWITCH_INTERVAL);
    const step = 100 / (SWITCH_INTERVAL / 100);
    tickRef.current = setInterval(() => setTimerPct(p => Math.max(0, p - step)), 100);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [selected, switchTheme, active]);

  const chooseServer = (key: ThemeKey) => {
    setSelected(key);
    setActive(key);
  };

  const resetSelection = () => setSelected(null);

  const addToCart = (item: Omit<CartItem, 'qty'>) => {
    setCart(prev => {
      const idx = prev.findIndex(c => c.productId === item.productId && c.durationLabel === item.durationLabel && c.server === item.server);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (idx: number) => setCart(prev => prev.filter((_, i) => i !== idx));
  const clearCart = () => setCart([]);

  return (
    <ThemeContext.Provider value={{ selected, active, timerPct, transitioning, cart, chooseServer, resetSelection, addToCart, removeFromCart, clearCart }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}

export { THEMES };
