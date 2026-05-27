import { useTheme, THEMES } from '@/lib/ThemeContext';
import Layout from '@/components/Layout';

export default function About() {
  const { active } = useTheme();
  const T = THEMES[active];

  const ac = T.accent;
  const acSoft = T.accentSoft;
  const acBorder = T.accentBorder;
  const acGlow = T.accentGlow;
  const acText = T.accentText;
  const cardStyle = { background: T.bgCard, border: `1px solid ${acBorder}` };

  const timeline = [
    { year: '2021', text: 'Запуск первого сервера Gamai Club — 50 игроков в первый день.' },
    { year: '2022', text: 'Добавлен режим Классика, онлайн вырос до 500 игроков ежедневно.' },
    { year: '2023', text: 'Обновление до 1.20, запуск Discord-сообщества с 3000+ участников.' },
    { year: '2024', text: 'Gamai Club — топ-3 сервер СНГ. Minecraft 1.21.11, новый движок.' },
  ];

  const team = [
    { role: 'ОСНОВАТЕЛЬ', name: 'GamaiDev', emoji: '👑', desc: 'Создатель проекта, архитектор серверов' },
    { role: 'ГЛ. АДМИНИСТРАТОР', name: 'StrikeX', emoji: '🛡️', desc: 'Модерация, безопасность, банлист' },
    { role: 'РАЗРАБОТЧИК', name: 'CyberByte', emoji: '⚙️', desc: 'Плагины, движок, производительность' },
    { role: 'МЕНЕДЖЕР', name: 'NeonVoid', emoji: '📡', desc: 'Ивенты, сообщество, Discord' },
  ];

  return (
    <Layout>
      <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <div className="container mx-auto px-6 py-14">

          {/* Заголовок */}
          <div style={{ marginBottom: '4rem', maxWidth: 700 }}>
            <div style={{
              display: 'inline-block',
              fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
              border: `1px solid ${acBorder}`, color: acText, background: acSoft,
              padding: '0.25rem 0.8rem', marginBottom: '1rem',
            }}>
              📖 О НАС
            </div>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.6rem,4vw,2.5rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>
              О ПРОЕКТЕ <span style={{ color: ac, textShadow: `0 0 20px ${acGlow}` }}>GAMAI CLUB</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Rajdhani', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Gamai Club — это не просто Minecraft-сервер. Это живое сообщество игроков, которое мы строим с 2021 года. Два режима, тысячи игроков, честная игра.
            </p>
          </div>

          {/* Большие статы */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: '20K+', label: 'ВСЕГО ИГРОКОВ' },
              { value: '3', label: 'ГОДА РАБОТЫ' },
              { value: '99.9%', label: 'АПТАЙМ' },
              { value: '24/7', label: 'ПОДДЕРЖКА' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  ...cardStyle, padding: '1.75rem 1rem', textAlign: 'center',
                  animation: `heroFadeUp 0.45s ease-out ${i * 0.08}s both`,
                  boxShadow: i === 0 ? `0 0 30px ${acSoft}` : 'none',
                }}
              >
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '2rem', fontWeight: 900, color: ac, textShadow: `0 0 20px ${acGlow}`, lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.56rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginTop: '0.4rem' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Особенности сервера */}
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.2rem,3vw,1.8rem)', fontWeight: 900, color: '#fff', marginBottom: '2rem' }}>
              ОСОБЕННОСТИ <span style={{ color: ac, textShadow: `0 0 15px ${acGlow}` }}>СЕРВЕРА</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {T.about.map((item, i) => (
                <div
                  key={item.title}
                  style={{
                    ...cardStyle, padding: '1.5rem',
                    display: 'flex', gap: '1.1rem', alignItems: 'flex-start',
                    animation: `heroFadeUp 0.5s ease-out ${i * 0.1}s both`,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 15px 40px rgba(0,0,0,0.5), 0 0 20px ${acSoft}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', letterSpacing: '0.1em', color: acText, marginBottom: '0.35rem' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.55, fontFamily: 'Rajdhani' }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Таймлайн */}
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.2rem,3vw,1.8rem)', fontWeight: 900, color: '#fff', marginBottom: '2rem' }}>
              ИСТОРИЯ <span style={{ color: ac, textShadow: `0 0 15px ${acGlow}` }}>ПРОЕКТА</span>
            </h2>
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              {/* Вертикальная линия */}
              <div style={{
                position: 'absolute', left: 0, top: 12, bottom: 12,
                width: 1,
                background: `linear-gradient(180deg, ${ac}, transparent)`,
                opacity: 0.4,
              }} />
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  style={{
                    position: 'relative', marginBottom: '2rem',
                    animation: `heroFadeUp 0.5s ease-out ${i * 0.12}s both`,
                  }}
                >
                  {/* Точка */}
                  <div style={{
                    position: 'absolute', left: -2 - 8, top: 4,
                    width: 16, height: 16, borderRadius: '50%',
                    background: acSoft, border: `1px solid ${ac}`,
                    boxShadow: `0 0 10px ${acGlow}`,
                  }} />
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.72rem', color: ac, letterSpacing: '0.15em', marginBottom: '0.3rem' }}>
                    {item.year}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Rajdhani', fontSize: '1rem', lineHeight: 1.5 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Команда */}
          <div>
            <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.2rem,3vw,1.8rem)', fontWeight: 900, color: '#fff', marginBottom: '2rem' }}>
              НАША <span style={{ color: ac, textShadow: `0 0 15px ${acGlow}` }}>КОМАНДА</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {team.map((m, i) => (
                <div
                  key={m.name}
                  style={{
                    ...cardStyle, padding: '1.5rem', textAlign: 'center',
                    animation: `heroFadeUp 0.5s ease-out ${i * 0.08}s both`,
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
                  <div style={{ fontSize: '2.8rem', marginBottom: '0.75rem', filter: `drop-shadow(0 0 12px ${acGlow})` }}>{m.emoji}</div>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.58rem', letterSpacing: '0.15em', color: acText, marginBottom: '0.25rem' }}>
                    {m.role}
                  </div>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                    {m.name}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Rajdhani', fontSize: '0.88rem', lineHeight: 1.4 }}>
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
