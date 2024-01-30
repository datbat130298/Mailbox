import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../../../app/Enums/commonEnums';
import { MailType } from '../../../../../../app/Types/commonTypes';
import useSelector from '../../../../../Hooks/useSelector';
import MailItemAction from '../../MailItemAction';
import MailItemAvatar from './Components/MailItemAvatar';
import MailItemBody from './Components/MailItemBody';
import MailItemDate from './Components/MailItemDate';
import MailItemEmail from './Components/MailItemEmail';
import MailItemIcon from './Components/MailItemIcon';
import MailItemSubject from './Components/MailItemSubject';

interface MailItemProps {
  mail: MailType;
  onChangeSelectRow: (idRows: number, checked: boolean) => void;
  onClickShowMail: (mail: MailType) => void;
  selected: boolean;
  selectedMail: MailType | null;
  type: TypeChat;
  onClickDeleteMail?: (id: number) => void;
  onClickRestoreMail?: (id: number) => void;
  onRateStar?: (id: number, value: boolean) => void;
  unReadEmail?: (ids: Array<number>) => void;
  readEmail?: (ids: Array<number>) => void;
  onRemoveItem?: (id: number) => void;
}

const MailItem = ({
  onClickDeleteMail,
  onClickRestoreMail,
  selected,
  selectedMail,
  mail,
  type,
  onClickShowMail,
  onRemoveItem,
  onRateStar,
  unReadEmail,
  readEmail,
  onChangeSelectRow,
}: MailItemProps) => {
  const [isReadMail, setIsReadMail] = useState(true);
  const [isStar, setIsStar] = useState(false);
  const { itemMailStyle } = useSelector((state) => state.layout);

  const handleSelectRow = () => {
    onClickShowMail(mail);
    setIsReadMail(true);
  };

  const handleClickStarAction = (id: number, value: boolean) => {
    setIsStar((prev) => !prev);
    if (type === TypeChat.STARRED && _.isFunction(onRemoveItem)) {
      onRemoveItem(mail.id);
    }
    if (_.isFunction(onRateStar)) {
      onRateStar(id, value);
    }
  };

  const handleClickStarColumn = () => {
    setIsStar((prev) => !prev);
    if (_.isFunction(onRateStar) && _.isFunction(onRemoveItem)) {
      if (mail.source) {
        onRateStar(mail.id, false);
        onRemoveItem(mail.id);
        return;
      }
      onRemoveItem(mail.id);
      return;
    }
    if (_.isFunction(onRateStar) && !_.isFunction(onRemoveItem)) {
      onRateStar(mail.id, !isStar);
    }
  };

  const handleClickRead = useCallback(() => {
    if (isReadMail) {
      if (_.isFunction(unReadEmail)) {
        unReadEmail([mail.id]);
        setIsReadMail(false);
      }
      return;
    }
    if (_.isFunction(readEmail)) {
      readEmail([mail.id]);
      setIsReadMail(true);
    }
  }, [isReadMail, mail]);

  useEffect(() => {
    if (!_.isEmpty(mail) && mail.read !== undefined) {
      setIsReadMail(mail.read);
    }
    if (mail.star !== undefined) {
      setIsStar(mail.star);
    }
  }, [mail]);
  return (
    <div
      className={twMerge(
        'group relative flex h-fit w-full gap-1.5 overflow-hidden border-b bg-white px-4 text-ms hover:z-20 hover:shadow-md md:pl-6',
        isReadMail && 'bg-gray-100',
        selected && 'z-20 bg-gray-100 shadow-md',
        selectedMail?.id === mail.id && 'z-20 bg-gray-50 shadow-md',
        itemMailStyle === 'classic' && 'py-0.5',
      )}
    >
      <div className="w-fit">
        <MailItemIcon
          onChangeSelectRow={onChangeSelectRow}
          isStar={isStar}
          id={mail.id}
          selected={selected}
          onClickStar={handleClickStarColumn}
        />
        <MailItemAvatar mail={mail} type={type} />
      </div>
      <div
        className={twMerge(
          'flex h-12 flex-1 justify-between px-1 md:px-3',
          itemMailStyle === 'compact' && 'h-9 text-sm',
          itemMailStyle === 'classic' && 'h-14 w-2/3 flex-1 md:w-full md:overflow-hidden',
        )}
        role="button"
        tabIndex={0}
        onClick={handleSelectRow}
      >
        <div
          className={twMerge(
            'flex flex-row overflow-hidden md:gap-14',
            itemMailStyle === 'classic' && 'flex-col justify-center gap-0.5 overflow-clip  py-1 md:gap-0.5',
          )}
        >
          <MailItemEmail mail={mail} type={type} isReadMail={isReadMail} />
          <div
            className={twMerge(
              'flex items-center gap-2 overflow-hidden',
              itemMailStyle === 'classic' && 'flex-1 justify-start',
            )}
          >
            <MailItemSubject isReadMail={isReadMail} subject={mail.subject} />
            <p>-</p>
            <MailItemBody body={mail.body} />
          </div>
        </div>
        <MailItemDate date={mail.created_at} type={type} mail={mail} isReadMail={isReadMail} />
      </div>
      <MailItemAction
        isRead={isReadMail}
        onClickRead={handleClickRead}
        star={isStar}
        type={type}
        onClickDeleteMail={onClickDeleteMail}
        mail={mail}
        onClickRestoreMail={onClickRestoreMail}
        onRateStar={handleClickStarAction}
      />
    </div>
  );
};

export default MailItem;
