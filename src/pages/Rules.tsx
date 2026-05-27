import { useState } from 'react';
import { useTheme, THEMES } from '@/lib/ThemeContext';
import Layout from '@/components/Layout';

export default function Rules() {
  const { active } = useTheme();
  const T = THEMES[active];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const ac = T.accent;
  const acSoft = T.accentSoft;
  const acBorder = T.accentBorder;
  const acGlow = T.accentGlow;
  const acText = T.accentText;

  return (
    <Layout>
      <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <div className="container mx-auto px-6 py-14" style={{ maxWidth: 860 }}>

          {/* Заголовок */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-block',
              fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
              border: `1px solid ${acBorder}`, color: acText, background: acSoft,
              padding: '0.25rem 0.8rem', marginBottom: '1rem',
            }}>
              📋 ОБЯЗАТЕЛЬНО К ПРОЧТЕНИЮ
            </div>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.6rem,4vw,2.5rem)', fontWeight: 900, color: '#fff', marginBottom: '0.75rem' }}>
              ПРАВИЛА <span style={{ color: ac, textShadow: `0 0 20px ${acGlow}` }}>СЕРВЕРА</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Rajdhani', fontSize: '1rem', lineHeight: 1.6, maxWidth: 620 }}>
              Нарушение правил влечёт наказание вплоть до постоянной блокировки. Незнание правил не освобождает от ответственности.
            </p>
          </div>

          {/* Предупреждение */}
          <div style={{
            padding: '1rem 1.25rem',
            background: `rgba(255,180,0,0.07)`,
            border: `1px solid rgba(255,180,0,0.3)`,
            marginBottom: '2rem',
            display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>⚠️</span>
            <p style={{ color: 'rgba(255,220,100,0.8)', fontFamily: 'Rajdhani', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Правила распространяются на все режимы сервера <strong>Gamai Club</strong> (mc.gamai.club). Администрация оставляет за собой право изменять правила без предупреждения.
            </p>
          </div>

          {/* Аккордеон с правилами */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {T.rules.map((section, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={section.title}
                  style={{
                    background: T.bgCard,
                    border: `1px solid ${isOpen ? ac : acBorder}`,
                    overflow: 'hidden',
                    transition: 'border-color 0.3s',
                    boxShadow: isOpen ? `0 0 20px ${acSoft}` : 'none',
                    animation: `heroFadeUp 0.4s ease-out ${i * 0.08}s both`,
                  }}
                >
                  {/* Заголовок секции */}
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    style={{
                      width: '100%', padding: '1.1rem 1.25rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                      gap: '1rem',
                    }}
                  >
                    <span style={{
                      fontFamily: 'Orbitron, monospace', fontSize: '0.8rem', fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: isOpen ? ac : '#fff',
                      textShadow: isOpen ? `0 0 12px ${acGlow}` : 'none',
                      transition: 'color 0.3s',
                    }}>
                      {section.title}
                    </span>
                    <span style={{
                      fontSize: '0.8rem', color: acText, flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s',
                      display: 'inline-block',
                    }}>
                      ▼
                    </span>
                  </button>

                  {/* Список правил */}
                  <div style={{
                    maxHeight: isOpen ? '600px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease',
                  }}>
                    <div style={{
                      padding: '0 1.25rem 1.25rem',
                      borderTop: `1px solid ${acBorder}`,
                    }}>
                      {section.items.map((rule, ri) => (
                        <div
                          key={ri}
                          style={{
                            display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                            padding: '0.7rem 0',
                            borderBottom: ri < section.items.length - 1 ? `1px solid ${acBorder}30` : 'none',
                          }}
                        >
                          <div style={{
                            width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                            background: acSoft, border: `1px solid ${acBorder}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'Orbitron, monospace', fontSize: '0.55rem', color: acText,
                            marginTop: 1,
                          }}>
                            {ri + 1}
                          </div>
                          <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Rajdhani', fontSize: '1rem', lineHeight: 1.5 }}>
                            {rule}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Нижний блок */}
          <div style={{
            marginTop: '2.5rem', padding: '1.5rem',
            background: acSoft, border: `1px solid ${acBorder}`,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚖️</div>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: acText, marginBottom: '0.4rem' }}>
              ВОПРОСЫ ПО ПРАВИЛАМ?
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Rajdhani', fontSize: '0.95rem' }}>
              Обратись к администрации в Discord или Telegram — ответим быстро.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
