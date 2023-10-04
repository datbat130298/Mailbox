import _ from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiTrash2 } from 'react-icons/fi';
import { MdMoreVert, MdRestore } from 'react-icons/md';
import { TypeChat } from '../../../../../../app/Enums/commonEnums';
import FilterDropdown from '../../../FilterDropdown/FilterDropdown';
import ButtonHeaderTable from './ButtonHeaderTable';

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
      onClick: onClickReadSelectRows,
    },
    {
      uuid: 2,
      label: t('mark_as_unread'),
      value: 'mark_as_unread',
      onClick: onClickUnReadSelectRows,
    },
  ];

  return (
    <>
      {showAction && (
        <>
          {type !== TypeChat.TRASH && _.isFunction(onClickDeleteSelectRows) && (
            <ButtonHeaderTable
              onClick={onClickDeleteSelectRows}
              icon={<FiTrash2 size={17} />}
              title={t('delete')}
            />
          )}
          {type === TypeChat.TRASH && (
            <ButtonHeaderTable
              onClick={onClickRestoreSelectRows}
              title={t('restore')}
              icon={<MdRestore size={18} />}
            />
          )}
        </>
      )}
      <div className="">
        <FilterDropdown
          data={moreAction}
          icon={<MdMoreVert size={20} />}
          label={t('more')}
          position="left-0 top-10"
          className="font-semibold"
          type={type}
        />
      </div>
    </>
  );
};

export default React.forwardRef(HeaderAction);
