import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

interface TabArray {
  id: number;
  label: string;
}

interface HeaderSettingProps {
  selectTab: number;
  handleClickTab: (id: number) => void;
  tab: TabArray[];
}

const HeaderSetting = ({ selectTab, handleClickTab, tab }: HeaderSettingProps) => {
  const { t } = useTranslation();
  return (
    <div className="h-18 flex w-full flex-col justify-start text-slate-700 ">
      <p className="px-5 py-4 text-2xl font-semibold capitalize">{t('setting')}</p>
      <div className="flex w-full items-center justify-start rounded-t-lg border-b border-gray-200 px-2">
        {tab.map((item) => (
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleClickTab(item.id)}
            className={twMerge(
              'relative px-3 py-1 pb-2 text-sm font-medium text-slate-500',
              selectTab === item.id && 'rounded-t-lg  border-b-0 border-gray-200 text-primary-600 ',
            )}
          >
            {item.label}
            {item.id === selectTab && (
              <motion.div
                className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-primary-500"
                layoutId="underline"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSetting;
