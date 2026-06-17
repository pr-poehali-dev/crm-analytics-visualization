import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const NAV = [
  { path: '/', label: 'Главная', icon: 'LayoutDashboard' },
  { path: '/analytics', label: 'Аналитика', icon: 'TrendingUp' },
  { path: '/contacts', label: 'Контакты', icon: 'Users' },
  { path: '/deals', label: 'Сделки', icon: 'Briefcase' },
  { path: '/reports', label: 'Отчёты', icon: 'FileText' },
  { path: '/settings', label: 'Настройки', icon: 'Settings' },
];

interface Props {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

const CrmLayout = ({ title, subtitle, actions, children }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground flex-col hidden md:flex">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-md bg-sidebar-primary flex items-center justify-center">
            <Icon name="Hexagon" className="text-sidebar-primary-foreground" size={20} />
          </div>
          <div>
            <p className="font-semibold text-white leading-tight tracking-tight">NORDCRM</p>
            <p className="text-[11px] text-sidebar-foreground/60 uppercase tracking-widest">Enterprise</p>
          </div>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV.map((n) => {
            const active = n.path === pathname;
            return (
              <button
                key={n.path}
                onClick={() => navigate(n.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  active
                    ? 'bg-sidebar-accent text-white font-medium'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-white'
                }`}
              >
                <Icon name={n.icon} size={18} />
                {n.label}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary" />}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center text-sm font-medium text-white">
            АС
          </div>
          <div className="min-w-0">
            <p className="text-sm text-white truncate">Анна Соколова</p>
            <p className="text-[11px] text-sidebar-foreground/60 truncate">Руководитель отдела</p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-5 md:px-8 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">{actions}</div>
        </header>
        <main className="flex-1 overflow-auto p-5 md:p-8 space-y-6">{children}</main>
      </div>
    </div>
  );
};

export default CrmLayout;
