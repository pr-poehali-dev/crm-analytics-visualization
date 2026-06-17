import { useState } from 'react';
import Icon from '@/components/ui/icon';
import CrmLayout from '@/components/CrmLayout';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend,
} from 'recharts';

const KPI = [
  { label: 'Средний чек', value: '₽ 334 200', delta: '+5,8%', up: true, icon: 'Receipt' },
  { label: 'Цикл сделки', value: '18 дней', delta: '−2 дня', up: true, icon: 'Timer' },
  { label: 'Win Rate', value: '24,7%', delta: '−1,2%', up: false, icon: 'Trophy' },
  { label: 'LTV клиента', value: '₽ 1,2 млн', delta: '+9,4%', up: true, icon: 'HeartHandshake' },
];

const TREND = [
  { m: 'Апр', won: 18, lost: 9 }, { m: 'Май', won: 24, lost: 11 },
  { m: 'Июн', won: 21, lost: 8 }, { m: 'Июл', won: 29, lost: 12 },
  { m: 'Авг', won: 26, lost: 10 }, { m: 'Сен', won: 32, lost: 7 },
];

const SOURCES = [
  { name: 'Сайт', value: 42, fill: 'hsl(215 60% 22%)' },
  { name: 'Рекомендации', value: 27, fill: 'hsl(215 55% 38%)' },
  { name: 'Реклама', value: 19, fill: 'hsl(38 88% 52%)' },
  { name: 'Холодные звонки', value: 12, fill: 'hsl(215 20% 65%)' },
];

const CHANNELS = [
  { ch: 'Email', v: 38 }, { ch: 'Звонки', v: 52 },
  { ch: 'Встречи', v: 24 }, { ch: 'Мессенджеры', v: 41 },
];

const GOALS = [
  { name: 'План месяца', value: 86, fill: 'hsl(38 88% 52%)' },
  { name: 'Новые клиенты', value: 64, fill: 'hsl(215 60% 22%)' },
  { name: 'Удержание', value: 92, fill: 'hsl(150 55% 38%)' },
];

const Analytics = () => {
  const [period, setPeriod] = useState('Полгода');

  const actions = (
    <select value={period} onChange={(e) => setPeriod(e.target.value)} className="h-9 px-3 rounded-md border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-ring/30">
      <option>Месяц</option>
      <option>Квартал</option>
      <option>Полгода</option>
      <option>Год</option>
    </select>
  );

  return (
    <CrmLayout title="Аналитика" subtitle={`Период: ${period.toLowerCase()}`} actions={actions}>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI.map((k, i) => (
          <div key={k.label} className="bg-card border border-border rounded-lg p-5 animate-fade-in opacity-0" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-primary"><Icon name={k.icon} size={20} /></span>
              <span className={`text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1 ${k.up ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>
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
          <h2 className="font-semibold tracking-tight mb-1">Выигранные и проигранные сделки</h2>
          <p className="text-xs text-muted-foreground mb-4">количество по месяцам</p>
          <ResponsiveContainer width="100%" height={270}>
            <LineChart data={TREND} margin={{ left: -20, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 24% 90%)" vertical={false} />
              <XAxis dataKey="m" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(215 16% 47%)" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(215 16% 47%)" />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="won" name="Выиграно" stroke="hsl(150 55% 38%)" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="lost" name="Проиграно" stroke="hsl(0 72% 55%)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-semibold tracking-tight mb-1">Источники лидов</h2>
          <p className="text-xs text-muted-foreground mb-2">% от общего числа</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={SOURCES} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {SOURCES.map((s, i) => <Cell key={i} fill={s.fill} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`, '']} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-semibold tracking-tight mb-1">Активность по каналам</h2>
          <p className="text-xs text-muted-foreground mb-4">касаний за период</p>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={CHANNELS} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 24% 90%)" vertical={false} />
              <XAxis dataKey="ch" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(215 16% 47%)" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(215 16% 47%)" />
              <Tooltip cursor={{ fill: 'hsl(210 30% 96%)' }} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              <Bar dataKey="v" name="Касаний" fill="hsl(215 60% 22%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-semibold tracking-tight mb-1">Выполнение целей</h2>
          <p className="text-xs text-muted-foreground mb-4">% достижения KPI</p>
          <ResponsiveContainer width="100%" height={230}>
            <RadialBarChart innerRadius="30%" outerRadius="100%" data={GOALS} startAngle={90} endAngle={-270}>
              <RadialBar background dataKey="value" cornerRadius={6} />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => [`${v}%`, '']} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </CrmLayout>
  );
};

export default Analytics;
