import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsTrash } from 'react-icons/bs';
import { MdOutlineMoreVert, MdRestore } from 'react-icons/md';
import { TypeChat } from '../../../../../../app/Enums/commonEnums';
import FilterDropdown from '../../../FilterDropdown/FilterDropdown';

interface HeaderActionProps {
  showAction: boolean;
  onClickReadSelectRows?: () => void;
  onClickDeleteSelectRows?: () => void;
  type: TypeChat;
  onClickRestoreSelectRows: () => void;
}

const HeaderAction = ({
  showAction,
  onClickReadSelectRows,
  onClickDeleteSelectRows,
  onClickRestoreSelectRows,
  type,
}: HeaderActionProps) => {
  const { t } = useTranslation();
  const moreAction = [
    {
      uuid: 1,
      label: t('mask_as_read'),
      value: 'mask_as_read',
    },
  ];

  return (
    <>
      {showAction && (
        <>
          {/* <div className="my-3 ml-1 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700">
            <div className="flex-center h-full w-max">
              <IoArchiveOutline size={15} />
            </div>
            <div className="ml-1 text-sm leading-8">{t('archive')}</div>
          </div> */}
          {type !== TypeChat.TRASH && (
            <div
              className="my-3 ml-1 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700"
              tabIndex={0}
              role="button"
              onClick={onClickDeleteSelectRows}
            >
              <div className="flex-center h-full w-max">
                <BsTrash size={14} />
              </div>
              <div className="ml-1 text-sm leading-8">{t('delete')}</div>
            </div>
          )}
          {type === TypeChat.TRASH && (
            <div
              className="my-3 ml-1 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700"
              tabIndex={0}
              role="button"
              onClick={onClickRestoreSelectRows}
            >
              <div className="flex-center h-full w-max">
                <MdRestore size={18} />
              </div>
              <div className="ml-1 text-sm leading-8">{t('restore')}</div>
            </div>
          )}
        </>
      )}
      <div className="-ml-1">
        <FilterDropdown
          onClickReadSelectRows={onClickReadSelectRows}
          onClickDeleteSelectRows={onClickDeleteSelectRows}
          data={moreAction}
          icon={<MdOutlineMoreVert size={18} />}
          label={t('more')}
          position="left-0 top-10"
          className="mx-1 px-1"
        />
      </div>
    </>
  );
};

export default React.forwardRef(HeaderAction);
