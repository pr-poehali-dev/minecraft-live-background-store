import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/382c2755-07c2-455e-bdae-7343c529a144/files/3c1b71e6-4b81-4a72-a0fe-ec565f7a021b.jpg';
const STORE_IMG = 'https://cdn.poehali.dev/projects/382c2755-07c2-455e-bdae-7343c529a144/files/bd351a2f-b0e9-475a-a838-f5fb8c03231c.jpg';

const products = [
  { id: 1, name: 'Кейс «Неоновый»', desc: 'Содержит редкие предметы и скины с неоновым эффектом', price: '149 ₽', tag: 'POPULAR', color: 'cyan' },
  { id: 2, name: 'Набор «Строитель»', desc: 'x64 редких блоков, инструменты и ресурсы для строительства', price: '299 ₽', tag: 'NEW', color: 'pink' },
  { id: 3, name: 'Привилегия «VIP»', desc: '30 дней особых возможностей: кастомный тег, дополнительный инвентарь', price: '499 ₽', tag: 'TOP', color: 'yellow' },
  { id: 4, name: 'Кристаллы ×1000', desc: 'Игровая валюта для покупок в магазине сервера', price: '99 ₽', tag: null, color: 'cyan' },
  { id: 5, name: 'Кейс «Киберпанк»', desc: 'Эксклюзивный набор с уникальными предметами в стиле киберпанк', price: '399 ₽', tag: 'RARE', color: 'pink' },
  { id: 6, name: 'Привилегия «ELITE»', desc: '30 дней: /fly, собственный остров, приоритетный вход', price: '799 ₽', tag: 'BEST', color: 'yellow' },
];

const donates = [
  { tier: 'STARTER', price: '199 ₽/мес', color: 'cyan', perks: ['Кастомный ник-тег', 'x500 кристаллов', 'Доступ к /kit starter', 'Чат-эффекты'] },
  { tier: 'VIP', price: '499 ₽/мес', color: 'pink', perks: ['Всё из STARTER', 'Команда /fly', 'x1500 кристаллов', 'Приоритет входа', 'Эксклюзивный скин'], highlight: true },
  { tier: 'ELITE', price: '999 ₽/мес', color: 'yellow', perks: ['Всё из VIP', 'Собственный остров', 'x5000 кристаллов', '/god режим', 'Личный менеджер', 'Уникальный баннер'] },
];

const navItems = ['Главная', 'Товары', 'О проекте', 'Контакты', 'Донаты'];

