import { useEffect, useRef, useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';

// ─── ТЕМЫ ───────────────────────────────────────────────────────────────────

type ThemeKey = 'anarchy' | 'classic';

const THEMES = {
  anarchy: {
    key: 'anarchy' as ThemeKey,
    label: 'АНАРХИЯ',
    sublabel: 'Выживание без правил',
    ip: 'anarchy.server.ru',
    emoji: '💀',
    accent: '#ff3c00',
    accentSoft: 'rgba(255,60,0,0.18)',
    accentGlow: 'rgba(255,60,0,0.5)',
    accentBorder: 'rgba(255,60,0,0.4)',
    accentText: '#ff6633',
    secondAccent: '#ff8800',
    bgCard: 'rgba(20,5,5,0.85)',
    bgNav: 'rgba(10,2,2,0.88)',
    navBorder: 'rgba(255,60,0,0.25)',
    stubClass: 'stub-anarchy',
    gridClass: 'video-grid-anarchy',
    scanClass: 'scanline-anarchy',
    overlayClass: 'video-overlay-anarchy',
    // Ссылка на видео — замени на свою
    videoSrc: '',
    online: '184',
    description: 'Полная свобода. Никаких ограничений. Только сила решает кто выживет в этом жестоком мире. PvP, рейды, грифинг — здесь всё дозволено.',
    stats: [{ label: 'ИГРОКОВ', value: '8K+' }, { label: 'ОНЛАЙН', value: '184' }, { label: 'РЕЙТОВ / ДЕНЬ', value: '50+' }],
    products: [
      { id: 1, emoji: '💣', name: 'Набор Рейдера', desc: 'TNT ×64, кирка Эффективность V, броня с защитой IV', price: '249 ₽', tag: 'HOT' },
      { id: 2, emoji: '⚔️', name: 'Меч Хаоса', desc: 'Алмазный меч: Острота V, Огонь II, Добыча III', price: '199 ₽', tag: 'NEW' },
      { id: 3, emoji: '🛡️', name: 'Броня Анархиста', desc: 'Полный комплект незеритовой брони с зачарованиями', price: '599 ₽', tag: 'RARE' },
      { id: 4, emoji: '💰', name: 'Монеты ×5000', desc: 'Игровая валюта для торговли на сервере', price: '149 ₽', tag: null },
      { id: 5, emoji: '🔥', name: 'Привилегия КРОВЬ', desc: '30 дней: /god, /heal, кастомный кровавый тег', price: '699 ₽', tag: 'TOP' },
      { id: 6, emoji: '💎', name: 'Стартовый пак', desc: 'Полный набор для старта: еда, инструменты, ресурсы', price: '99 ₽', tag: null },
    ],
    donates: [
      { tier: 'ВЫЖИВШИЙ', price: '199 ₽/мес', perks: ['Кастомный кровавый тег', '/kit survivor', 'x1000 монет', 'Чат-иконка 💀'] },
      { tier: 'РЕЙДЕР', price: '499 ₽/мес', perks: ['Всё из ВЫЖИВШИЙ', '/god режим', 'x3000 монет', 'Приоритет входа', 'Телепорт к игрокам'], highlight: true },
      { tier: 'ВЛАДЫКА', price: '999 ₽/мес', perks: ['Всё из РЕЙДЕР', '/fly в мирных зонах', 'x10000 монет', 'Личная база', 'Баннер над базой', 'Поддержка 24/7'] },
    ],
    about: [
      { icon: '💀', title: 'Полная анархия', text: 'Никаких правил, никакой защиты. Только ты и твои навыки против всего мира.' },
      { icon: '⚔️', title: 'PvP везде', text: 'Сражения разрешены в любой точке карты. Побеждает сильнейший.' },
      { icon: '🔥', title: 'Рейды и грифинг', text: 'Взрывай базы врагов, захватывай ресурсы, строй свою империю.' },
      { icon: '🌍', title: 'Огромная карта', text: '60 000×60 000 блоков. Исследуй, выживай, завоёвывай.' },
    ],
  },
  classic: {
    key: 'classic' as ThemeKey,
    label: 'КЛАССИКА',
    sublabel: 'Ванильный выживач',
    ip: 'classic.server.ru',
    emoji: '🌲',
    accent: '#00ff64',
    accentSoft: 'rgba(0,255,100,0.15)',
    accentGlow: 'rgba(0,255,100,0.45)',
    accentBorder: 'rgba(0,255,100,0.35)',
    accentText: '#33ff88',
    secondAccent: '#00cc44',
    bgCard: 'rgba(3,18,8,0.85)',
    bgNav: 'rgba(2,10,5,0.88)',
    navBorder: 'rgba(0,255,100,0.22)',
    stubClass: 'stub-classic',
    gridClass: 'video-grid-classic',
    scanClass: 'scanline-classic',
    overlayClass: 'video-overlay-classic',
    // Ссылка на видео — замени на свою
    videoSrc: '',
    online: '263',
    description: 'Классический выживач в лучших традициях Minecraft. Строй, торгуй, развивайся вместе с дружным сообществом без лишних сложностей.',
    stats: [{ label: 'ИГРОКОВ', value: '12K+' }, { label: 'ОНЛАЙН', value: '263' }, { label: 'ПОСТРОЕК', value: '40K+' }],
    products: [
      { id: 1, emoji: '🌱', name: 'Стартовый набор', desc: 'Полный комплект инструментов, еда, семена для быстрого старта', price: '99 ₽', tag: 'NEW' },
      { id: 2, emoji: '🏠', name: 'Участок земли', desc: 'Личный защищённый участок 100×100 блоков навсегда', price: '349 ₽', tag: 'HOT' },
      { id: 3, emoji: '⛏️', name: 'Набор Шахтёра', desc: 'Незеритовая кирка, фонарь, запасы прочности', price: '199 ₽', tag: null },
      { id: 4, emoji: '🌾', name: 'Монеты ×5000', desc: 'Игровая валюта для торговли на аукционе', price: '149 ₽', tag: null },
      { id: 5, emoji: '👑', name: 'Привилегия VIP', desc: '30 дней: /fly, личный шалкер, украшения ника', price: '499 ₽', tag: 'TOP' },
      { id: 6, emoji: '🎁', name: 'Ежедневный кейс', desc: '30 дней доступа к ежедневным кейсам с призами', price: '249 ₽', tag: 'RARE' },
    ],
    donates: [
      { tier: 'НОВИЧОК', price: '199 ₽/мес', perks: ['Кастомный зелёный тег', '/kit starter ×2/сут', 'x1000 монет', 'Шалкер-коробка'] },
      { tier: 'МАСТЕР', price: '499 ₽/мес', perks: ['Всё из НОВИЧОК', 'Команда /fly', 'x3000 монет', 'Приоритет входа', 'Личный варп'], highlight: true },
      { tier: 'ЛЕГЕНДА', price: '999 ₽/мес', perks: ['Всё из МАСТЕР', 'Личный остров', 'x10000 монет', 'Эксклюзивный скин', 'Менеджер', 'Баннер на сервере'] },
    ],
    about: [
      { icon: '🌲', title: 'Ванильный геймплей', text: 'Чистый Minecraft без лишних модов. Всё как задумал Notch, только лучше.' },
      { icon: '🤝', title: 'Дружное сообщество', text: 'Помогаем новичкам, проводим ивенты, строим вместе — атмосфера на высоте.' },
      { icon: '🏗️', title: 'Защита построек', text: 'Гриф и кража запрещены. Твоя постройка всегда останется в безопасности.' },
      { icon: '🎉', title: 'Еженедельные ивенты', text: 'Турниры по строительству, охота за сокровищами, конкурсы с призами.' },
    ],
  },
} as const;

const SWITCH_INTERVAL = 10000; // 10 секунд
const navItems = ['Главная', 'Товары', 'О проекте', 'Контакты', 'Донаты'];
const sectionIds: Record<string, string> = {
  'Главная': 'home', 'Товары': 'store', 'О проекте': 'about', 'Контакты': 'contacts', 'Донаты': 'donates',
};

// ─── КОМПОНЕНТ ──────────────────────────────────────────────────────────────

export default function Index() {
  const [selected, setSelected] = useState<ThemeKey | null>(null);
  const [active, setActive] = useState<ThemeKey>('anarchy');
  const [transitioning, setTransitioning] = useState(false);
  const [timerPct, setTimerPct] = useState(100);
  const [activeSection, setActiveSection] = useState('Главная');
  const [copiedIp, setCopiedIp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoCRef = useRef<HTMLVideoElement>(null);

  const T = THEMES[active];

  // Авто-смена тем
  const switchTheme = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setActive(prev => prev === 'anarchy' ? 'classic' : 'anarchy');
      setTransitioning(false);
      setTimerPct(100);
    }, 600);
  }, []);

  useEffect(() => {
    if (selected) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
      return;
    }
    setTimerPct(100);
    timerRef.current = setInterval(switchTheme, SWITCH_INTERVAL);
    const step = 100 / (SWITCH_INTERVAL / 100);
    tickRef.current = setInterval(() => {
      setTimerPct(p => Math.max(0, p - step));
    }, 100);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [selected, switchTheme, active]);

  // Canvas частицы
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const color = active === 'anarchy' ? '#ff4400' : '#00ff64';
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      a: Math.random() * 0.5 + 0.1,
    }));
    let id: number;
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
            ctx.strokeStyle = `${color}${Math.round(0.07 * (1 - d / 110) * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', onResize); };
  }, [active]);

  const chooseServer = (key: ThemeKey) => {
    setSelected(key);
    setActive(key);
  };

  const scrollTo = (id: string, label: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(label);
  };

  const copyIp = () => {
    navigator.clipboard.writeText(T.ip);
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  // ── СТИЛИ, зависящие от темы ─────────────────────────────────────────────
  const ac = T.accent;
  const acSoft = T.accentSoft;
  const acBorder = T.accentBorder;
  const acGlow = T.accentGlow;
  const acText = T.accentText;

  const cardStyle = { background: T.bgCard, borderColor: acBorder };
  const cardHoverGlow = { boxShadow: `0 0 30px ${acGlow}` };

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#f0f0f0' }}>

      {/* ═══ ВИДЕО-ФОН ═══════════════════════════════════════════════════ */}
      <div className="video-bg-wrap" style={{ opacity: transitioning ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        {/* Заглушки-анимации (заменятся видео после загрузки) */}
        <div className={T.stubClass} />

        {/* Видео (если есть src) */}
        <video
          ref={videoARef}
          autoPlay loop muted playsInline
          style={{ display: active === 'anarchy' && THEMES.anarchy.videoSrc ? 'block' : 'none' }}
        >
          {THEMES.anarchy.videoSrc && <source src={THEMES.anarchy.videoSrc} type="video/mp4" />}
        </video>
        <video
          ref={videoCRef}
          autoPlay loop muted playsInline
          style={{ display: active === 'classic' && THEMES.classic.videoSrc ? 'block' : 'none' }}
        >
          {THEMES.classic.videoSrc && <source src={THEMES.classic.videoSrc} type="video/mp4" />}
        </video>

        {/* Оверлей + сетка */}
        <div className={T.overlayClass} />
        <div className={`video-grid ${T.gridClass}`} />
        <div className={`scanline ${T.scanClass}`} />

        {/* Частицы */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
      </div>

      {/* ═══ ВЫБОР СЕРВЕРА (оверлей при загрузке) ════════════════════════ */}
      {!selected && (
        <div className="server-select-overlay">
          <div style={{ textAlign: 'center', maxWidth: 740, width: '100%', padding: '0 1rem' }}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>
              ВЫБЕРИТЕ СЕРВЕР
            </div>
            <h2 style={{
              fontFamily: 'Orbitron, monospace', fontWeight: 900,
              fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
              color: '#fff', marginBottom: '0.5rem',
            }}>
              НА КАКОМ СЕРВЕРЕ<br />ХОЧЕШЬ ИГРАТЬ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.95rem', marginBottom: '3rem', fontFamily: 'Rajdhani' }}>
              Смена происходит автоматически — нажми, чтобы остановить
            </p>

            {/* Прогресс-бар */}
            <div style={{
              width: '200px', height: '2px', background: 'rgba(255,255,255,0.1)',
              margin: '0 auto 2.5rem', borderRadius: 2, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${timerPct}%`,
                background: active === 'anarchy' ? THEMES.anarchy.accent : THEMES.classic.accent,
                transition: 'width 0.12s linear',
              }} />
            </div>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {/* Анархия */}
              <div
                className="server-card server-card-anarchy"
                onClick={() => chooseServer('anarchy')}
                style={{ animation: active === 'anarchy' ? 'none' : undefined, opacity: active === 'anarchy' ? 1 : 0.6 }}
              >
                <div style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 0 20px rgba(255,60,0,0.8))' }}>💀</div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '1.4rem', color: THEMES.anarchy.accent, textShadow: `0 0 20px ${THEMES.anarchy.accentGlow}`, letterSpacing: '0.05em' }}>
                  АНАРХИЯ
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontFamily: 'Rajdhani' }}>
                  Без правил · PvP · Рейды
                </div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', color: THEMES.anarchy.accent, marginTop: '0.5rem', letterSpacing: '0.1em' }}>
                  {THEMES.anarchy.ip}
                </div>
                <div style={{
                  marginTop: '1rem', padding: '0.6rem 1.6rem',
                  background: THEMES.anarchy.accent, color: '#000',
                  fontFamily: 'Orbitron, monospace', fontSize: '0.72rem',
                  fontWeight: 700, letterSpacing: '0.1em',
                  clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                }}>
                  ВЫБРАТЬ
                </div>
              </div>

              {/* Классика */}
              <div
                className="server-card server-card-classic"
                onClick={() => chooseServer('classic')}
                style={{ opacity: active === 'classic' ? 1 : 0.6 }}
              >
                <div style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 0 20px rgba(0,255,100,0.7))' }}>🌲</div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '1.4rem', color: THEMES.classic.accent, textShadow: `0 0 20px ${THEMES.classic.accentGlow}`, letterSpacing: '0.05em' }}>
                  КЛАССИКА
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontFamily: 'Rajdhani' }}>
                  Выживач · Торговля · Сообщество
                </div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', color: THEMES.classic.accent, marginTop: '0.5rem', letterSpacing: '0.1em' }}>
                  {THEMES.classic.ip}
                </div>
                <div style={{
                  marginTop: '1rem', padding: '0.6rem 1.6rem',
                  background: THEMES.classic.accent, color: '#000',
                  fontFamily: 'Orbitron, monospace', fontSize: '0.72rem',
                  fontWeight: 700, letterSpacing: '0.1em',
                  clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                }}>
                  ВЫБРАТЬ
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ НАВИГАЦИЯ ════════════════════════════════════════════════════ */}
      <nav className="nav-cyber" style={{ background: T.bgNav, borderBottom: `1px solid ${T.navBorder}` }}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Лого */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home', 'Главная')}>
            <div style={{
              width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${acSoft}`, border: `1px solid ${acBorder}`,
              clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
              fontSize: '1rem',
            }}>
              {T.emoji}
            </div>
            <span style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '1.05rem', color: '#fff', letterSpacing: '0.05em' }}>
              CYBER<span style={{ color: ac, textShadow: `0 0 15px ${acGlow}` }}>CRAFT</span>
            </span>
          </div>

          {/* Ссылки */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map(item => (
              <button
                key={item}
                className={`nav-link ${activeSection === item ? 'active' : ''}`}
                style={{
                  color: activeSection === item ? ac : 'rgba(255,255,255,0.5)',
                }}
                onClick={() => scrollTo(sectionIds[item], item)}
              >
                {item}
                <span style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: activeSection === item ? '100%' : '0',
                  height: '1px', background: ac,
                  boxShadow: `0 0 6px ${acGlow}`,
                  transition: 'width 0.3s',
                }} />
              </button>
            ))}
          </div>

          {/* Онлайн + смена сервера */}
          <div className="flex items-center gap-4">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', letterSpacing: '0.12em', color: ac }}>
              <div className="online-dot" style={{ background: ac, boxShadow: `0 0 8px ${acGlow}` }} />
              {T.online}
            </div>
            {selected && (
              <button
                style={{
                  fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', letterSpacing: '0.12em',
                  padding: '0.3rem 0.8rem', border: `1px solid ${acBorder}`,
                  color: acText, background: acSoft, cursor: 'pointer',
                }}
                onClick={() => setSelected(null)}
              >
                СМЕНИТЬ
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Прогресс-бар таймера (видно когда не выбрал сервер) */}
      {!selected && (
        <div className="timer-bar-wrap">
          <div className="timer-bar" style={{ width: `${timerPct}%`, background: ac, boxShadow: `0 0 8px ${acGlow}` }} />
        </div>
      )}

      {/* ═══ HERO ═════════════════════════════════════════════════════════ */}
      <section id="home" style={{ minHeight: '100vh', position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Левая часть */}
            <div style={{ animation: 'heroFadeUp 0.8s ease-out' }}>
              <div className="badge-cyber mb-5" style={{ borderColor: acBorder, color: acText, background: acSoft }}>
                {T.emoji} MINECRAFT 1.20 JAVA + BEDROCK
              </div>

              <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(2.4rem,5.5vw,4.2rem)', fontWeight: 900, lineHeight: 1.08, marginBottom: '1.5rem' }}>
                <span style={{ color: '#fff', display: 'block' }}>СЕРВЕР</span>
                <span style={{ color: ac, textShadow: `0 0 30px ${acGlow}, 0 0 60px ${acSoft}`, display: 'block' }}>{T.label}</span>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(0.9rem,2vw,1.3rem)', letterSpacing: '0.3em', display: 'block', marginTop: '0.4rem' }}>
                  {T.sublabel}
                </span>
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.15rem', marginBottom: '2.5rem', lineHeight: 1.65, maxWidth: '480px', fontFamily: 'Rajdhani' }}>
                {T.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button className="btn-main" style={{ background: ac, boxShadow: `0 0 20px ${acGlow}` }} onClick={() => scrollTo('store', 'Товары')}>
                  Открыть магазин
                </button>
                <button className="btn-outline" style={{ borderColor: acBorder, color: acText }} onClick={() => scrollTo('donates', 'Донаты')}>
                  Донаты
                </button>
              </div>

              {/* IP */}
              <div className="ip-block" onClick={copyIp} style={{ borderColor: acBorder, color: ac }}>
                <Icon name="Copy" size={13} style={{ opacity: 0.55 }} />
                <span>{T.ip}</span>
                {copiedIp && <span style={{ color: '#fff', fontSize: '0.68rem', opacity: 0.8 }}>СКОПИРОВАНО!</span>}
              </div>
            </div>

            {/* Правая: статы */}
            <div style={{ animation: 'heroFadeUp 0.8s ease-out 0.2s both' }}>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {T.stats.map(stat => (
                  <div key={stat.label} className="card-cyber p-5 text-center" style={cardStyle}>
                    <div className="stat-number" style={{ color: ac, textShadow: `0 0 18px ${acGlow}` }}>{stat.value}</div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.58rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', marginTop: '0.3rem' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Большая карточка темы */}
              <div className="card-cyber p-8" style={{
                ...cardStyle,
                boxShadow: `0 0 60px ${acSoft}, 0 0 120px rgba(0,0,0,0.5)`,
                borderColor: acBorder,
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem', filter: `drop-shadow(0 0 20px ${acGlow})` }}>{T.emoji}</div>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.6rem', fontWeight: 900, color: ac, textShadow: `0 0 20px ${acGlow}`, marginBottom: '0.5rem' }}>
                  {T.label}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Rajdhani', fontSize: '1rem', lineHeight: 1.5 }}>
                  {T.sublabel}
                </p>
                <div style={{
                  marginTop: '1.5rem', padding: '0.5rem 0',
                  borderTop: `1px solid ${acBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontFamily: 'Orbitron, monospace', fontSize: '0.72rem', letterSpacing: '0.1em',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>IP АДРЕС</span>
                  <span style={{ color: ac }}>{T.ip}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cyber-divider" style={{ background: `linear-gradient(90deg,transparent,${ac},transparent)` }} />

      {/* ═══ ТОВАРЫ ═══════════════════════════════════════════════════════ */}
      <section id="store" className="section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="badge-cyber mb-4" style={{ borderColor: acBorder, color: acText, background: acSoft }}>
              🛒 МАГАЗИН СЕРВЕРА
            </div>
            <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 900, color: '#fff' }}>
              МАГАЗИН <span style={{ color: ac, textShadow: `0 0 20px ${acGlow}` }}>ТОВАРОВ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {T.products.map((p, i) => (
              <div key={p.id} className="card-cyber p-6" style={{ ...cardStyle, animation: `heroFadeUp 0.5s ease-out ${i * 0.08}s both` }}>
                {p.tag && (
                  <div style={{
                    display: 'inline-block', fontFamily: 'Orbitron, monospace', fontSize: '0.58rem',
                    letterSpacing: '0.15em', padding: '0.2rem 0.6rem', marginBottom: '0.75rem',
                    background: acSoft, border: `1px solid ${acBorder}`, color: acText,
                  }}>
                    ★ {p.tag}
                  </div>
                )}
                <div style={{ fontSize: '2.4rem', marginBottom: '0.6rem' }}>{p.emoji}</div>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                  {p.name}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  {p.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.4rem', fontWeight: 900, color: ac, textShadow: `0 0 12px ${acGlow}` }}>
                    {p.price}
                  </span>
                  <button className="btn-main" style={{ padding: '0.45rem 1.1rem', fontSize: '0.68rem', background: ac, boxShadow: `0 0 12px ${acGlow}` }}>
                    Купить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cyber-divider" style={{ background: `linear-gradient(90deg,transparent,${ac},transparent)` }} />

      {/* ═══ О ПРОЕКТЕ ════════════════════════════════════════════════════ */}
      <section id="about" className="section">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge-cyber mb-4" style={{ borderColor: acBorder, color: acText, background: acSoft }}>
                📖 О ПРОЕКТЕ
              </div>
              <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 900, color: '#fff', marginBottom: '2.5rem' }}>
                О <span style={{ color: ac, textShadow: `0 0 20px ${acGlow}` }}>СЕРВЕРЕ</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {T.about.map(item => (
                  <div key={item.title} className="card-cyber p-5" style={{ ...cardStyle, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '1.8rem', lineHeight: 1, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <h4 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.76rem', letterSpacing: '0.1em', color: acText, marginBottom: '0.25rem' }}>
                        {item.title}
                      </h4>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.5 }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Правая часть */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card-cyber p-10" style={{
                ...cardStyle, textAlign: 'center',
                boxShadow: `0 0 80px ${acSoft}`,
                background: `radial-gradient(ellipse at center, ${acSoft} 0%, ${T.bgCard} 70%)`,
              }}>
                <div style={{ fontSize: '6rem', filter: `drop-shadow(0 0 30px ${acGlow})` }}>{T.emoji}</div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.8rem', fontWeight: 900, color: ac, textShadow: `0 0 25px ${acGlow}`, marginTop: '1rem' }}>
                  {T.label}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Rajdhani', fontSize: '1rem', marginTop: '0.5rem' }}>
                  {T.sublabel}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {T.stats.map(s => (
                  <div key={s.label} className="card-cyber p-4 text-center" style={cardStyle}>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.6rem', fontWeight: 900, color: ac, textShadow: `0 0 15px ${acGlow}` }}>{s.value}</div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', marginTop: '0.2rem' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cyber-divider" style={{ background: `linear-gradient(90deg,transparent,${ac},transparent)` }} />

      {/* ═══ ДОНАТЫ ═══════════════════════════════════════════════════════ */}
      <section id="donates" className="section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="badge-cyber mb-4" style={{ borderColor: acBorder, color: acText, background: acSoft }}>
              💎 ПРИВИЛЕГИИ
            </div>
            <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 900, color: '#fff' }}>
              ДОНАТ <span style={{ color: ac, textShadow: `0 0 20px ${acGlow}` }}>ПРИВИЛЕГИИ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {T.donates.map((d, i) => (
              <div
                key={d.tier}
                className="card-cyber donate-shine p-8"
                style={{
                  ...cardStyle,
                  transform: d.highlight ? 'scale(1.05)' : undefined,
                  borderColor: d.highlight ? ac : acBorder,
                  boxShadow: d.highlight ? `0 0 60px ${acGlow}, 0 0 120px ${acSoft}` : undefined,
                  animation: `heroFadeUp 0.6s ease-out ${i * 0.15}s both`,
                }}
              >
                {d.highlight && (
                  <div style={{
                    position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                    fontFamily: 'Orbitron, monospace', fontSize: '0.62rem', letterSpacing: '0.15em',
                    background: ac, color: '#000', padding: '0.25rem 1rem', whiteSpace: 'nowrap', fontWeight: 700,
                  }}>
                    ★ ПОПУЛЯРНЫЙ
                  </div>
                )}
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', color: acText, textShadow: `0 0 12px ${acGlow}`, marginBottom: '0.5rem' }}>
                  {d.tier}
                </div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.7rem', fontWeight: 900, color: '#fff', marginBottom: '2rem' }}>
                  {d.price}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2rem' }}>
                  {d.perks.map(perk => (
                    <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <div style={{
                        width: '15px', height: '15px', borderRadius: '50%', flexShrink: 0,
                        background: acSoft, border: `1px solid ${acBorder}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.55rem', color: acText,
                      }}>✓</div>
                      <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem' }}>{perk}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-main" style={{ width: '100%', background: ac, boxShadow: `0 0 15px ${acGlow}` }}>
                  Купить {d.tier}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cyber-divider" style={{ background: `linear-gradient(90deg,transparent,${ac},transparent)` }} />

      {/* ═══ КОНТАКТЫ ═════════════════════════════════════════════════════ */}
      <section id="contacts" className="section">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="badge-cyber mb-4" style={{ borderColor: acBorder, color: acText, background: acSoft }}>
                📡 СВЯЗЬ
              </div>
              <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 900, color: '#fff', marginBottom: '2rem' }}>
                <span style={{ color: ac, textShadow: `0 0 20px ${acGlow}` }}>КОНТАКТЫ</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {[
                  { icon: 'MessageCircle', label: 'Discord', value: 'discord.gg/cybercraft' },
                  { icon: 'Send', label: 'Telegram', value: '@cybercraft_mc' },
                  { icon: 'Mail', label: 'Email', value: 'support@cybercraft.ru' },
                  { icon: 'Globe', label: 'Сайт', value: 'cybercraft.ru' },
                ].map(item => (
                  <div key={item.label} className="card-cyber p-4" style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                    <div style={{
                      width: '42px', height: '42px', flexShrink: 0, background: acSoft,
                      border: `1px solid ${acBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name={item.icon} fallback="Globe" size={18} style={{ color: acText }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', marginBottom: '0.15rem' }}>
                        {item.label}
                      </div>
                      <div style={{ color: acText, fontSize: '1rem' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Форма */}
            <div className="card-cyber p-8" style={cardStyle}>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.9rem', letterSpacing: '0.1em', color: acText, marginBottom: '1.5rem' }}>
                НАПИСАТЬ НАМ
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { key: 'name', label: 'ИМЯ', placeholder: 'Введи своё имя' },
                  { key: 'email', label: 'EMAIL', placeholder: 'твой@email.ru' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', color: `${acText}88`, display: 'block', marginBottom: '0.4rem' }}>
                      {f.label}
                    </label>
                    <input
                      className="cyber-input"
                      style={{ borderColor: acBorder, color: '#f0f0f0' }}
                      placeholder={f.placeholder}
                      value={formData[f.key as 'name' | 'email']}
                      onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', color: `${acText}88`, display: 'block', marginBottom: '0.4rem' }}>
                    СООБЩЕНИЕ
                  </label>
                  <textarea
                    className="cyber-input"
                    rows={4}
                    style={{ borderColor: acBorder, color: '#f0f0f0', resize: 'none' }}
                    placeholder="Твой вопрос или сообщение..."
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  />
                </div>
                <button className="btn-main" style={{ marginTop: '0.5rem', width: '100%', background: ac, boxShadow: `0 0 15px ${acGlow}` }}>
                  Отправить сообщение
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══════════════════════════════════════════════════════ */}
      <footer style={{ position: 'relative', zIndex: 10, borderTop: `1px solid ${acBorder}`, padding: '2rem 0', background: 'rgba(0,0,0,0.5)' }}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '1rem', color: '#fff' }}>
            CYBER<span style={{ color: ac, textShadow: `0 0 12px ${acGlow}` }}>CRAFT</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem', fontFamily: 'Rajdhani' }}>
            © 2024 CyberCraft · {T.ip}
          </div>
          <div className="flex gap-3">
            {['MessageCircle', 'Send', 'Globe'].map(icon => (
              <div key={icon} style={{
                width: '34px', height: '34px', border: `1px solid ${acBorder}`, background: acSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <Icon name={icon} fallback="Globe" size={15} style={{ color: acText }} />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
