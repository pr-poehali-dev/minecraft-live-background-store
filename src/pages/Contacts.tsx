import { useState } from 'react';
import { useTheme, THEMES } from '@/lib/ThemeContext';
import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';

export default function Contacts() {
  const { active } = useTheme();
  const T = THEMES[active];
  const [form, setForm] = useState({ name: '', email: '', topic: 'Общий вопрос', message: '' });
  const [sent, setSent] = useState(false);

  const ac = T.accent;
  const acSoft = T.accentSoft;
  const acBorder = T.accentBorder;
  const acGlow = T.accentGlow;
  const acText = T.accentText;
  const cardStyle = { background: T.bgCard, border: `1px solid ${acBorder}` };

  const inputStyle = {
    width: '100%', background: 'rgba(0,0,0,0.45)', padding: '0.75rem 1rem',
    fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', outline: 'none',
    border: `1px solid ${acBorder}`, color: '#f0f0f0', transition: 'border-color 0.3s, box-shadow 0.3s',
  } as React.CSSProperties;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = ac;
    e.target.style.boxShadow = `0 0 12px ${acSoft}`;
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = acBorder;
    e.target.style.boxShadow = 'none';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', topic: 'Общий вопрос', message: '' });
  };

  const contacts = [
    { icon: 'MessageCircle', label: 'Discord', value: 'discord.gg/gamaiclub', color: '#5865F2', desc: 'Основной чат поддержки' },
    { icon: 'Send', label: 'Telegram', value: '@gamaiclub_mc', color: '#2AABEE', desc: 'Новости и анонсы' },
    { icon: 'Mail', label: 'Email', value: 'support@gamai.club', color: acText, desc: 'Для серьёзных обращений' },
    { icon: 'Globe', label: 'Сервер', value: 'mc.gamai.club', color: '#00ff88', desc: 'Minecraft 1.21.11' },
  ];

  const faq = [
    { q: 'Как зайти на сервер?', a: 'Открой Minecraft, добавь сервер mc.gamai.club — работает Java и Bedrock.' },
    { q: 'Сколько ждать активацию покупки?', a: 'Мгновенно после оплаты — зайди в игру и получи предметы.' },
    { q: 'Что делать при баге с покупкой?', a: 'Напиши в Discord с ником и чеком — разберём в течение 1 часа.' },
    { q: 'Есть ли мобильная версия?', a: 'Да! Сервер поддерживает Bedrock Edition — заходи с телефона или планшета.' },
  ];

  return (
    <Layout>
      <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <div className="container mx-auto px-6 py-14">

          {/* Заголовок */}
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{
              display: 'inline-block',
              fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', letterSpacing: '0.2em',
              border: `1px solid ${acBorder}`, color: acText, background: acSoft,
              padding: '0.25rem 0.8rem', marginBottom: '1rem',
            }}>
              📡 СВЯЗАТЬСЯ С НАМИ
            </div>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.6rem,4vw,2.5rem)', fontWeight: 900, color: '#fff' }}>
              <span style={{ color: ac, textShadow: `0 0 20px ${acGlow}` }}>КОНТАКТЫ</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* Левая колонка */}
            <div>
              {/* Контакты */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2.5rem' }}>
                {contacts.map(c => (
                  <div
                    key={c.label}
                    style={{
                      ...cardStyle, padding: '1rem 1.1rem',
                      display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer',
                      transition: 'transform 0.25s, box-shadow 0.25s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${acSoft}`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      width: 42, height: 42, flexShrink: 0,
                      background: `${c.color}18`, border: `1px solid ${c.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name={c.icon} fallback="Globe" size={18} style={{ color: c.color }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                        <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)' }}>
                          {c.label}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>·</span>
                        <span style={{ fontFamily: 'Rajdhani', fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)' }}>
                          {c.desc}
                        </span>
                      </div>
                      <div style={{ color: c.color, fontSize: '0.95rem', fontFamily: 'Rajdhani', marginTop: '0.1rem' }}>
                        {c.value}
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={14} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <div>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.8rem', letterSpacing: '0.12em', color: acText, marginBottom: '1.25rem' }}>
                  ЧАСТЫЕ ВОПРОСЫ
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {faq.map((item, i) => (
                    <div key={i} style={{ ...cardStyle, padding: '1rem 1.1rem' }}>
                      <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', color: '#fff', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                        {item.q}
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Rajdhani', fontSize: '0.92rem', lineHeight: 1.5 }}>
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Правая: форма */}
            <div style={{ ...cardStyle, padding: '2rem' }}>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.88rem', letterSpacing: '0.1em', color: acText, marginBottom: '1.5rem' }}>
                НАПИСАТЬ НАМ
              </h3>

              {sent ? (
                <div style={{
                  padding: '3rem 1rem', textAlign: 'center',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
                }}>
                  <div style={{ fontSize: '3rem', filter: `drop-shadow(0 0 20px ${acGlow})` }}>✅</div>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.82rem', color: ac, letterSpacing: '0.1em' }}>
                    СООБЩЕНИЕ ОТПРАВЛЕНО
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Rajdhani', fontSize: '0.95rem' }}>
                    Ответим в течение нескольких часов
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { key: 'name', label: 'НИК / ИМЯ', placeholder: 'Твой ник на сервере', type: 'text' },
                    { key: 'email', label: 'EMAIL', placeholder: 'твой@email.ru', type: 'email' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.58rem', letterSpacing: '0.15em', color: `${acText}80`, display: 'block', marginBottom: '0.4rem' }}>
                        {f.label}
                      </label>
                      <input
                        required
                        type={f.type}
                        style={inputStyle}
                        placeholder={f.placeholder}
                        value={form[f.key as 'name' | 'email']}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.58rem', letterSpacing: '0.15em', color: `${acText}80`, display: 'block', marginBottom: '0.4rem' }}>
                      ТЕМА
                    </label>
                    <select
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      value={form.topic}
                      onChange={e => setForm(p => ({ ...p, topic: e.target.value }))}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      {['Общий вопрос', 'Проблема с покупкой', 'Апелляция бана', 'Баг / ошибка', 'Предложение'].map(t => (
                        <option key={t} value={t} style={{ background: '#09090f' }}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.58rem', letterSpacing: '0.15em', color: `${acText}80`, display: 'block', marginBottom: '0.4rem' }}>
                      СООБЩЕНИЕ
                    </label>
                    <textarea
                      required
                      rows={5}
                      style={{ ...inputStyle, resize: 'none' }}
                      placeholder="Подробно опиши свой вопрос..."
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      onFocus={handleFocus as React.FocusEventHandler<HTMLTextAreaElement>}
                      onBlur={handleBlur as React.FocusEventHandler<HTMLTextAreaElement>}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%', padding: '0.9rem',
                      background: ac, color: '#000',
                      fontFamily: 'Orbitron, monospace', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em',
                      border: 'none', cursor: 'pointer',
                      clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
                      boxShadow: `0 0 20px ${acGlow}`,
                      transition: 'all 0.2s',
                      marginTop: '0.25rem',
                    }}
                  >
                    ОТПРАВИТЬ СООБЩЕНИЕ
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
