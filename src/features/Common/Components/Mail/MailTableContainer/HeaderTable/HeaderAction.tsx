import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsTrash } from 'react-icons/bs';
import { MdMoreVert, MdRestore } from 'react-icons/md';
import { TypeChat } from '../../../../../../app/Enums/commonEnums';
import FilterDropdown from '../../../FilterDropdown/FilterDropdown';

interface HeaderActionProps {
  showAction: boolean;
  onClickReadSelectRows?: () => void;
  onClickDeleteSelectRows?: () => void;
  type: TypeChat;
  onClickRestoreSelectRows: () => void;
  onClickUnReadSelectRows: () => void;
}

const HeaderAction = ({
  showAction,
  onClickReadSelectRows,
  onClickDeleteSelectRows,
  onClickRestoreSelectRows,
  onClickUnReadSelectRows,
  type,
}: HeaderActionProps) => {
  const { t } = useTranslation();
  const moreAction = [
    {
      uuid: 1,
      label: t('mark_as_read'),
      value: 'mark_as_read',
    },
    {
      uuid: 2,
      label: t('mark_as_unread'),
      value: 'mark_as_unread',
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
          onClickUnReadSelectRows={onClickUnReadSelectRows}
          onClickReadSelectRows={onClickReadSelectRows}
          onClickDeleteSelectRows={onClickDeleteSelectRows}
          data={moreAction}
          icon={<MdMoreVert size={20} />}
          label={t('more')}
          position="left-0 top-10"
          className="mx-1 px-2"
        />
      </div>
    </>
  );
};

export default React.forwardRef(HeaderAction);
