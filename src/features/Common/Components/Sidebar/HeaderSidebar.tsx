import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import Input from '../Form/Input';

interface HeaderSidebarProp {
  isShowFullSidebar: boolean;
  onClose: () => void;
}

const HeaderSidebar = ({ isShowFullSidebar, onClose }: HeaderSidebarProp) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { t } = useTranslation();

  return (
    <div
      className={twMerge(
        'hidden h-20 w-full items-center justify-between px-2 sm:hidden',
        isShowFullSidebar && 'flex',
      )}
    >
      <div className="flex h-8 w-48 justify-start rounded-4xl bg-white p-0 lg:p-1.5">
        <div className="flex h-8 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-300">
          <HiOutlineSearch size={18} className="text-black" />
        </div>
        <Input
          size="sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('search_in_mailbox') as string}
          className="mx-1 h-full w-full border-none bg-transparent px-[-4px] lg:w-[628px]"
          inputClassName="placeholder-gray-500"
          isShowPlaceholder
        />
      </div>
      <div
        tabIndex={0}
        role="button"
        onClick={onClose}
        className="flex h-8 w-8 items-center justify-center rounded-full border-gray-600 bg-slate-200 text-black"
      >
        <IoClose size={24} className="" />
      </div>
    </div>
  );
};

export default HeaderSidebar;
