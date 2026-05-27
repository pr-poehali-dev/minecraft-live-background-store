import { useState } from 'react';
import { useTheme, THEMES } from '@/lib/ThemeContext';
import { Product } from '@/lib/themes';
import Layout from '@/components/Layout';
import BuyModal from '@/components/BuyModal';

const FILTERS = ['Все', 'Предметы', 'Привилегии', 'Валюта'] as const;
type Filter = typeof FILTERS[number];

export default function Store() {
  const { active } = useTheme();
  const T = THEMES[active];
  const [buyProduct, setBuyProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<Filter>('Все');

  const ac = T.accent;
  const acSoft = T.accentSoft;
  const acBorder = T.accentBorder;
  const acGlow = T.accentGlow;
  const acText = T.accentText;
  const cardStyle = { background: T.bgCard, borderColor: acBorder };

  const filterMap: Record<Filter, string | null> = {
    'Все': null,
    'Предметы': 'item',
    'Привилегии': 'privilege',
    'Валюта': 'currency',
  };

  const filtered = filter === 'Все'
    ? T.products
    : T.products.filter(p => p.type === filterMap[filter]);

  return (
    <Layout>
      <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <div className="container mx-auto px-6 py-14">

          {/* Заголовок */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-block',
              fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
              border: `1px solid ${acBorder}`, color: acText, background: acSoft,
              padding: '0.25rem 0.8rem', marginBottom: '1rem',
            }}>
              🛒 МАГАЗИН СЕРВЕРА
            </div>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.6rem,4vw,2.5rem)', fontWeight: 900, color: '#fff' }}>
              МАГАЗИН <span style={{ color: ac, textShadow: `0 0 20px ${acGlow}` }}>GAMAI CLUB</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Rajdhani', fontSize: '1rem', marginTop: '0.5rem' }}>
              Улучши игровой опыт — покупки мгновенно активируются на сервере
            </p>
          </div>

          {/* Фильтры */}
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {FILTERS.map(f => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', letterSpacing: '0.12em',
                    padding: '0.4rem 1rem',
                    background: isActive ? ac : acSoft,
                    border: `1px solid ${isActive ? ac : acBorder}`,
                    color: isActive ? '#000' : acText,
                    cursor: 'pointer',
                    boxShadow: isActive ? `0 0 15px ${acGlow}` : 'none',
                    transition: 'all 0.2s',
                    fontWeight: isActive ? 700 : 400,
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Товары */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                style={{
                  ...cardStyle,
                  border: `1px solid ${acBorder}`,
                  padding: '1.5rem',
                  position: 'relative', overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  animation: `heroFadeUp 0.45s ease-out ${i * 0.07}s both`,
                  transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px rgba(0,0,0,0.5), 0 0 25px ${acSoft}`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${ac}80`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.borderColor = acBorder;
                }}
              >
                {/* Топ-линия при наведении */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${ac}, transparent)`,
                  opacity: 0.6,
                }} />

                {p.tag && (
                  <div style={{
                    display: 'inline-block',
                    fontFamily: 'Orbitron, monospace', fontSize: '0.56rem', letterSpacing: '0.15em',
                    padding: '0.18rem 0.55rem', marginBottom: '0.7rem',
                    background: acSoft, border: `1px solid ${acBorder}`, color: acText,
                  }}>
                    ★ {p.tag}
                  </div>
                )}

                <div style={{ fontSize: '2.4rem', marginBottom: '0.6rem' }}>{p.emoji}</div>

                <h3 style={{
                  fontFamily: 'Orbitron, monospace', fontSize: '0.85rem', fontWeight: 700,
                  color: '#fff', marginBottom: '0.4rem', letterSpacing: '0.04em',
                }}>
                  {p.name}
                </h3>

                <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.88rem', lineHeight: 1.5, fontFamily: 'Rajdhani', flex: 1, marginBottom: '1.25rem' }}>
                  {p.desc}
                </p>

                {p.type === 'privilege' && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    fontFamily: 'Rajdhani', fontSize: '0.8rem', color: acText,
                    marginBottom: '1rem',
                  }}>
                    <span>🕒</span>
                    <span>Выбор срока: 30 / 60 / 90 дней / навсегда</span>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.35rem', fontWeight: 900, color: ac, textShadow: `0 0 12px ${acGlow}` }}>
                    от {p.basePrice} ₽
                  </span>
                  <button
                    onClick={() => setBuyProduct(p)}
                    style={{
                      fontFamily: 'Orbitron, monospace', fontSize: '0.68rem', letterSpacing: '0.08em',
                      fontWeight: 700, padding: '0.5rem 1.2rem', border: 'none', cursor: 'pointer',
                      color: '#000', background: ac, boxShadow: `0 0 12px ${acGlow}`,
                      clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
                      transition: 'all 0.2s',
                    }}
                  >
                    Купить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Модалка покупки */}
      {buyProduct && (
        <BuyModal product={buyProduct} onClose={() => setBuyProduct(null)} />
      )}
    </Layout>
  );
}
