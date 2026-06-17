import { useState } from 'react';
import Icon from '@/components/ui/icon';
import CrmLayout from '@/components/CrmLayout';

const TABS = [
  { id: 'profile', label: 'Профиль', icon: 'User' },
  { id: 'company', label: 'Компания', icon: 'Building2' },
  { id: 'notifications', label: 'Уведомления', icon: 'Bell' },
  { id: 'security', label: 'Безопасность', icon: 'ShieldCheck' },
];

const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
  <button onClick={onClick} className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${on ? 'bg-primary' : 'bg-border'}`}>
    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
  </button>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="text-sm text-muted-foreground mb-1.5 block">{label}</label>
    <input defaultValue={value} className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring" />
  </div>
);

const Settings = () => {
  const [tab, setTab] = useState('profile');
  const [notif, setNotif] = useState({ email: true, deals: true, weekly: false, mentions: true });

  const NOTIF_ITEMS = [
    { key: 'email' as const, title: 'Email-уведомления', desc: 'Получать письма о важных событиях' },
    { key: 'deals' as const, title: 'Новые сделки', desc: 'Оповещать о поступлении заявок' },
    { key: 'weekly' as const, title: 'Еженедельный отчёт', desc: 'Сводка по продажам каждый понедельник' },
    { key: 'mentions' as const, title: 'Упоминания', desc: 'Когда коллега отмечает вас в комментарии' },
  ];

  const actions = (
    <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2">
      <Icon name="Save" size={16} /> <span className="hidden sm:inline">Сохранить</span>
    </button>
  );

  return (
    <CrmLayout title="Настройки" subtitle="Управление аккаунтом и компанией" actions={actions}>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
        <nav className="bg-card border border-border rounded-lg p-2 h-fit flex lg:flex-col gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm transition-colors whitespace-nowrap ${tab === t.id ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:bg-secondary'}`}>
              <Icon name={t.icon} size={17} /> {t.label}
            </button>
          ))}
        </nav>

        <div className="bg-card border border-border rounded-lg p-6 animate-fade-in opacity-0" style={{ animationDelay: '60ms' }}>
          {tab === 'profile' && (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-medium">АС</div>
                <button className="h-9 px-4 rounded-md border border-border hover:bg-secondary transition-colors text-sm flex items-center gap-2"><Icon name="Upload" size={15} /> Загрузить фото</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Имя" value="Анна" />
                <Field label="Фамилия" value="Соколова" />
                <Field label="Email" value="sokolova@nordcrm.ru" />
                <Field label="Телефон" value="+7 495 120-00-01" />
                <Field label="Должность" value="Руководитель отдела" />
                <Field label="Город" value="Москва" />
              </div>
            </div>
          )}

          {tab === 'company' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Название компании" value="NORDCRM Enterprise" />
              <Field label="ИНН" value="7701234567" />
              <Field label="Сайт" value="nordcrm.ru" />
              <Field label="Часовой пояс" value="GMT+3 Москва" />
              <Field label="Юридический адрес" value="г. Москва, ул. Тверская, 1" />
              <Field label="Валюта" value="Российский рубль (₽)" />
            </div>
          )}

          {tab === 'notifications' && (
            <div className="space-y-1">
              {NOTIF_ITEMS.map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Toggle on={notif[item.key]} onClick={() => setNotif((p) => ({ ...p, [item.key]: !p[item.key] }))} />
                </div>
              ))}
            </div>
          )}

          {tab === 'security' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Текущий пароль" value="" />
                <Field label="Новый пароль" value="" />
              </div>
              <div className="flex items-center justify-between py-3.5 border-t border-border">
                <div>
                  <p className="font-medium text-sm">Двухфакторная аутентификация</p>
                  <p className="text-sm text-muted-foreground">Дополнительная защита входа по SMS</p>
                </div>
                <Toggle on={true} onClick={() => {}} />
              </div>
              <div className="flex items-center gap-3 p-4 rounded-md bg-emerald-50 text-emerald-800 text-sm">
                <Icon name="ShieldCheck" size={18} /> Ваш аккаунт надёжно защищён
              </div>
            </div>
          )}
        </div>
      </div>
    </CrmLayout>
  );
};

export default Settings;
