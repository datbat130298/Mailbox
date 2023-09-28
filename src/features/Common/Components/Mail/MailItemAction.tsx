import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { LuMail, LuMailOpen } from 'react-icons/lu';
import { MdRestore } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import { MailType } from '../../../../app/Types/commonTypes';
import Tooltip from '../Tooltip/Tooltip';

interface MailItemActonProp {
  onClickDeleteMail?: (id: number) => void;
  onClickRestoreMail?: (id: number) => void;
  onRateStar?: (id: number, value: boolean) => void;
  mail: MailType;
  type: TypeChat;
  star: boolean;
  isRead: boolean;
  onClickRead: () => void;
}

const MailItemAction = ({
  isRead,
  onClickRead,
  onClickDeleteMail,
  mail,
  type,
  onClickRestoreMail,
  onRateStar,
  star,
}: MailItemActonProp) => {
  const { t } = useTranslation();

  const handleClickStar = () => {
    if (!_.isFunction(onRateStar)) return;
    onRateStar(mail.id, !star);
  };

  return (
    <div
      className={twMerge(
        'absolute right-0 top-0 z-10 my-auto hidden h-[95%] w-40 justify-center bg-inherit text-gray-700 group-hover:block',
      )}
    >
      <div className="flex h-full w-full justify-end gap-x-1 pr-2">
        {type !== TypeChat.DRAFT && _.isFunction(onRateStar) && (
          <Tooltip title={!star ? t('not_starred') : t('starred')} position="bottom">
            <div className="flex-center h-full w-fit" role="button" tabIndex={0} onClick={handleClickStar}>
              <div className="flex-center h-9 w-9 rounded-full hover:bg-gray-300  hover:text-primary-700">
                {!star ? <FaRegStar size={17} /> : <FaStar size={17} className="text-amber-400 shadow-lg" />}
              </div>
            </div>
          </Tooltip>
        )}

        {type !== TypeChat.TRASH && (
          <Tooltip title={t('delete')} position="bottom">
            <div
              className="flex-center h-full w-fit"
              role="button"
              tabIndex={0}
              onClick={() => {
                if (!_.isFunction(onClickDeleteMail)) return;
                onClickDeleteMail(mail.id);
              }}
            >
              <div className="flex-center h-9 w-9 rounded-full hover:bg-gray-300  hover:text-primary-700">
                <FiTrash2 size={17} />
              </div>
            </div>
          </Tooltip>
        )}
        {type === TypeChat.TRASH && (
          <Tooltip title={t('restore')} position="bottom">
            <div
              className="flex-center h-full w-fit"
              role="button"
              tabIndex={0}
              onClick={() => {
                if (!_.isFunction(onClickRestoreMail)) return;
                onClickRestoreMail(mail.id);
              }}
            >
              <div className="flex-center h-9 w-9 rounded-full hover:bg-gray-300  hover:text-primary-700">
                <MdRestore size={19} />
              </div>
            </div>
          </Tooltip>
        )}
        {type === TypeChat.INBOX && (
          <Tooltip title={isRead ? t('mark_as_unread') : t('mark_as_read')} position="bottom">
            <div className="flex-center h-full w-fit" tabIndex={0} role="button" onClick={onClickRead}>
              <div className="flex-center h-9 w-9 rounded-full hover:bg-gray-300  hover:text-primary-700">
                {isRead ? <LuMailOpen size={17} /> : <LuMail size={18} />}
              </div>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
export default MailItemAction;
