import { useState } from 'react';
import Icon from '@/components/ui/icon';
import CrmLayout from '@/components/CrmLayout';

interface Deal {
  id: string;
  company: string;
  title: string;
  manager: string;
  amount: number;
  stage: string;
  priority: 'high' | 'medium' | 'low';
  due: string;
}

const STAGES = [
  { key: 'Квалификация', accent: 'hsl(215 55% 34%)' },
  { key: 'Презентация', accent: 'hsl(38 80% 48%)' },
  { key: 'Переговоры', accent: 'hsl(38 88% 52%)' },
  { key: 'Закрыто', accent: 'hsl(150 55% 38%)' },
];

const DEALS: Deal[] = [
  { id: 'D-1042', company: 'ООО «Меридиан»', title: 'Внедрение ERP', manager: 'Соколова А.', amount: 540000, stage: 'Переговоры', priority: 'high', due: '24 сен' },
  { id: 'D-1041', company: 'АО «Вектор»', title: 'Годовая лицензия', manager: 'Петров И.', amount: 320000, stage: 'Закрыто', priority: 'medium', due: '18 сен' },
  { id: 'D-1039', company: 'ИП Кузнецов', title: 'Консультация', manager: 'Громова Е.', amount: 85000, stage: 'Квалификация', priority: 'low', due: '30 сен' },
  { id: 'D-1037', company: 'ООО «Стройинвест»', title: 'Поставка оборудования', manager: 'Климов Д.', amount: 1200000, stage: 'Презентация', priority: 'high', due: '02 окт' },
  { id: 'D-1033', company: 'ООО «Логистик+»', title: 'Интеграция API', manager: 'Соколова А.', amount: 410000, stage: 'Переговоры', priority: 'medium', due: '27 сен' },
  { id: 'D-1031', company: 'АО «ПромРесурс»', title: 'Расширение тарифа', manager: 'Громова Е.', amount: 230000, stage: 'Квалификация', priority: 'medium', due: '05 окт' },
  { id: 'D-1029', company: 'ООО «Альфа-Трейд»', title: 'Пилотный проект', manager: 'Петров И.', amount: 150000, stage: 'Презентация', priority: 'low', due: '08 окт' },
  { id: 'D-1027', company: 'ЗАО «Технопарк»', title: 'Доп. модули', manager: 'Климов Д.', amount: 670000, stage: 'Закрыто', priority: 'high', due: '15 сен' },
];

const PRIORITY: Record<Deal['priority'], { label: string; cls: string }> = {
  high: { label: 'Высокий', cls: 'bg-red-100 text-red-700' },
  medium: { label: 'Средний', cls: 'bg-accent/15 text-amber-700' },
  low: { label: 'Низкий', cls: 'bg-secondary text-muted-foreground' },
};

const MANAGERS = ['Все менеджеры', 'Соколова А.', 'Петров И.', 'Громова Е.', 'Климов Д.'];

function fmt(n: number) {
  return '₽ ' + n.toLocaleString('ru-RU');
}

const Deals = () => {
  const [query, setQuery] = useState('');
  const [manager, setManager] = useState('Все менеджеры');
  const [priority, setPriority] = useState<'all' | Deal['priority']>('all');

  const filtered = DEALS.filter((d) => {
    const q = query.trim().toLowerCase();
    const matchQ = !q || d.company.toLowerCase().includes(q) || d.title.toLowerCase().includes(q) || d.id.toLowerCase().includes(q);
    const matchMgr = manager === 'Все менеджеры' || d.manager === manager;
    const matchPr = priority === 'all' || d.priority === priority;
    return matchQ && matchMgr && matchPr;
  });

  const total = filtered.reduce((s, d) => s + d.amount, 0);

  const actions = (
    <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2">
      <Icon name="Plus" size={16} /> <span className="hidden sm:inline">Новая сделка</span>
    </button>
  );

  return (
    <CrmLayout title="Сделки" subtitle={`В работе: ${fmt(total)}`} actions={actions}>
      <div className="bg-card border border-border rounded-lg p-4 flex flex-col lg:flex-row gap-2.5">
        <div className="relative flex-1">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Компания, название или ID сделки…"
            className="w-full h-9 pl-9 pr-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
          />
        </div>
        <select value={manager} onChange={(e) => setManager(e.target.value)} className="h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/30">
          {MANAGERS.map((m) => <option key={m}>{m}</option>)}
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value as typeof priority)} className="h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/30">
          <option value="all">Любой приоритет</option>
          <option value="high">Высокий</option>
          <option value="medium">Средний</option>
          <option value="low">Низкий</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {STAGES.map((st) => {
          const cards = filtered.filter((d) => d.stage === st.key);
          const sum = cards.reduce((s, d) => s + d.amount, 0);
          return (
            <div key={st.key} className="flex flex-col">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: st.accent }} />
                  <h3 className="font-semibold tracking-tight text-sm">{st.key}</h3>
                  <span className="text-xs text-muted-foreground">{cards.length}</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">{fmt(sum)}</span>
              </div>
              <div className="flex-1 space-y-3 bg-secondary/40 rounded-lg p-3 min-h-[120px]">
                {cards.map((d, i) => (
                  <div
                    key={d.id}
                    className="bg-card border border-border rounded-md p-3.5 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer animate-fade-in opacity-0"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[11px] text-muted-foreground">{d.id}</span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${PRIORITY[d.priority].cls}`}>
                        {PRIORITY[d.priority].label}
                      </span>
                    </div>
                    <p className="font-medium text-sm leading-tight">{d.title}</p>
                    <p className="text-xs text-muted-foreground mb-3">{d.company}</p>
                    <p className="font-semibold font-mono text-sm mb-3">{fmt(d.amount)}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                      <span className="flex items-center gap-1"><Icon name="User" size={12} /> {d.manager}</span>
                      <span className="flex items-center gap-1"><Icon name="Clock" size={12} /> {d.due}</span>
                    </div>
                  </div>
                ))}
                {cards.length === 0 && (
                  <p className="text-xs text-muted-foreground/70 text-center py-6">Нет сделок</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </CrmLayout>
  );
};

export default Deals;
