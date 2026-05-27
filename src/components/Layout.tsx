import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme, THEMES } from '@/lib/ThemeContext';
import Icon from '@/components/ui/icon';
import CartDrawer from '@/components/CartDrawer';
import ServerSelectOverlay from '@/components/ServerSelectOverlay';

const NAV_ITEMS = [
  { label: 'Главная', path: '/' },
  { label: 'Магазин', path: '/store' },
  { label: 'О проекте', path: '/about' },
  { label: 'Правила', path: '/rules' },
  { label: 'Контакты', path: '/contacts' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { active, transitioning, selected, resetSelection, cart } = useTheme();
  const T = THEMES[active];
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const ac = T.accent;
  const acSoft = T.accentSoft;
  const acBorder = T.accentBorder;
  const acGlow = T.accentGlow;
  const acText = T.accentText;
  const totalQty = cart.reduce((s, c) => s + c.qty, 0);

  // Canvas частицы
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d')!;
    const color = active === 'anarchy' ? '#ff4400' : '#00ff64';

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * 0.45 + 0.1,
    }));

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.a;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = Math.round(0.07 * (1 - d / 110) * 255).toString(16).padStart(2, '0');
            ctx.strokeStyle = `${color}${alpha}`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); };
  }, [active]);

  return (
    <div style={{ minHeight: '100vh', background: '#060606', color: '#f0f0f0' }}>

      {/* ═══ ЖИВОЙ ФОН ═══════════════════════════════════════════════════ */}
      <div className="video-bg-wrap" style={{ opacity: transitioning ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <div className={T.stubClass} />
        <div className={T.overlayClass} />
        <div className={`video-grid ${T.gridClass}`} />
        <div className={`scanline ${T.scanClass}`} />
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
      </div>

      {/* ═══ ВЫБОР СЕРВЕРА ════════════════════════════════════════════════ */}
      {!selected && <ServerSelectOverlay />}

      {/* ═══ НАВИГАЦИЯ ════════════════════════════════════════════════════ */}
      <nav className="nav-cyber" style={{ background: T.bgNav, borderBottom: `1px solid ${T.navBorder}` }}>
        <div className="container mx-auto px-5 py-4 flex items-center justify-between gap-4">

          {/* Логотип */}
          <div
            className="flex items-center gap-3 cursor-pointer flex-shrink-0"
            onClick={() => navigate('/')}
          >
            <div style={{
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: acSoft, border: `1px solid ${acBorder}`,
              clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
              fontSize: '0.9rem',
            }}>
              {T.emoji}
            </div>
            <span style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '1rem', color: '#fff', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              GAMAI<span style={{ color: ac, textShadow: `0 0 12px ${acGlow}` }}>CLUB</span>
            </span>
          </div>

          {/* Десктоп ссылки */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  style={{
                    position: 'relative',
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: isActive ? ac : 'rgba(255,255,255,0.48)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.35rem 0',
                    transition: 'color 0.3s',
                  }}
                >
                  {item.label}
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0,
                    width: isActive ? '100%' : '0',
                    height: '1px',
                    background: ac,
                    boxShadow: `0 0 6px ${acGlow}`,
                    transition: 'width 0.3s',
                    display: 'block',
                  }} />
                </button>
              );
            })}
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-3">
            {/* Онлайн */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'Orbitron, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', color: acText }}>
              <div className="online-dot" style={{ background: ac, boxShadow: `0 0 8px ${acGlow}` }} />
              <span className="hidden sm:inline">{T.online}</span>
            </div>

            {/* Сменить сервер */}
            {selected && (
              <button
                onClick={resetSelection}
                style={{
                  fontFamily: 'Orbitron, monospace', fontSize: '0.58rem', letterSpacing: '0.1em',
                  padding: '0.28rem 0.7rem', border: `1px solid ${acBorder}`,
                  color: acText, background: acSoft, cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                {T.emoji} {T.label}
              </button>
            )}

            {/* Корзина */}
            <button
              onClick={() => setCartOpen(true)}
              style={{
                position: 'relative',
                width: 38, height: 38,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: acSoft, border: `1px solid ${acBorder}`,
                cursor: 'pointer', flexShrink: 0,
              }}
            >
              <Icon name="ShoppingCart" size={17} style={{ color: acText }} />
              {totalQty > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -6,
                  width: 18, height: 18, borderRadius: '50%',
                  background: ac, color: '#000',
                  fontSize: '0.6rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Orbitron, monospace',
                  boxShadow: `0 0 8px ${acGlow}`,
                }}>
                  {totalQty}
                </span>
              )}
            </button>

            {/* Мобильное меню */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(v => !v)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              <Icon name={mobileOpen ? 'X' : 'Menu'} size={20} style={{ color: acText }} />
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {mobileOpen && (
          <div style={{ borderTop: `1px solid ${T.navBorder}`, background: T.bgNav }}>
            {NAV_ITEMS.map(item => (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setMobileOpen(false); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '0.9rem 1.25rem',
                  fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', letterSpacing: '0.15em',
                  color: location.pathname === item.path ? ac : 'rgba(255,255,255,0.5)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  borderBottom: `1px solid ${T.navBorder}`,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ═══ КОНТЕНТ ══════════════════════════════════════════════════════ */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </main>

      {/* ═══ КОРЗИНА ══════════════════════════════════════════════════════ */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* ═══ FOOTER ═══════════════════════════════════════════════════════ */}
      <footer style={{ position: 'relative', zIndex: 10, borderTop: `1px solid ${acBorder}`, padding: '2rem 0', background: 'rgba(0,0,0,0.55)' }}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '0.95rem', color: '#fff' }}>
            GAMAI<span style={{ color: ac, textShadow: `0 0 10px ${acGlow}` }}>CLUB</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.82rem', fontFamily: 'Rajdhani', textAlign: 'center' }}>
            © 2024 Gamai Club · Minecraft 1.21.11 · mc.gamai.club
          </div>
          <div className="flex gap-3">
            {['MessageCircle', 'Send', 'Globe'].map(icon => (
              <div key={icon} style={{
                width: 32, height: 32, border: `1px solid ${acBorder}`, background: acSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <Icon name={icon} fallback="Globe" size={14} style={{ color: acText }} />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
