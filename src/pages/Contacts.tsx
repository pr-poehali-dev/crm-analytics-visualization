import { useState } from 'react';
import Icon from '@/components/ui/icon';
import CrmLayout from '@/components/CrmLayout';

interface Contact {
  id: number;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  city: string;
  segment: 'vip' | 'partner' | 'lead' | 'inactive';
  manager: string;
  deals: number;
  revenue: number;
}

const CONTACTS: Contact[] = [
  { id: 1, name: 'Дмитрий Власов', company: 'ООО «Меридиан»', position: 'Ген. директор', email: 'vlasov@meridian.ru', phone: '+7 495 120-44-12', city: 'Москва', segment: 'vip', manager: 'Соколова А.', deals: 8, revenue: 2400000 },
  { id: 2, name: 'Елена Морозова', company: 'АО «Вектор»', position: 'Финдиректор', email: 'morozova@vector.ru', phone: '+7 812 330-21-09', city: 'Санкт-Петербург', segment: 'partner', manager: 'Петров И.', deals: 5, revenue: 1180000 },
  { id: 3, name: 'Андрей Кузнецов', company: 'ИП Кузнецов', position: 'Владелец', email: 'kuznetsov@mail.ru', phone: '+7 343 210-87-65', city: 'Екатеринбург', segment: 'lead', manager: 'Громова Е.', deals: 1, revenue: 85000 },
  { id: 4, name: 'Ольга Никитина', company: 'ООО «Стройинвест»', position: 'Коммерч. директор', email: 'nikitina@stroyinvest.ru', phone: '+7 495 778-90-11', city: 'Москва', segment: 'vip', manager: 'Климов Д.', deals: 12, revenue: 4100000 },
  { id: 5, name: 'Сергей Орлов', company: 'ЗАО «Технопарк»', position: 'Менеджер закупок', email: 'orlov@technopark.ru', phone: '+7 383 445-12-30', city: 'Новосибирск', segment: 'inactive', manager: 'Орлова М.', deals: 2, revenue: 67000 },
  { id: 6, name: 'Марина Лебедева', company: 'ООО «Логистик+»', position: 'Директор', email: 'lebedeva@logistic.ru', phone: '+7 861 220-55-78', city: 'Краснодар', segment: 'partner', manager: 'Соколова А.', deals: 6, revenue: 980000 },
  { id: 7, name: 'Игорь Соловьёв', company: 'ООО «Альфа-Трейд»', position: 'Зам. директора', email: 'solovyov@alfa.ru', phone: '+7 846 119-23-44', city: 'Самара', segment: 'lead', manager: 'Петров И.', deals: 0, revenue: 0 },
  { id: 8, name: 'Татьяна Громова', company: 'АО «ПромРесурс»', position: 'Ген. директор', email: 'gromova@promresurs.ru', phone: '+7 831 200-77-90', city: 'Нижний Новгород', segment: 'vip', manager: 'Громова Е.', deals: 9, revenue: 1850000 },
];

const SEGMENT_META: Record<Contact['segment'], { label: string; cls: string }> = {
  vip: { label: 'VIP-клиент', cls: 'bg-accent/15 text-amber-700' },
  partner: { label: 'Партнёр', cls: 'bg-primary/10 text-primary' },
  lead: { label: 'Лид', cls: 'bg-sky-100 text-sky-700' },
  inactive: { label: 'Неактивен', cls: 'bg-secondary text-muted-foreground' },
};

const CITIES = ['Все города', 'Москва', 'Санкт-Петербург', 'Екатеринбург', 'Новосибирск', 'Краснодар', 'Самара', 'Нижний Новгород'];
const MANAGERS = ['Все менеджеры', 'Соколова А.', 'Петров И.', 'Громова Е.', 'Климов Д.', 'Орлова М.'];

function fmt(n: number) {
  return '₽ ' + n.toLocaleString('ru-RU');
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('');
}

