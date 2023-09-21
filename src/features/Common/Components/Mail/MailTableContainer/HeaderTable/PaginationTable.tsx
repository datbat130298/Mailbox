import { useTranslation } from 'react-i18next';
import { IoIosArrowBack } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

export interface MetaType {
  has_next: boolean;
  has_prev: boolean;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

interface PaginationTableProp {
  meta: MetaType;
  onChange: (page: number) => void;
}

const PaginationTable = ({ meta, onChange }: PaginationTableProp) => {
  const { t } = useTranslation();

  const handleClickPrev = () => {
    if (!meta.has_prev) return;
    onChange(meta.page - 1);
  };

  const handleClickNext = () => {
    if (!meta.has_next) return;
    onChange(meta.page + 1);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-0.5 text-xs text-gray-600">
        <p className="font-semibold">{meta.page}</p>
        <p className="px-0.5 text-gray-500">-</p>
        <p className="font-semibold">{meta.total_pages}</p>
        <p className="px-1 text-gray-500">{t('of')}</p>
        <p className="font-semibold">{meta.total}</p>
      </div>
      <div className="flex items-center justify-between">
        <div
          className={twMerge(
            'flex h-7 w-7 items-center justify-center rounded-full text-gray-400',
            meta.has_prev && 'text-black hover:bg-slate-200',
          )}
          role="button"
          tabIndex={0}
          onClick={handleClickPrev}
        >
          <IoIosArrowBack />
        </div>
        <div
          className={twMerge(
            'flex h-7 w-7 items-center justify-center rounded-full text-gray-400',
            meta.has_next && 'text-black hover:bg-slate-200',
          )}
          role="button"
          tabIndex={0}
          onClick={handleClickNext}
        >
          <IoIosArrowBack className="rotate-180" />
        </div>
      </div>
    </div>
  );
};

export default PaginationTable;
