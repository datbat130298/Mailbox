import { useTranslation } from 'react-i18next';
import { BsTrash } from 'react-icons/bs';
import { IoArchiveOutline } from 'react-icons/io5';
import { MdOutlineMoreVert, MdOutlineReport } from 'react-icons/md';
import FilterDropdown from '../FilterDropdown/FilterDropdown';

interface HeaderActionProps {
  showAction: boolean;
}

const HeaderAction = ({ showAction }: HeaderActionProps) => {
  const { t } = useTranslation();
  const moreAction = [
    {
      uuid: 1,
      label: t('mask_as_read'),
      value: 'mask_as_read',
    },
    {
      uuid: 2,
      label: t('delete'),
      value: 'delete',
    },
  ];
  return (
    <>
      {showAction && (
        <>
          <div className="my-3 ml-1 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700">
            <div className="flex-center h-full w-max">
              <IoArchiveOutline size={15} />
            </div>
            <div className="ml-1 text-sm leading-8">{t('archive')}</div>
          </div>
          <div className="my-3 ml-1 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700">
            <div className="flex-center h-full w-max">
              <BsTrash size={14} />
            </div>
            <div className="ml-1 text-sm leading-8">{t('delete')}</div>
          </div>
          <div className="my-3 ml-1 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700">
            <div className="flex-center h-full w-max">
              <MdOutlineReport size={18} />
            </div>
            <div className="ml-1 text-sm leading-8">{t('report')}</div>
          </div>
        </>
      )}
      <div className="-ml-1">
        <FilterDropdown
          data={moreAction}
          icon={<MdOutlineMoreVert size={18} />}
          label={t('more')}
          position="left-0 top-10"
        />
      </div>
    </>
  );
};

export default HeaderAction;