const Contacts = () => {
  const [query, setQuery] = useState('');
  const [segment, setSegment] = useState<'all' | Contact['segment']>('all');
  const [city, setCity] = useState('Все города');
  const [manager, setManager] = useState('Все менеджеры');
  const [sort, setSort] = useState<'revenue' | 'deals' | 'name'>('revenue');

  const filtered = CONTACTS.filter((c) => {
    const q = query.trim().toLowerCase();
    const matchQ = !q || c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
    const matchSeg = segment === 'all' || c.segment === segment;
    const matchCity = city === 'Все города' || c.city === city;
    const matchMgr = manager === 'Все менеджеры' || c.manager === manager;
    return matchQ && matchSeg && matchCity && matchMgr;
  }).sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'deals') return b.deals - a.deals;
    return b.revenue - a.revenue;
  });

  const hasFilters = query || segment !== 'all' || city !== 'Все города' || manager !== 'Все менеджеры';
  const reset = () => { setQuery(''); setSegment('all'); setCity('Все города'); setManager('Все менеджеры'); };

  const SEGMENTS: ('all' | Contact['segment'])[] = ['all', 'vip', 'partner', 'lead', 'inactive'];
  const segLabel = (s: 'all' | Contact['segment']) => s === 'all' ? 'Все' : SEGMENT_META[s].label;

  const actions = (
    <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2">
      <Icon name="UserPlus" size={16} /> <span className="hidden sm:inline">Добавить контакт</span>
    </button>
  );

  return (
    <CrmLayout title="Контакты" subtitle={`Всего записей: ${CONTACTS.length}`} actions={actions}>
      {/* Segment tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {SEGMENTS.map((s) => (
          <button
            key={s}
            onClick={() => setSegment(s)}
            className={`px-3.5 py-1.5 rounded-md text-sm transition-colors border ${
              segment === s
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border text-muted-foreground hover:bg-secondary'
            }`}
          >
            {segLabel(s)}
            <span className={`ml-1.5 text-xs ${segment === s ? 'text-primary-foreground/70' : 'text-muted-foreground/60'}`}>
              {s === 'all' ? CONTACTS.length : CONTACTS.filter((c) => c.segment === s).length}
            </span>
          </button>
        ))}
      </div>

      {/* Filters bar */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-2.5">
          <div className="relative flex-1">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Имя, компания или email…"
              className="w-full h-9 pl-9 pr-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
            />
          </div>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/30">
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={manager} onChange={(e) => setManager(e.target.value)} className="h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/30">
            {MANAGERS.map((m) => <option key={m}>{m}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/30">
            <option value="revenue">По выручке</option>
            <option value="deals">По числу сделок</option>
            <option value="name">По имени</option>
          </select>
          {hasFilters && (
            <button onClick={reset} className="h-9 px-3 rounded-md border border-border bg-card hover:bg-secondary transition-colors text-sm flex items-center gap-1.5 text-muted-foreground">
              <Icon name="X" size={15} /> Сбросить
            </button>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Найдено контактов: <span className="font-medium text-foreground">{filtered.length}</span></p>
      </div>

      {/* Cards grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c, i) => (
          <div
            key={c.id}
            className="bg-card border border-border rounded-lg p-5 hover:shadow-md hover:border-primary/30 transition-all animate-fade-in opacity-0"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium shrink-0">
                {initials(c.name)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold tracking-tight truncate">{c.name}</h3>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${SEGMENT_META[c.segment].cls}`}>
                    {SEGMENT_META[c.segment].label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{c.position}</p>
                <p className="text-sm text-foreground truncate">{c.company}</p>
              </div>
            </div>

            <div className="mt-4 space-y-1.5 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground"><Icon name="Mail" size={14} /> <span className="truncate">{c.email}</span></p>
              <p className="flex items-center gap-2 text-muted-foreground"><Icon name="Phone" size={14} /> <span className="font-mono text-xs">{c.phone}</span></p>
              <p className="flex items-center gap-2 text-muted-foreground"><Icon name="MapPin" size={14} /> {c.city}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Выручка</p>
                <p className="font-semibold font-mono text-sm">{fmt(c.revenue)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Сделок</p>
                <p className="font-semibold text-sm">{c.deals}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Менеджер</p>
                <p className="font-medium text-sm">{c.manager}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="bg-card border border-border rounded-lg py-16 text-center text-muted-foreground">
          <Icon name="UserX" size={32} className="mx-auto mb-3 opacity-50" />
          <p>По заданным фильтрам контакты не найдены</p>
          <button onClick={reset} className="mt-3 text-sm text-primary hover:underline">Сбросить фильтры</button>
        </div>
      )}
    </CrmLayout>
  );
};

export default Contacts;
