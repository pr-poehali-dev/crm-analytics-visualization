import { useState } from 'react';
import Icon from '@/components/ui/icon';
import CrmLayout from '@/components/CrmLayout';
import {
  AreaChart, Area, BarChart, Bar, FunnelChart, Funnel, LabelList,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const KPI = [
  { label: 'Выручка за месяц', value: '₽ 4 280 000', delta: '+12,4%', up: true, icon: 'Wallet' },
  { label: 'Новые сделки', value: '128', delta: '+8,1%', up: true, icon: 'Briefcase' },
  { label: 'Активные контакты', value: '1 942', delta: '+3,6%', up: true, icon: 'Users' },
  { label: 'Конверсия', value: '24,7%', delta: '−1,2%', up: false, icon: 'Target' },
];

const REVENUE = [
  { m: 'Янв', v: 2.4 }, { m: 'Фев', v: 2.9 }, { m: 'Мар', v: 3.1 },
  { m: 'Апр', v: 2.8 }, { m: 'Май', v: 3.6 }, { m: 'Июн', v: 3.4 },
  { m: 'Июл', v: 4.0 }, { m: 'Авг', v: 3.8 }, { m: 'Сен', v: 4.28 },
];

const MANAGERS = [
  { name: 'Соколова А.', v: 1240 }, { name: 'Петров И.', v: 980 },
  { name: 'Громова Е.', v: 870 }, { name: 'Климов Д.', v: 640 },
  { name: 'Орлова М.', v: 550 },
];

const FUNNEL = [
  { name: 'Заявки', value: 1200, fill: 'hsl(215 60% 22%)' },
  { name: 'Квалификация', value: 820, fill: 'hsl(215 55% 34%)' },
  { name: 'Презентация', value: 560, fill: 'hsl(38 80% 48%)' },
  { name: 'Переговоры', value: 340, fill: 'hsl(38 88% 52%)' },
  { name: 'Закрыто', value: 296, fill: 'hsl(150 55% 38%)' },
];

const DEALS = [
  { id: 'D-1042', company: 'ООО «Меридиан»', manager: 'Соколова А.', amount: 540000, stage: 'Переговоры', status: 'active' },
  { id: 'D-1041', company: 'АО «Вектор»', manager: 'Петров И.', amount: 320000, stage: 'Закрыто', status: 'won' },
  { id: 'D-1039', company: 'ИП Кузнецов', manager: 'Громова Е.', amount: 85000, stage: 'Квалификация', status: 'active' },
  { id: 'D-1037', company: 'ООО «Стройинвест»', manager: 'Климов Д.', amount: 1200000, stage: 'Презентация', status: 'active' },
  { id: 'D-1035', company: 'ЗАО «Технопарк»', manager: 'Орлова М.', amount: 67000, stage: 'Отказ', status: 'lost' },
  { id: 'D-1033', company: 'ООО «Логистик+»', manager: 'Соколова А.', amount: 410000, stage: 'Переговоры', status: 'active' },
];

const STATUS_META: Record<string, { label: string; cls: string }> = {
  active: { label: 'В работе', cls: 'bg-primary/10 text-primary' },
  won: { label: 'Выиграна', cls: 'bg-emerald-100 text-emerald-700' },
  lost: { label: 'Проиграна', cls: 'bg-red-100 text-red-700' },
};

const STAGES = ['Все этапы', 'Квалификация', 'Презентация', 'Переговоры', 'Закрыто', 'Отказ'];

function fmt(n: number) {
  return '₽ ' + n.toLocaleString('ru-RU');
}

const Index = () => {
  const [query, setQuery] = useState('');
  const [stage, setStage] = useState('Все этапы');
  const [status, setStatus] = useState('all');

  const filtered = DEALS.filter((d) => {
    const q = query.trim().toLowerCase();
    const matchQ = !q || d.company.toLowerCase().includes(q) || d.manager.toLowerCase().includes(q) || d.id.toLowerCase().includes(q);
    const matchStage = stage === 'Все этапы' || d.stage === stage;
    const matchStatus = status === 'all' || d.status === status;
    return matchQ && matchStage && matchStatus;
  });

  const actions = (
    <>
      <button className="h-9 px-3 rounded-md border border-border bg-card hover:bg-secondary transition-colors text-sm flex items-center gap-2">
        <Icon name="Calendar" size={16} /> <span className="hidden sm:inline">30 дней</span>
      </button>
      <button className="h-9 w-9 rounded-md border border-border bg-card hover:bg-secondary transition-colors flex items-center justify-center relative">
        <Icon name="Bell" size={16} />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent" />
      </button>
      <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2">
        <Icon name="Plus" size={16} /> <span className="hidden sm:inline">Новая сделка</span>
      </button>
    </>
  );

  return (
    <CrmLayout title="Панель управления" subtitle="Обзор продаж · Сентябрь 2026" actions={actions}>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI.map((k, i) => (
          <div
            key={k.label}
            className="bg-card border border-border rounded-lg p-5 animate-fade-in opacity-0"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-primary">
                <Icon name={k.icon} size={20} />
              </span>
              <span className={`text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1 ${
                k.up ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
              }`}>
                <Icon name={k.up ? 'ArrowUpRight' : 'ArrowDownRight'} size={13} /> {k.delta}
              </span>
            </div>
            <p className="text-2xl font-semibold tracking-tight font-mono">{k.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{k.label}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold tracking-tight">Динамика выручки</h2>
              <p className="text-xs text-muted-foreground">млн ₽ по месяцам</p>
            </div>
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-primary" /> 2026
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={REVENUE} margin={{ left: -20, right: 8 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(215 60% 22%)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="hsl(215 60% 22%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 24% 90%)" vertical={false} />
              <XAxis dataKey="m" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(215 16% 47%)" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(215 16% 47%)" />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid hsl(214 24% 88%)', fontSize: 13 }}
                formatter={(v: number) => [`${v} млн ₽`, 'Выручка']}
              />
              <Area type="monotone" dataKey="v" stroke="hsl(215 60% 22%)" strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-semibold tracking-tight mb-1">Воронка продаж</h2>
          <p className="text-xs text-muted-foreground mb-3">конверсия по этапам</p>
          <ResponsiveContainer width="100%" height={230}>
            <FunnelChart>
              <Tooltip formatter={(v: number) => [v, 'Сделок']} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              <Funnel dataKey="value" data={FUNNEL} isAnimationActive>
                <LabelList position="right" fill="hsl(215 35% 15%)" stroke="none" dataKey="name" fontSize={11} />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-semibold tracking-tight mb-1">Лидеры продаж</h2>
          <p className="text-xs text-muted-foreground mb-4">тыс. ₽ за месяц</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MANAGERS} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 24% 90%)" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} stroke="hsl(215 16% 47%)" />
              <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} fontSize={11} width={80} stroke="hsl(215 16% 47%)" />
              <Tooltip cursor={{ fill: 'hsl(210 30% 96%)' }} contentStyle={{ borderRadius: 8, fontSize: 13 }} formatter={(v: number) => [`${v} тыс ₽`, '']} />
              <Bar dataKey="v" radius={[0, 4, 4, 0]}>
                {MANAGERS.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? 'hsl(38 88% 52%)' : 'hsl(215 55% 34%)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-5 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold tracking-tight">Сделки</h2>
                <p className="text-xs text-muted-foreground">Найдено: {filtered.length}</p>
              </div>
              <button className="text-sm text-primary hover:underline flex items-center gap-1">
                Все сделки <Icon name="ArrowRight" size={14} />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск по компании, менеджеру, ID…"
                  className="w-full h-9 pl-9 pr-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
                />
              </div>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/30"
              >
                {STAGES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/30"
              >
                <option value="all">Любой статус</option>
                <option value="active">В работе</option>
                <option value="won">Выиграна</option>
                <option value="lost">Проиграна</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground bg-secondary/50">
                  <th className="font-medium px-5 py-3">ID</th>
                  <th className="font-medium px-5 py-3">Компания</th>
                  <th className="font-medium px-5 py-3 hidden sm:table-cell">Менеджер</th>
                  <th className="font-medium px-5 py-3">Сумма</th>
                  <th className="font-medium px-5 py-3">Статус</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id} className="border-t border-border hover:bg-secondary/40 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{d.id}</td>
                    <td className="px-5 py-3 font-medium">{d.company}</td>
                    <td className="px-5 py-3 hidden sm:table-cell text-muted-foreground">{d.manager}</td>
                    <td className="px-5 py-3 font-mono">{fmt(d.amount)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_META[d.status].cls}`}>
                        {STATUS_META[d.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-muted-foreground">
                      <Icon name="SearchX" size={28} className="mx-auto mb-2 opacity-50" />
                      Сделки не найдены
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </CrmLayout>
  );
};

export default Index;
