import { useTheme, THEMES } from '@/lib/ThemeContext';

export default function ServerSelectOverlay() {
  const { active, timerPct, chooseServer } = useTheme();

  return (
    <div className="server-select-overlay">
      <div style={{ textAlign: 'center', maxWidth: 740, width: '100%', padding: '0 1.5rem' }}>
        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.35)', marginBottom: '0.6rem' }}>
          GAMAI CLUB — MINECRAFT 1.21.11
        </div>
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(1.4rem,4vw,2.6rem)', color: '#fff', marginBottom: '0.4rem', lineHeight: 1.1 }}>
          ВЫБЕРИ СЕРВЕР
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', marginBottom: '2.5rem', fontFamily: 'Rajdhani' }}>
          Автосмена каждые 10 секунд — нажми чтобы зафиксировать
        </p>

        {/* Таймер */}
        <div style={{ width: 180, height: 2, background: 'rgba(255,255,255,0.08)', margin: '0 auto 2.5rem', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${timerPct}%`,
            background: active === 'anarchy' ? THEMES.anarchy.accent : THEMES.classic.accent,
            transition: 'width 0.12s linear',
            boxShadow: active === 'anarchy' ? `0 0 8px ${THEMES.anarchy.accentGlow}` : `0 0 8px ${THEMES.classic.accentGlow}`,
          }} />
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {(['anarchy', 'classic'] as const).map(key => {
            const T = THEMES[key];
            const isActive = active === key;
            return (
              <div
                key={key}
                className={`server-card server-card-${key}`}
                onClick={() => chooseServer(key)}
                style={{ opacity: isActive ? 1 : 0.55, transition: 'opacity 0.4s' }}
              >
                <div style={{ fontSize: '3.2rem', filter: `drop-shadow(0 0 18px ${T.accentGlow})` }}>{T.emoji}</div>
                <div style={{
                  fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '1.3rem',
                  color: T.accent, textShadow: `0 0 18px ${T.accentGlow}`, letterSpacing: '0.05em',
                }}>
                  {T.label}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', fontFamily: 'Rajdhani' }}>
                  {T.sublabel}
                </div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', color: T.accentText, letterSpacing: '0.1em' }}>
                  {T.ip}
                </div>
                <div style={{
                  marginTop: '0.75rem', padding: '0.55rem 1.5rem',
                  background: T.accent, color: '#000',
                  fontFamily: 'Orbitron, monospace', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
                  clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                }}>
                  ИГРАТЬ
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
