import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import { MailType } from '../../../../app/Types/commonTypes';
import useSelector from '../../../Hooks/useSelector';
import { convertHtmlToString } from '../../../utils/helpers';
import Checkbox from '../Form/Checkbox';
import MailItemAction from './MailItemAction';

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
  readEmail,
  onRemoveItem,
  mail,
  onChangeSelectRow,
  onClickShowMail,
  selected,
  selectedMail,
  type,
  onClickDeleteMail,
  onClickRestoreMail,
  onRateStar,
  unReadEmail,
}: MailItemProps) => {
  const [isReadMail, setIsReadMail] = useState(false);
  const [isStar, setIsStar] = useState(false);

  const { itemMailStyle } = useSelector((state) => state.layout);
  const userEmail = useSelector((state) => state.user.email);
  const user = useSelector((state) => state.user);
  dayjs.extend(utc);

  const emailShow = useMemo(() => {
    if (type === TypeChat.DRAFT) {
      return 'Draft';
    }
    if (type === TypeChat.INBOX) {
      return mail.email_address;
    }
    if (type === TypeChat.SENT && mail?.sents_email_address) {
      return `To: ${mail?.sents_email_address[0]?.email_address}`;
    }
    return mail.email_addresses;
  }, [mail, type]);

  const style = useMemo(() => {
    if (itemMailStyle === 'compact')
      return {
        height: 'h-10 leading-10',
      };
    if (itemMailStyle === 'classic')
      return {
        display: 'block',
        height: 'h-15 leading-[56px]',
        height_top: 'h-1/2 leading-6',
        height_bottom: 'h-1/2 leading-6',
      };
    return {
      height: 'h-13 leading-[52px]',
    };
  }, [itemMailStyle]);

  const handleSelectRow = () => {
    onClickShowMail(mail);
    setIsReadMail(true);
  };

  useEffect(() => {
    if (!_.isEmpty(mail) && mail.read !== undefined) {
      setIsReadMail(mail.read);
    }
  }, [mail]);

  useEffect(() => {
    if (mail.star !== undefined) {
      setIsStar(mail.star);
    }
  }, [mail, type]);

  const handleClickStarColumn = () => {
    setIsStar((prev) => !prev);
    if (_.isFunction(onRateStar) && _.isFunction(onRemoveItem)) {
      if (mail.source) {
        onRateStar(mail.id, false, mail.source);
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

  const handleClickStarAction = (id: number, value: boolean) => {
    setIsStar((prev) => !prev);
    if (type === TypeChat.STARRED && _.isFunction(onRemoveItem)) {
      onRemoveItem(mail.id);
    }
    if (_.isFunction(onRateStar)) {
      onRateStar(id, value);
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

  return (
    <div
      className={twMerge(
        'group relative h-fit w-full hover:z-20',
        selected && 'z-20',
        selectedMail?.id === mail.id && 'z-20 shadow-md',
      )}
    >
      <div
        className={twMerge(
          'shadow-bottom-2 flex  w-full border-b-[0.5px] bg-white px-2 text-ms antialiased group-hover:shadow-md',
          selected && 'bg-slate-100 shadow-md',
          !isReadMail && 'bg-slate-100 group-hover:shadow-md',
          selectedMail?.id === mail.id && 'bg-slate-100 shadow-md',
          style?.height,
        )}
      >
        <div className="md:flex-center hidden h-0 w-0 rounded-md p-0 md:flex md:h-full md:w-fit md:items-center md:justify-center md:px-2 ">
          <div className="md:flex-center hidden h-0 w-0 md:flex md:h-full md:w-max md:items-center md:justify-center">
            <Checkbox
              className=""
              checked={selected}
              onChange={(e) => onChangeSelectRow(mail.id, e.target.checked)}
            />
          </div>

          <div
            className="-mr-3 hidden w-10 items-center justify-center xl:flex"
            role="button"
            tabIndex={0}
            onClick={handleClickStarColumn}
          >
            {!isStar ? (
              <FaRegStar size={17} className="text-gray-700 opacity-30 group-hover:opacity-90" />
            ) : (
              <FaStar size={17} className="text-amber-400 opacity-90 group-hover:shadow-md" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center md:hidden ">
          <div
            className={twMerge(
              'ml-1 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cyan-500',
              type === TypeChat.DRAFT && 'bg-white object-fill',
            )}
          >
            {type !== TypeChat.DRAFT ? (
              <p className="text-lg font-semibold uppercase">
                {type === TypeChat.SENT ? userEmail?.slice(0, 1) : emailShow?.slice(0, 1)}
              </p>
            ) : (
              <img src={user.avatar_img_absolute || ''} alt="avatar" />
            )}
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={handleSelectRow}
          className={twMerge(
            'relative h-full w-[calc(100%-52px)] pl-2 pr-24 xl:pl-2',
            itemMailStyle === 'classic' && 'py-1',
          )}
        >
          <div className={twMerge('flex h-full w-[90%] justify-start overflow-hidden', style?.display)}>
            <div
              className={twMerge(
                'h-full w-40 flex-shrink-0 truncate pr-4 text-left font-semibold  text-gray-800',
                isReadMail && 'font-normal',
                type === TypeChat.DRAFT && 'font-semibold text-primary-500',
                style?.height_top,
              )}
            >
              {emailShow}
            </div>
            <div
              className={twMerge(
                'ml-5 flex h-full w-fit justify-start',
                style?.height_bottom,
                itemMailStyle === 'classic' && 'ml-0',
              )}
            >
              <div
                className={twMerge(
                  'h-full w-fit flex-shrink-0 text-ellipsis text-left font-semibold text-gray-800',
                  isReadMail && 'font-normal',
                )}
              >
                {mail.subject && `${mail.subject} - `}
              </div>
              <div className="line-clamp-1 h-full text-ellipsis break-all pl-1 text-left text-gray-500">
                {`${convertHtmlToString(mail.body)}`}
              </div>
            </div>
          </div>

          <div
            className={twMerge(
              'absolute right-0 top-0 h-full w-12  text-xs font-semibold lg:w-32',
              itemMailStyle === 'classic' && 'py-1',
              selectedMail && '!w-20',
              selectedMail && 'xl:!w-32 ',
            )}
          >
            <div
              className={twMerge(
                'line-clamp-1 hidden h-full items-center text-ellipsis break-all font-normal text-gray-600 lg:flex lg:items-center lg:justify-center lg:text-center',
                !isReadMail && ' font-semibold text-gray-800',
              )}
            >
              {window.innerWidth < 1280 && window.innerWidth >= 1024 && selectedMail
                ? dayjs.utc(mail.created_at).local().format('MMM D, h:mm')
                : dayjs.utc(mail.created_at).local().format('ddd, MMM D, h:mm A')}
            </div>
            <div
              className={twMerge(
                'line-clamp-1 flex h-1/2 w-full items-center justify-end text-ellipsis break-all text-center font-normal leading-6 text-gray-500 lg:hidden',
                !isReadMail && ' font-semibold text-gray-800',
              )}
            >
              {dayjs.utc(mail.created_at).local().format('MMM D')}
            </div>
            <p
              className={twMerge(
                'flex h-1/2 items-center justify-end leading-6 text-gray-500 lg:hidden lg:h-0',
                !isReadMail && ' text-gray-800',
              )}
            >
              40kb
            </p>
          </div>
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
    </div>
  );
};
export default MailItem;
