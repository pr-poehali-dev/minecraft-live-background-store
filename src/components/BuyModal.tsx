import { useState } from 'react';
import { useTheme, THEMES } from '@/lib/ThemeContext';
import { Product } from '@/lib/themes';
import Icon from '@/components/ui/icon';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function BuyModal({ product, onClose }: Props) {
  const { active, addToCart } = useTheme();
  const T = THEMES[active];
  const ac = T.accent;
  const acSoft = T.accentSoft;
  const acBorder = T.accentBorder;
  const acGlow = T.accentGlow;
  const acText = T.accentText;

  const [selectedDur, setSelectedDur] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const hasDurations = product.type === 'privilege' && product.durations && product.durations.length > 0;
  const dur = hasDurations ? product.durations![selectedDur] : null;
  const finalPrice = Math.round(product.basePrice * (dur?.multiplier ?? 1));

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      emoji: product.emoji,
      price: finalPrice,
      durationLabel: dur ? dur.label : 'once',
      server: active,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 399,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
          animation: 'overlayIn 0.25s ease',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 400,
        width: 'min(480px, 95vw)',
        background: '#09090f',
        border: `1px solid ${acBorder}`,
        boxShadow: `0 0 80px ${acSoft}, 0 30px 80px rgba(0,0,0,0.8)`,
        animation: 'heroFadeUp 0.25s ease',
      }}>
        {/* Топ-лента цвета */}
        <div style={{ height: 3, background: ac, boxShadow: `0 0 15px ${acGlow}` }} />

        {/* Заголовок */}
        <div style={{ padding: '1.5rem 1.5rem 1rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{product.emoji}</div>
            <div>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>
                {product.name}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', fontFamily: 'Rajdhani', lineHeight: 1.4 }}>
                {product.desc}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, padding: 4 }}>
            <Icon name="X" size={18} style={{ color: 'rgba(255,255,255,0.4)' }} />
          </button>
        </div>

        <div style={{ padding: '0 1.5rem 1.5rem' }}>
          {/* Выбор срока (только для привилегий) */}
          {hasDurations && product.durations && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.62rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem' }}>
                СРОК ДЕЙСТВИЯ
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                {product.durations.map((d, i) => {
                  const price = Math.round(product.basePrice * d.multiplier);
                  const isSelected = selectedDur === i;
                  return (
                    <button
                      key={d.label}
                      onClick={() => setSelectedDur(i)}
                      style={{
                        padding: '0.8rem',
                        background: isSelected ? acSoft : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isSelected ? ac : 'rgba(255,255,255,0.1)'}`,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? `0 0 15px ${acSoft}` : 'none',
                      }}
                    >
                      <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.72rem', color: isSelected ? ac : '#fff', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                        {d.label}
                      </div>
                      <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1rem', fontWeight: 700, color: isSelected ? ac : 'rgba(255,255,255,0.6)', textShadow: isSelected ? `0 0 12px ${acGlow}` : 'none' }}>
                        {price} ₽
                      </div>
                      {d.multiplier >= 4 && (
                        <div style={{ fontSize: '0.62rem', color: acText, fontFamily: 'Rajdhani', marginTop: '0.1rem' }}>
                          Навсегда — выгоднее!
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Итого */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.9rem 1rem',
            background: acSoft, border: `1px solid ${acBorder}`,
            marginBottom: '1rem',
          }}>
            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.45)' }}>
              К ОПЛАТЕ
            </span>
            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.6rem', fontWeight: 900, color: ac, textShadow: `0 0 15px ${acGlow}` }}>
              {finalPrice} ₽
            </span>
          </div>

          {/* Кнопка */}
          <button
            onClick={handleAdd}
            style={{
              width: '100%', padding: '0.9rem',
              background: added ? '#00cc44' : ac,
              color: '#000',
              fontFamily: 'Orbitron, monospace', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em',
              border: 'none', cursor: 'pointer',
              clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
              boxShadow: `0 0 20px ${added ? 'rgba(0,200,70,0.5)' : acGlow}`,
              transition: 'all 0.25s',
            }}
          >
            {added ? '✓ ДОБАВЛЕНО В КОРЗИНУ' : 'ДОБАВИТЬ В КОРЗИНУ'}
          </button>
        </div>
      </div>
    </>
  );
}
