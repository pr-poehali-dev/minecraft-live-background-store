import { useTheme, THEMES } from '@/lib/ThemeContext';
import Icon from '@/components/ui/icon';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { cart, removeFromCart, clearCart, active } = useTheme();
  const T = THEMES[active];
  const ac = T.accent;
  const acSoft = T.accentSoft;
  const acBorder = T.accentBorder;
  const acGlow = T.accentGlow;
  const acText = T.accentText;

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 299,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.3s',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(420px, 96vw)',
        background: '#07080f',
        borderLeft: `1px solid ${acBorder}`,
        boxShadow: `-20px 0 60px rgba(0,0,0,0.7), 0 0 40px ${acSoft}`,
        zIndex: 300,
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(.4,0,.2,1)',
      }}>

        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: `1px solid ${acBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Icon name="ShoppingCart" size={18} style={{ color: acText }} />
            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.88rem', letterSpacing: '0.1em', color: '#fff' }}>
              КОРЗИНА
            </span>
            {cart.length > 0 && (
              <span style={{
                background: acSoft, border: `1px solid ${acBorder}`, color: acText,
                fontSize: '0.6rem', fontFamily: 'Orbitron, monospace', padding: '0.1rem 0.5rem',
              }}>
                {cart.reduce((s, c) => s + c.qty, 0)} позиции
              </span>
            )}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <Icon name="X" size={18} style={{ color: 'rgba(255,255,255,0.5)' }} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {cart.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', opacity: 0.4, paddingTop: '4rem' }}>
              <Icon name="ShoppingCart" size={48} style={{ color: acText }} />
              <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', letterSpacing: '0.15em', color: '#fff' }}>
                КОРЗИНА ПУСТА
              </span>
            </div>
          ) : cart.map((item, idx) => (
            <div key={idx} style={{
              background: T.bgCard, border: `1px solid ${acBorder}`,
              padding: '0.9rem 1rem',
              display: 'flex', alignItems: 'center', gap: '0.9rem',
            }}>
              <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>{item.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', color: '#fff', marginBottom: '0.2rem', letterSpacing: '0.04em' }}>
                  {item.name}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  {item.durationLabel !== 'once' && (
                    <span style={{ fontSize: '0.7rem', color: acText, background: acSoft, padding: '0.1rem 0.4rem', border: `1px solid ${acBorder}` }}>
                      {item.durationLabel}
                    </span>
                  )}
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'Rajdhani' }}>
                    ×{item.qty}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.9rem', fontWeight: 700, color: ac, textShadow: `0 0 10px ${acGlow}` }}>
                  {(item.price * item.qty).toFixed(0)} ₽
                </span>
                <button
                  onClick={() => removeFromCart(idx)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
                >
                  <Icon name="Trash2" size={13} style={{ color: 'rgba(255,100,100,0.6)' }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '1.25rem 1.5rem', borderTop: `1px solid ${acBorder}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                ИТОГО
              </span>
              <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.4rem', fontWeight: 900, color: ac, textShadow: `0 0 15px ${acGlow}` }}>
                {total.toFixed(0)} ₽
              </span>
            </div>
            <button style={{
              width: '100%', padding: '0.85rem',
              background: ac, color: '#000',
              fontFamily: 'Orbitron, monospace', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em',
              border: 'none', cursor: 'pointer',
              clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
              boxShadow: `0 0 20px ${acGlow}`,
              transition: 'all 0.2s',
            }}>
              ОФОРМИТЬ ЗАКАЗ
            </button>
            <button
              onClick={clearCart}
              style={{
                width: '100%', marginTop: '0.6rem', padding: '0.5rem',
                background: 'none', border: `1px solid rgba(255,100,100,0.25)`,
                color: 'rgba(255,100,100,0.5)', cursor: 'pointer',
                fontFamily: 'Orbitron, monospace', fontSize: '0.62rem', letterSpacing: '0.1em',
              }}
            >
              ОЧИСТИТЬ КОРЗИНУ
            </button>
          </div>
        )}
      </div>
    </>
  );
}
