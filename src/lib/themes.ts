export type ThemeKey = 'anarchy' | 'classic';

export interface Product {
  id: number;
  emoji: string;
  name: string;
  desc: string;
  basePrice: number;
  tag: string | null;
  type: 'item' | 'privilege' | 'currency';
  durations?: { label: string; multiplier: number }[];
}

export interface Theme {
  key: ThemeKey;
  label: string;
  sublabel: string;
  ip: string;
  emoji: string;
  accent: string;
  accentSoft: string;
  accentGlow: string;
  accentBorder: string;
  accentText: string;
  bgCard: string;
  bgNav: string;
  navBorder: string;
  stubClass: string;
  gridClass: string;
  scanClass: string;
  overlayClass: string;
  videoSrc: string;
  online: string;
  description: string;
  stats: { label: string; value: string }[];
  products: Product[];
  about: { icon: string; title: string; text: string }[];
  rules: { title: string; items: string[] }[];
}

const DURATION_OPTIONS = [
  { label: '30 дней', multiplier: 1 },
  { label: '60 дней', multiplier: 1.8 },
  { label: '90 дней', multiplier: 2.5 },
  { label: 'Навсегда', multiplier: 4 },
];

export const THEMES: Record<ThemeKey, Theme> = {
  anarchy: {
    key: 'anarchy',
    label: 'АНАРХИЯ',
    sublabel: 'Выживание без правил',
    ip: 'mc.gamai.club',
    emoji: '💀',
    accent: '#ff3c00',
    accentSoft: 'rgba(255,60,0,0.15)',
    accentGlow: 'rgba(255,60,0,0.5)',
    accentBorder: 'rgba(255,60,0,0.4)',
    accentText: '#ff6633',
    bgCard: 'rgba(20,5,5,0.85)',
    bgNav: 'rgba(10,2,2,0.9)',
    navBorder: 'rgba(255,60,0,0.22)',
    stubClass: 'stub-anarchy',
    gridClass: 'video-grid-anarchy',
    scanClass: 'scanline-anarchy',
    overlayClass: 'video-overlay-anarchy',
    videoSrc: '',
    online: '184',
    description: 'Полная свобода. Никаких ограничений. Только сила решает кто выживет в этом жестоком мире. PvP, рейды, грифинг — здесь всё дозволено.',
    stats: [
      { label: 'ИГРОКОВ', value: '8K+' },
      { label: 'ОНЛАЙН', value: '184' },
      { label: 'РЕЙДОВ/ДЕНЬ', value: '50+' },
    ],
    products: [
      { id: 1, emoji: '💣', name: 'Набор Рейдера', desc: 'TNT ×64, кирка Эффективность V, броня с защитой IV', basePrice: 249, tag: 'HOT', type: 'item' },
      { id: 2, emoji: '⚔️', name: 'Меч Хаоса', desc: 'Алмазный меч: Острота V, Огонь II, Добыча III', basePrice: 199, tag: 'NEW', type: 'item' },
      { id: 3, emoji: '🛡️', name: 'Броня Анархиста', desc: 'Полный комплект незеритовой брони с зачарованиями', basePrice: 599, tag: 'RARE', type: 'item' },
      { id: 4, emoji: '💰', name: 'Монеты ×5000', desc: 'Игровая валюта для торговли на сервере', basePrice: 149, tag: null, type: 'currency' },
      { id: 5, emoji: '🔥', name: 'Привилегия КРОВЬ', desc: '/god, /heal, кастомный кровавый тег, приоритет входа', basePrice: 699, tag: 'TOP', type: 'privilege', durations: DURATION_OPTIONS },
      { id: 6, emoji: '💎', name: 'Стартовый пак', desc: 'Полный набор для старта: еда, инструменты, ресурсы', basePrice: 99, tag: null, type: 'item' },
    ],
    about: [
      { icon: '💀', title: 'Полная анархия', text: 'Никаких правил, никакой защиты. Только ты и твои навыки против всего мира.' },
      { icon: '⚔️', title: 'PvP везде', text: 'Сражения разрешены в любой точке карты. Побеждает сильнейший.' },
      { icon: '🔥', title: 'Рейды и грифинг', text: 'Взрывай базы врагов, захватывай ресурсы, строй свою империю.' },
      { icon: '🌍', title: 'Огромная карта', text: '60 000×60 000 блоков. Исследуй, выживай, завоёвывай.' },
    ],
    rules: [
      {
        title: '⚔️ PvP и бои',
        items: [
          'PvP разрешён в любой точке карты без ограничений',
          'Убийство игроков при входе в игру (спавн-кил) — запрещено',
          'Читы и сторонние программы для боя — бан навсегда',
          'Баги и дюпы — немедленный бан',
        ],
      },
      {
        title: '🔥 Рейды и базы',
        items: [
          'Рейды и грифинг баз — разрешены',
          'Взрывчатка и редстоун-механизмы для разрушения — разрешены',
          'Лагающие механизмы (фермы 1000+ entity) — запрещены',
          'Блокировка спавна и порталов — запрещена',
        ],
      },
      {
        title: '💬 Чат и поведение',
        items: [
          'Реклама других серверов — бан',
          'Оскорбления по национальному/расовому признаку — мут/бан',
          'Флуд и спам — мут на 1 час',
          'Угрозы DDoS-атаками — немедленный бан',
        ],
      },
      {
        title: '🛡️ Общие правила',
        items: [
          'Аккаунт — твоя ответственность. Передача третьим лицам на свой страх и риск',
          'Обход бана с другого аккаунта — пермабан обоих аккаунтов',
          'Решение администрации — окончательное',
          'Незнание правил не освобождает от ответственности',
        ],
      },
    ],
  },

  classic: {
    key: 'classic',
    label: 'КЛАССИКА',
    sublabel: 'Ванильный выживач',
    ip: 'mc.gamai.club',
    emoji: '🌲',
    accent: '#00ff64',
    accentSoft: 'rgba(0,255,100,0.13)',
    accentGlow: 'rgba(0,255,100,0.45)',
    accentBorder: 'rgba(0,255,100,0.35)',
    accentText: '#33ff88',
    bgCard: 'rgba(3,18,8,0.85)',
    bgNav: 'rgba(2,10,5,0.9)',
    navBorder: 'rgba(0,255,100,0.2)',
    stubClass: 'stub-classic',
    gridClass: 'video-grid-classic',
    scanClass: 'scanline-classic',
    overlayClass: 'video-overlay-classic',
    videoSrc: '',
    online: '263',
    description: 'Классический выживач в лучших традициях Minecraft. Строй, торгуй, развивайся вместе с дружным сообществом без лишних сложностей.',
    stats: [
      { label: 'ИГРОКОВ', value: '12K+' },
      { label: 'ОНЛАЙН', value: '263' },
      { label: 'ПОСТРОЕК', value: '40K+' },
    ],
    products: [
      { id: 1, emoji: '🌱', name: 'Стартовый набор', desc: 'Инструменты, еда, семена для быстрого старта', basePrice: 99, tag: 'NEW', type: 'item' },
      { id: 2, emoji: '🏠', name: 'Участок земли', desc: 'Личный защищённый участок 100×100 блоков навсегда', basePrice: 349, tag: 'HOT', type: 'item' },
      { id: 3, emoji: '⛏️', name: 'Набор Шахтёра', desc: 'Незеритовая кирка с зачарованиями + фонарь', basePrice: 199, tag: null, type: 'item' },
      { id: 4, emoji: '🌾', name: 'Монеты ×5000', desc: 'Игровая валюта для торговли на аукционе', basePrice: 149, tag: null, type: 'currency' },
      { id: 5, emoji: '👑', name: 'Привилегия VIP', desc: '/fly, личный шалкер, украшения ника, приоритет входа', basePrice: 499, tag: 'TOP', type: 'privilege', durations: DURATION_OPTIONS },
      { id: 6, emoji: '🎁', name: 'Ежедневный кейс', desc: '30 дней доступа к ежедневным кейсам с призами', basePrice: 249, tag: 'RARE', type: 'item' },
    ],
    about: [
      { icon: '🌲', title: 'Ванильный геймплей', text: 'Чистый Minecraft без лишних модов. Всё как задумал Notch, только лучше.' },
      { icon: '🤝', title: 'Дружное сообщество', text: 'Помогаем новичкам, проводим ивенты, строим вместе.' },
      { icon: '🏗️', title: 'Защита построек', text: 'Гриф и кража строго запрещены. Твоя постройка в безопасности.' },
      { icon: '🎉', title: 'Еженедельные ивенты', text: 'Турниры по строительству, охота за сокровищами, конкурсы.' },
    ],
    rules: [
      {
        title: '🏗️ Строительство',
        items: [
          'Запрещено строить вблизи чужих построек без разрешения (ближе 100 блоков)',
          'Гриф, кража и уничтожение чужих построек — бан',
          'Лагающие фермы (500+ entity в одном чанке) — предупреждение, затем бан',
          'Постройки непристойного содержания — удаление и бан',
        ],
      },
      {
        title: '🤝 Торговля и экономика',
        items: [
          'Мошенничество в торговле — бан на 7 дней, повторно — навсегда',
          'Дюп предметов любым способом — немедленный бан',
          'Накрутка аукциона фейковыми ставками — бан',
          'Передача предметов за реальные деньги вне магазина — запрещено',
        ],
      },
      {
        title: '💬 Общение',
        items: [
          'Флуд, спам, капс (более 5 сообщений подряд) — мут 30 минут',
          'Оскорбления и токсичность — мут до 24 часов',
          'Реклама других серверов — немедленный бан',
          'Разжигание конфликтов в чате — мут на усмотрение модератора',
        ],
      },
      {
        title: '🛡️ Общие',
        items: [
          'Читы, макросы, автокликеры — бан навсегда',
          'Вход под чужим ником — бан обоих аккаунтов',
          'Обход любого наказания — удвоение срока',
          'Администрация вправе изменить правила без предупреждения',
        ],
      },
    ],
  },
};

export const SWITCH_INTERVAL = 10000;