export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSection, setActiveSection] = useState('Главная');
  const [copiedIp, setCopiedIp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; alpha: number;
    }> = [];

    const colors = ['#00ffff', '#ff00ff', '#0080ff', '#00ff88'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      // Draw connections
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,255,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id === 'home' ? 'Главная' : id === 'store' ? 'Товары' : id === 'about' ? 'О проекте' : id === 'contacts' ? 'Контакты' : 'Донаты');
  };

  const copyIp = () => {
    navigator.clipboard.writeText('play.cybercraft.ru');
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  const sectionIds: Record<string, string> = {
    'Главная': 'home', 'Товары': 'store', 'О проекте': 'about', 'Контакты': 'contacts', 'Донаты': 'donates',
  };

  return (
    <div className="min-h-screen" style={{ background: '#050510', color: '#e0ffff' }}>
      {/* ЖИВОЙ ФОН */}
      <div className="cyber-bg">
        <div className="cyber-grid" />
        <div className="cyber-grid-2" />
        <div className="cyber-glow-orb cyber-glow-orb-1" />
        <div className="cyber-glow-orb cyber-glow-orb-2" />
        <div className="cyber-glow-orb cyber-glow-orb-3" />
        <canvas ref={canvasRef} id="particles" style={{ position: 'absolute', inset: 0 }} />
      </div>

      {/* НАВИГАЦИЯ */}
      <nav className="nav-cyber">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollTo('home')}
          >
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              boxShadow: '0 0 20px rgba(0,255,255,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '1rem' }}>⛏</span>
            </div>
            <span style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 900, fontSize: '1.1rem',
              color: '#fff',
              letterSpacing: '0.05em',
            }}>
              CYBER<span className="neon-text-cyan">CRAFT</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item}
                className={`nav-link ${activeSection === item ? 'active' : ''}`}
                onClick={() => scrollTo(sectionIds[item])}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="server-online">
            <div className="server-dot" />
            ОНЛАЙН: 247
          </div>
        </div>
      </nav>

      {/* ===== HERO СЕКЦИЯ ===== */}
      <section id="home" style={{ minHeight: '100vh', position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
        <div className="hero-scanline" />
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div style={{ animation: 'heroFadeIn 0.8s ease-out' }}>
              <div className="badge-cyber mb-6">⛏ MINECRAFT 1.20 JAVA + BEDROCK</div>
              <h1 style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}>
                <span style={{ color: '#fff', display: 'block' }}>ENTER THE</span>
                <span className="neon-text-cyan">CYBER</span>
                <span style={{ color: '#fff' }}>CRAFT</span>
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                  color: 'rgba(255,0,255,0.9)',
                  textShadow: '0 0 20px rgba(255,0,255,0.8)',
                  marginTop: '0.5rem',
                  letterSpacing: '0.3em',
                }}>UNIVERSE</span>
              </h1>

              <p style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '1.2rem',
                color: 'rgba(0,255,255,0.6)',
                marginBottom: '2.5rem',
                lineHeight: 1.6,
                maxWidth: '480px',
              }}>
                Футуристичный Minecraft-сервер с уникальной экономикой, войнами кланов и миром в стиле киберпанк. Присоединяйся к 5000+ игрокам.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button className="btn-cyber" onClick={() => scrollTo('store')}>
                  Открыть магазин
                </button>
                <button className="btn-cyber-outline" onClick={() => scrollTo('donates')}>
                  Донаты
                </button>
              </div>

              <div
                className="ip-block"
                onClick={copyIp}
                title="Нажми чтобы скопировать"
              >
                <Icon name="Copy" size={14} style={{ opacity: 0.6 }} />
                <span>play.cybercraft.ru</span>
                {copiedIp && (
                  <span style={{ color: '#00ff88', fontSize: '0.7rem', marginLeft: '0.5rem' }}>
                    СКОПИРОВАНО!
                  </span>
                )}
              </div>
            </div>

            {/* Hero image + stats */}
            <div style={{ position: 'relative', animation: 'heroFadeIn 0.8s ease-out 0.2s both' }}>
              <div style={{
                border: '1px solid rgba(0,255,255,0.2)',
                padding: '4px',
                position: 'relative',
                boxShadow: '0 0 60px rgba(0,255,255,0.15), 0 0 120px rgba(255,0,255,0.08)',
              }}>
                <img
                  src={HERO_IMG}
                  alt="CyberCraft Minecraft"
                  style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(5,5,16,0.8))',
                }} />
                {/* Corner decorations */}
                {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    width: '20px', height: '20px',
                    borderColor: 'var(--neon-cyan)',
                    borderStyle: 'solid',
                    borderWidth: i === 0 ? '2px 0 0 2px' : i === 1 ? '2px 2px 0 0' : i === 2 ? '0 0 2px 2px' : '0 2px 2px 0',
                    [pos.split(' ')[0]]: 0, [pos.split(' ')[1]]: 0,
                  }} />
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'ИГРОКОВ', value: '5K+', color: 'cyan' },
                  { label: 'ОНЛАЙН', value: '247', color: 'pink' },
                  { label: 'РЕЖИМОВ', value: '12', color: 'yellow' },
                ].map(stat => (
                  <div key={stat.label} className="card-cyber p-4 text-center">
                    <div className={`stat-number neon-text-${stat.color}`}>{stat.value}</div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cyber-divider" style={{ position: 'relative', zIndex: 10 }} />

      {/* ===== ТОВАРЫ ===== */}
      <section id="store" className="section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="badge-cyber mb-4">🛒 МАГАЗИН СЕРВЕРА</div>
            <h2 className="section-title">
              МАГАЗИН <span>ТОВАРОВ</span>
            </h2>
            <p style={{ color: 'rgba(0,255,255,0.5)', marginTop: '1rem', fontFamily: 'Rajdhani', fontSize: '1.1rem' }}>
              Улучши игровой опыт с нашими уникальными предметами
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <div
                key={p.id}
                className={`card-cyber ${p.color === 'pink' ? 'card-cyber-pink' : ''} p-6`}
                style={{ animation: `heroFadeIn 0.5s ease-out ${i * 0.1}s both` }}
              >
                {p.tag && (
                  <div style={{
                    display: 'inline-block',
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    padding: '0.2rem 0.6rem',
                    marginBottom: '1rem',
                    background: p.color === 'cyan' ? 'rgba(0,255,255,0.1)' : p.color === 'pink' ? 'rgba(255,0,255,0.1)' : 'rgba(255,255,0,0.1)',
                    border: `1px solid ${p.color === 'cyan' ? 'rgba(0,255,255,0.4)' : p.color === 'pink' ? 'rgba(255,0,255,0.4)' : 'rgba(255,255,0,0.4)'}`,
                    color: p.color === 'cyan' ? 'var(--neon-cyan)' : p.color === 'pink' ? 'var(--neon-pink)' : 'var(--neon-yellow)',
                  }}>
                    ★ {p.tag}
                  </div>
                )}
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                  {p.id === 1 ? '📦' : p.id === 2 ? '⛏️' : p.id === 3 ? '👑' : p.id === 4 ? '💎' : p.id === 5 ? '🎁' : '🚀'}
                </div>
                <h3 style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em',
                }}>
                  {p.name}
                </h3>
                <p style={{ color: 'rgba(0,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5, flex: 1 }}>
                  {p.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="price-tag">{p.price}</span>
                  <button
                    className="btn-cyber"
                    style={{ padding: '0.5rem 1.25rem', fontSize: '0.7rem', background: p.color === 'pink' ? 'var(--neon-pink)' : p.color === 'yellow' ? 'var(--neon-yellow)' : 'var(--neon-cyan)', color: '#000' }}
                  >
                    Купить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cyber-divider" style={{ position: 'relative', zIndex: 10 }} />

      {/* ===== О ПРОЕКТЕ ===== */}
      <section id="about" className="section">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge-cyber mb-4">📖 О НАС</div>
              <h2 className="section-title mb-8">
                О <span>ПРОЕКТЕ</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: '⚡', title: 'Уникальные режимы', text: 'SkyWars, BedWars, Survival с киберпанк-атмосферой, кланы, войны территорий' },
                  { icon: '🔒', title: 'Честная игра', text: 'Строгая анти-чит система, активная модерация 24/7, справедливые правила' },
                  { icon: '🌐', title: 'Мощные сервера', text: 'Выделенные серверы с низким пингом по всей России, стабильный аптайм 99.9%' },
                  { icon: '🎮', title: 'Сообщество', text: '5000+ активных игроков, Discord-сервер, еженедельные турниры с призами' },
                ].map(item => (
                  <div key={item.title} className="card-cyber p-5" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '1.8rem', lineHeight: 1, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <h4 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--neon-cyan)', marginBottom: '0.25rem' }}>
                        {item.title}
                      </h4>
                      <p style={{ color: 'rgba(224,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                border: '1px solid rgba(255,0,255,0.2)',
                padding: '4px',
                boxShadow: '0 0 60px rgba(255,0,255,0.1)',
              }}>
                <img
                  src={STORE_IMG}
                  alt="О проекте"
                  style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Floating stat cards */}
              <div className="card-cyber p-4" style={{
                position: 'absolute', bottom: '-20px', left: '-30px',
                boxShadow: '0 0 30px rgba(0,255,255,0.2)',
                minWidth: '150px',
              }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '2rem', fontWeight: 900, color: 'var(--neon-cyan)', textShadow: '0 0 20px rgba(0,255,255,0.8)' }}>3</div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>ГОДА В ИГРЕ</div>
              </div>
              <div className="card-cyber card-cyber-pink p-4" style={{
                position: 'absolute', top: '-20px', right: '-20px',
                boxShadow: '0 0 30px rgba(255,0,255,0.2)',
                minWidth: '150px',
              }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '2rem', fontWeight: 900, color: 'var(--neon-pink)', textShadow: '0 0 20px rgba(255,0,255,0.8)' }}>#1</div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>В РЕЙТИНГЕ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cyber-divider" style={{ position: 'relative', zIndex: 10 }} />

      {/* ===== ДОНАТЫ ===== */}
      <section id="donates" className="section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="badge-cyber mb-4">💎 ПРИВИЛЕГИИ</div>
            <h2 className="section-title">
              ДОНАТ <span>ПРИВИЛЕГИИ</span>
            </h2>
            <p style={{ color: 'rgba(0,255,255,0.5)', marginTop: '1rem', fontFamily: 'Rajdhani', fontSize: '1.1rem' }}>
              Получи преимущества и поддержи развитие сервера
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {donates.map((tier, i) => (
              <div
                key={tier.tier}
                className={`card-cyber donate-tier ${tier.color === 'pink' ? 'card-cyber-pink' : ''} p-8`}
                style={{
                  position: 'relative',
                  transform: tier.highlight ? 'scale(1.05)' : 'scale(1)',
                  border: tier.highlight ? '1px solid rgba(255,0,255,0.5)' : undefined,
                  boxShadow: tier.highlight ? '0 0 60px rgba(255,0,255,0.2)' : undefined,
                  animation: `heroFadeIn 0.6s ease-out ${i * 0.15}s both`,
                }}
              >
                {tier.highlight && (
                  <div style={{
                    position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                    fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', letterSpacing: '0.15em',
                    background: 'var(--neon-pink)', color: '#000', padding: '0.25rem 1rem',
                    whiteSpace: 'nowrap', fontWeight: 700,
                  }}>
                    ★ ПОПУЛЯРНЫЙ
                  </div>
                )}

                <div style={{
                  fontFamily: 'Orbitron, monospace', fontSize: '0.7rem',
                  letterSpacing: '0.2em', marginBottom: '0.5rem',
                  color: tier.color === 'cyan' ? 'var(--neon-cyan)' : tier.color === 'pink' ? 'var(--neon-pink)' : 'var(--neon-yellow)',
                  textShadow: tier.color === 'cyan' ? '0 0 15px rgba(0,255,255,0.8)' : tier.color === 'pink' ? '0 0 15px rgba(255,0,255,0.8)' : '0 0 15px rgba(255,255,0,0.8)',
                }}>
                  {tier.tier}
                </div>

                <div style={{
                  fontFamily: 'Orbitron, monospace', fontSize: '1.8rem', fontWeight: 900,
                  color: '#fff', marginBottom: '2rem',
                }}>
                  {tier.price}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {tier.perks.map(perk => (
                    <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                        background: tier.color === 'cyan' ? 'rgba(0,255,255,0.2)' : tier.color === 'pink' ? 'rgba(255,0,255,0.2)' : 'rgba(255,255,0,0.2)',
                        border: `1px solid ${tier.color === 'cyan' ? 'rgba(0,255,255,0.5)' : tier.color === 'pink' ? 'rgba(255,0,255,0.5)' : 'rgba(255,255,0,0.5)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.55rem',
                        color: tier.color === 'cyan' ? 'var(--neon-cyan)' : tier.color === 'pink' ? 'var(--neon-pink)' : 'var(--neon-yellow)',
                      }}>✓</div>
                      <span style={{ color: 'rgba(224,255,255,0.7)', fontSize: '0.95rem' }}>{perk}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="btn-cyber"
                  style={{
                    width: '100%',
                    background: tier.color === 'cyan' ? 'var(--neon-cyan)' : tier.color === 'pink' ? 'var(--neon-pink)' : 'var(--neon-yellow)',
                    color: '#000',
                    clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                  }}
                >
                  Купить {tier.tier}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cyber-divider" style={{ position: 'relative', zIndex: 10 }} />

      {/* ===== КОНТАКТЫ ===== */}
      <section id="contacts" className="section">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="badge-cyber mb-4">📡 СВЯЗЬ</div>
              <h2 className="section-title mb-8">
                <span>КОНТАКТЫ</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { icon: 'MessageCircle', label: 'Discord', value: 'discord.gg/cybercraft', color: '#5865F2' },
                  { icon: 'Send', label: 'Telegram', value: '@cybercraft_mc', color: '#2AABEE' },
                  { icon: 'Mail', label: 'Email', value: 'support@cybercraft.ru', color: 'var(--neon-cyan)' },
                  { icon: 'Globe', label: 'Сайт', value: 'cybercraft.ru', color: 'var(--neon-pink)' },
                ].map(item => (
                  <div key={item.label} className="card-cyber p-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '4px', flexShrink: 0,
                      background: `${item.color}20`,
                      border: `1px solid ${item.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name={item.icon} fallback="Globe" size={20} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.15rem' }}>
                        {item.label}
                      </div>
                      <div style={{ color: item.color, fontSize: '1rem' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="card-cyber p-8">
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--neon-cyan)', marginBottom: '1.5rem' }}>
                НАПИСАТЬ НАМ
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(0,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>
                    ИМЯ
                  </label>
                  <input
                    className="cyber-input"
                    placeholder="Введи своё имя"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(0,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>
                    EMAIL
                  </label>
                  <input
                    className="cyber-input"
                    placeholder="твой@email.ru"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(0,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>
                    СООБЩЕНИЕ
                  </label>
                  <textarea
                    className="cyber-input"
                    rows={4}
                    placeholder="Твой вопрос или сообщение..."
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    style={{ resize: 'none' }}
                  />
                </div>
                <button className="btn-cyber" style={{ marginTop: '0.5rem', width: '100%' }}>
                  Отправить сообщение
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        position: 'relative', zIndex: 10,
        borderTop: '1px solid rgba(0,255,255,0.1)',
        padding: '2rem 0',
        background: 'rgba(0,0,0,0.3)',
      }}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '1rem', color: '#fff' }}>
            CYBER<span className="neon-text-cyan">CRAFT</span>
          </div>
          <div style={{ color: 'rgba(0,255,255,0.3)', fontSize: '0.85rem', fontFamily: 'Rajdhani' }}>
            © 2024 CyberCraft Minecraft Server · play.cybercraft.ru
          </div>
          <div className="flex gap-4">
            {['MessageCircle', 'Send', 'Globe'].map(icon => (
              <div key={icon} style={{
                width: '36px', height: '36px',
                border: '1px solid rgba(0,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,255,255,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,255,255,0.2)')}
              >
                <Icon name={icon} fallback="Globe" size={16} style={{ color: 'rgba(0,255,255,0.6)' }} />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}