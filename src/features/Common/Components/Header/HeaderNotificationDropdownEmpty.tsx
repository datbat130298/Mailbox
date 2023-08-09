import { useTranslation } from 'react-i18next';

const HeaderNotificationDropdownEmpty = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-64 flex-col items-center justify-center space-y-2 pb-2 text-slate-300">
      <img src="" className="h-24" alt="Workflow" />
      <div className="font-[300]">{t('you_are_all_caught_up')}</div>
    </div>
  );
};

export default HeaderNotificationDropdownEmpty;
