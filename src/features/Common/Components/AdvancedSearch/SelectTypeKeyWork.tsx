import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { OptionOP, SelectOP } from '../Select';

interface SelectTypeKeyWorkProps {
  typeKeyWork: string;
  setTypeKeyWork: Dispatch<SetStateAction<string>>;
}

const SelectTypeKeyWork = ({ typeKeyWork, setTypeKeyWork }: SelectTypeKeyWorkProps) => {
  const { t } = useTranslation();
  const typeKeyWorkList = [
    {
      label: t('all'),
      value: 'all',
    },
    {
      label: t('inbox'),
      value: 'inbox',
    },
    {
      label: t('sent'),
      value: 'sent',
    },
    {
      label: t('drafts'),
      value: 'drafts',
    },
    {
      label: t('trash'),
      value: 'trash',
    },
    {
      label: t('starred'),
      value: 'starred',
    },
  ];

  return (
    <div className="mb-0.5 grid h-fit w-full grid-cols-5">
      <div className="col-span-1 h-10 text-left text-sm font-[400] leading-[48px] text-gray-600">
        {t('search')}
      </div>
      <div className="col-span-4 flex h-10  items-end justify-end">
        <SelectOP
          defaultValue={typeKeyWork}
          className={twMerge(
            'w-full -translate-y-[8px] border-b border-gray-100 text-sm font-[400] text-gray-600',
          )}
          onChange={(e) => setTypeKeyWork(e)}
        >
          {typeKeyWorkList.map((item) => (
            <OptionOP
              key={item.value}
              value={item.value}
              className="flex w-fit text-sm font-[400] text-gray-600"
            >
              <div className="w-40 text-left">{item.label}</div>
            </OptionOP>
          ))}
        </SelectOP>
      </div>
    </div>
  );
};

export default SelectTypeKeyWork;
