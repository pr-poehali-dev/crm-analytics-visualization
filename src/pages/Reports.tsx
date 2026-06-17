import { useState } from 'react';
import Icon from '@/components/ui/icon';
import CrmLayout from '@/components/CrmLayout';

interface Report {
  id: number;
  title: string;
  category: 'Продажи' | 'Финансы' | 'Клиенты' | 'Менеджеры';
  period: string;
  format: 'PDF' | 'XLSX' | 'CSV';
  size: string;
  date: string;
  author: string;
}

const REPORTS: Report[] = [
  { id: 1, title: 'Отчёт по продажам за сентябрь', category: 'Продажи', period: 'Сентябрь 2026', format: 'PDF', size: '1,2 МБ', date: '16.09.2026', author: 'Соколова А.' },
  { id: 2, title: 'Финансовая сводка Q3', category: 'Финансы', period: 'III квартал', format: 'XLSX', size: '840 КБ', date: '14.09.2026', author: 'Морозова Е.' },
  { id: 3, title: 'Анализ клиентской базы', category: 'Клиенты', period: 'Полгода', format: 'PDF', size: '2,4 МБ', date: '10.09.2026', author: 'Громова Е.' },
  { id: 4, title: 'Эффективность менеджеров', category: 'Менеджеры', period: 'Август 2026', format: 'XLSX', size: '560 КБ', date: '02.09.2026', author: 'Петров И.' },
  { id: 5, title: 'Воронка продаж и конверсия', category: 'Продажи', period: 'Месяц', format: 'CSV', size: '128 КБ', date: '28.08.2026', author: 'Климов Д.' },
  { id: 6, title: 'Дебиторская задолженность', category: 'Финансы', period: 'Год', format: 'PDF', size: '1,8 МБ', date: '20.08.2026', author: 'Морозова Е.' },
];

const TEMPLATES = [
  { title: 'Сводка по продажам', icon: 'TrendingUp', desc: 'Выручка, сделки и динамика' },
  { title: 'Финансовый отчёт', icon: 'Wallet', desc: 'Доходы, расходы, прибыль' },
  { title: 'Отчёт по клиентам', icon: 'Users', desc: 'Сегменты и активность базы' },
  { title: 'KPI менеджеров', icon: 'Award', desc: 'План, факт, конверсия' },
];

const CATEGORIES = ['Все категории', 'Продажи', 'Финансы', 'Клиенты', 'Менеджеры'] as const;

const CAT_META: Record<Report['category'], string> = {
  'Продажи': 'bg-primary/10 text-primary',
  'Финансы': 'bg-emerald-100 text-emerald-700',
  'Клиенты': 'bg-sky-100 text-sky-700',
  'Менеджеры': 'bg-accent/15 text-amber-700',
};

const FORMAT_ICON: Record<Report['format'], string> = { PDF: 'FileText', XLSX: 'FileSpreadsheet', CSV: 'FileType' };

const Reports = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('Все категории');

  const filtered = REPORTS.filter((r) => {
    const q = query.trim().toLowerCase();
    const matchQ = !q || r.title.toLowerCase().includes(q) || r.author.toLowerCase().includes(q);
    const matchCat = category === 'Все категории' || r.category === category;
    return matchQ && matchCat;
  });

  const actions = (
    <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2">
      <Icon name="FilePlus" size={16} /> <span className="hidden sm:inline">Создать отчёт</span>
    </button>
  );

  return (
    <CrmLayout title="Отчёты" subtitle={`Сохранённых отчётов: ${REPORTS.length}`} actions={actions}>
      <section>
        <h2 className="font-semibold tracking-tight mb-3">Быстрые шаблоны</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {TEMPLATES.map((t, i) => (
            <button key={t.title} className="bg-card border border-border rounded-lg p-5 text-left hover:shadow-md hover:border-primary/30 transition-all animate-fade-in opacity-0" style={{ animationDelay: `${i * 70}ms` }}>
              <span className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-primary mb-3"><Icon name={t.icon} size={20} /></span>
              <p className="font-medium tracking-tight">{t.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{t.desc}</p>
            </button>
          ))}
        </div>
      </section>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-5 border-b border-border flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск по названию или автору…" className="w-full h-9 pl-9 pr-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)} className="h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/30">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground bg-secondary/50">
                <th className="font-medium px-5 py-3">Отчёт</th>
                <th className="font-medium px-5 py-3 hidden md:table-cell">Категория</th>
                <th className="font-medium px-5 py-3 hidden lg:table-cell">Период</th>
                <th className="font-medium px-5 py-3 hidden sm:table-cell">Дата</th>
                <th className="font-medium px-5 py-3 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-secondary/40 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center text-primary shrink-0"><Icon name={FORMAT_ICON[r.format]} size={17} /></span>
                      <div>
                        <p className="font-medium leading-tight">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.format} · {r.size} · {r.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CAT_META[r.category]}`}>{r.category}</span>
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell text-muted-foreground">{r.period}</td>
                  <td className="px-5 py-3 hidden sm:table-cell text-muted-foreground font-mono text-xs">{r.date}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="w-8 h-8 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground transition-colors" title="Скачать"><Icon name="Download" size={16} /></button>
                      <button className="w-8 h-8 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground transition-colors" title="Поделиться"><Icon name="Share2" size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-muted-foreground"><Icon name="FileSearch" size={28} className="mx-auto mb-2 opacity-50" />Отчёты не найдены</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </CrmLayout>
  );
};

export default Reports;
