import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { IoMailOpenOutline } from 'react-icons/io5';
import { MdRestore } from 'react-icons/md';
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
}

const MailItemAction = ({
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
    <div className="absolute right-0 top-0 z-10  hidden h-full w-40 justify-center bg-gray-100 text-gray-700 group-hover:block">
      <div className="flex h-full w-full justify-center gap-x-1 pr-2">
        {type !== TypeChat.DRAFT && _.isFunction(onRateStar) && (
          <Tooltip title={!star ? t('not_starred') : t('starred')} position="bottom">
            <div className="flex-center h-full w-fit" role="button" tabIndex={0} onClick={handleClickStar}>
              <div className="flex-center h-9 w-9 rounded-full hover:bg-gray-300  hover:text-primary-700">
                {!star ? (
                  <AiOutlineStar size={18} />
                ) : (
                  <AiFillStar size={18} className="text-yellow-700 shadow-lg" />
                )}
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
                <BsTrash size={15} />
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
          <Tooltip title={t('mask_as_read')} position="bottom">
            <div className="flex-center h-full w-fit">
              <div className="flex-center h-9 w-9 rounded-full hover:bg-gray-300  hover:text-primary-700">
                <IoMailOpenOutline size={17} />
              </div>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
export default MailItemAction;
