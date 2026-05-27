import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, THEMES } from '@/lib/ThemeContext';
import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';

export default function Index() {
  const { active } = useTheme();
  const T = THEMES[active];
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const ac = T.accent;
  const acSoft = T.accentSoft;
  const acBorder = T.accentBorder;
  const acGlow = T.accentGlow;
  const acText = T.accentText;
  const cardStyle = { background: T.bgCard, borderColor: acBorder };

  const copyIp = () => {
    navigator.clipboard.writeText('mc.gamai.club');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      {/* ═══ HERO ══════════════════════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Левая */}
            <div style={{ animation: 'heroFadeUp 0.8s ease-out' }}>
              <div style={{
                display: 'inline-block',
                fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
                border: `1px solid ${acBorder}`, color: acText, background: acSoft,
                padding: '0.25rem 0.8rem', marginBottom: '1.5rem',
              }}>
                {T.emoji} MINECRAFT 1.21.11 — JAVA + BEDROCK
              </div>

              <h1 style={{
                fontFamily: 'Orbitron, monospace', fontWeight: 900,
                fontSize: 'clamp(2.2rem,5.5vw,4rem)', lineHeight: 1.05, marginBottom: '1.5rem',
              }}>
                <span style={{ color: '#fff', display: 'block' }}>GAMAI</span>
                <span style={{ color: ac, textShadow: `0 0 30px ${acGlow}, 0 0 60px ${acSoft}`, display: 'block' }}>
                  CLUB
                </span>
                <span style={{
                  display: 'block', fontSize: 'clamp(0.85rem,2vw,1.15rem)',
                  color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', marginTop: '0.5rem',
                }}>
                  {T.label} — {T.sublabel}
                </span>
              </h1>

              <p style={{
                color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', lineHeight: 1.65,
                marginBottom: '2.5rem', maxWidth: '460px', fontFamily: 'Rajdhani',
              }}>
                {T.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                <button
                  onClick={() => navigate('/store')}
                  style={{
                    fontFamily: 'Orbitron, monospace', fontSize: '0.78rem', letterSpacing: '0.1em',
                    fontWeight: 700, padding: '0.8rem 2rem', border: 'none', cursor: 'pointer',
                    color: '#000', background: ac, boxShadow: `0 0 20px ${acGlow}`,
                    clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
                    transition: 'all 0.22s',
                  }}
                >
                  Открыть магазин
                </button>
                <button
                  onClick={() => navigate('/rules')}
                  style={{
                    fontFamily: 'Orbitron, monospace', fontSize: '0.78rem', letterSpacing: '0.1em',
                    fontWeight: 600, padding: '0.8rem 2rem', background: 'transparent', cursor: 'pointer',
                    color: acText, border: `1px solid ${acBorder}`,
                    clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
                    transition: 'all 0.22s',
                  }}
                >
                  Правила
                </button>
              </div>

              {/* IP */}
              <div
                onClick={copyIp}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                  background: 'rgba(0,0,0,0.5)', border: `1px solid ${acBorder}`,
                  padding: '0.5rem 1.4rem', cursor: 'pointer',
                  fontFamily: 'Orbitron, monospace', fontSize: '0.88rem', letterSpacing: '0.1em', color: ac,
                  transition: 'all 0.2s',
                }}
              >
                <Icon name="Copy" size={13} style={{ opacity: 0.55 }} />
                <span>mc.gamai.club</span>
                {copied && <span style={{ color: '#fff', fontSize: '0.65rem', opacity: 0.8 }}>СКОПИРОВАНО!</span>}
              </div>
            </div>

            {/* Правая: карточки */}
            <div style={{ animation: 'heroFadeUp 0.8s ease-out 0.15s both', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Статы */}
              <div className="grid grid-cols-3 gap-3">
                {T.stats.map(s => (
                  <div key={s.label} style={{ ...cardStyle, border: `1px solid ${acBorder}`, padding: '1.2rem 0.75rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.8rem', fontWeight: 900, color: ac, textShadow: `0 0 15px ${acGlow}`, lineHeight: 1 }}>
                      {s.value}
                    </div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.54rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginTop: '0.3rem' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Большая карточка */}
              <div style={{
                ...cardStyle, border: `1px solid ${acBorder}`,
                padding: '2.5rem 2rem', textAlign: 'center',
                boxShadow: `0 0 60px ${acSoft}`,
                background: `radial-gradient(ellipse at center, ${acSoft} 0%, ${T.bgCard} 65%)`,
              }}>
                <div style={{ fontSize: '5rem', filter: `drop-shadow(0 0 25px ${acGlow})`, marginBottom: '1rem' }}>{T.emoji}</div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.5rem', fontWeight: 900, color: ac, textShadow: `0 0 20px ${acGlow}`, marginBottom: '0.4rem' }}>
                  GAMAI CLUB
                </div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Rajdhani', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                  {T.label} · {T.sublabel}
                </div>
                <div style={{
                  padding: '0.65rem 1rem',
                  background: 'rgba(0,0,0,0.4)', border: `1px solid ${acBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88', animation: 'dotPulse 2s infinite' }} />
                  <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#00ff88' }}>
                    {T.online} ОНЛАЙН
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ О СЕРВЕРЕ (краткий блок) ══════════════════════════════════ */}
      <section style={{ position: 'relative', zIndex: 10, padding: '5rem 0', borderTop: `1px solid ${acBorder}30` }}>
        <div className="container mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.4rem,3.5vw,2.2rem)', fontWeight: 900, color: '#fff' }}>
              ПОЧЕМУ <span style={{ color: ac, textShadow: `0 0 20px ${acGlow}` }}>GAMAI CLUB?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {T.about.map((item, i) => (
              <div
                key={item.title}
                style={{
                  ...cardStyle, border: `1px solid ${acBorder}`,
                  padding: '1.5rem', textAlign: 'center',
                  animation: `heroFadeUp 0.5s ease-out ${i * 0.1}s both`,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px rgba(0,0,0,0.5), 0 0 25px ${acSoft}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.72rem', letterSpacing: '0.1em', color: acText, marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', lineHeight: 1.5, fontFamily: 'Rajdhani' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', zIndex: 10, padding: '5rem 0', borderTop: `1px solid ${acBorder}30` }}>
        <div className="container mx-auto px-6 text-center">
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.4rem,3.5vw,2rem)', fontWeight: 900, color: '#fff', marginBottom: '0.75rem' }}>
            ГОТОВ НАЧАТЬ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Rajdhani', fontSize: '1.05rem', marginBottom: '2rem' }}>
            Подключайся к mc.gamai.club и присоединяйся к тысячам игроков прямо сейчас
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/store')}
              style={{
                fontFamily: 'Orbitron, monospace', fontSize: '0.8rem', letterSpacing: '0.1em',
                fontWeight: 700, padding: '0.9rem 2.5rem', border: 'none', cursor: 'pointer',
                color: '#000', background: ac, boxShadow: `0 0 25px ${acGlow}`,
                clipPath: 'polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)',
              }}
            >
              Перейти в магазин
            </button>
            <button
              onClick={() => navigate('/about')}
              style={{
                fontFamily: 'Orbitron, monospace', fontSize: '0.8rem', letterSpacing: '0.1em',
                fontWeight: 600, padding: '0.9rem 2.5rem', cursor: 'pointer',
                color: acText, background: 'transparent', border: `1px solid ${acBorder}`,
                clipPath: 'polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)',
              }}
            >
              О проекте
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
