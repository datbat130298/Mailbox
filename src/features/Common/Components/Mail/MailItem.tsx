import dayjs from 'dayjs';
import { useMemo } from 'react';
import { IoMailOutline } from 'react-icons/io5';
import { LuMailOpen } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
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
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MailItem = ({ mail, onChangeSelectRow, onClickShowMail, selected, selectedMail }: MailItemProps) => {
  const isRead = mail?.read;
  const { itemMailStyle } = useSelector((state) => state.layout);
  const userEmail = useSelector((state) => state.user.email);

  const style = useMemo(() => {
    if (itemMailStyle === 'compact')
      return {
        height: 'h-10 leading-10',
      };
    if (itemMailStyle === 'classic')
      return {
        display: 'block',
        height: 'h-13 leading-[52px]',
        height_top: 'h-1/2 leading-6',
        height_bottom: 'h-1/2 leading-6',
      };
    return {
      height: 'h-13 leading-[52px]',
    };
  }, [itemMailStyle]);

  return (
    <div className="group relative h-fit w-full">
      <div
        className={twMerge(
          'shadow-bottom-2 flex  w-full overflow-hidden border-b-[0.5px] px-2 text-sm group-hover:bg-slate-100',
          selected && 'bg-slate-100',
          // isRead && 'bg-gray-50',
          selectedMail?.uuid === mail.uuid && 'bg-slate-100',
          style?.height,
        )}
      >
        <div className="md:flex-center hidden h-0 w-0 rounded-md p-0 md:flex md:h-full md:w-fit md:items-center md:justify-center md:px-2 ">
          <div className="md:flex-center hidden h-0 w-0 md:flex md:h-full md:w-max md:items-center md:justify-center">
            <Checkbox
              className=""
              checked={selected}
              onChange={(e) => onChangeSelectRow(mail.uuid, e.target.checked)}
            />
          </div>
          <div className="hidden w-10 items-center justify-center md:flex">
            {isRead ? (
              <LuMailOpen size={20} className="ml-3 text-gray-300" />
            ) : (
              <IoMailOutline size={21} className="ml-3 text-blue-700" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center md:hidden ">
          <div
            className={twMerge(
              'ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500',
              userEmail === mail?.from_user?.email && 'bg-sky-300 italic opacity-40',
            )}
          >
            <p className="text-lg font-semibold">
              {userEmail === mail?.from_user?.email ? 'ME' : mail?.author.slice(0, 1)}
            </p>
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => onClickShowMail(mail)}
          className={twMerge(
            'relative h-full w-[calc(100%-52px)] pl-2 pr-24',
            itemMailStyle === 'classic' && 'py-1',
          )}
        >
          <div className={twMerge('flex h-full w-[90%] justify-start overflow-hidden', style?.display)}>
            <div
              className={twMerge(
                'h-full w-40 flex-shrink-0 truncate pr-4 text-left font-semibold  text-gray-800',
                isRead && 'font-normal',
                style?.height_top,
              )}
            >
              {mail?.author}
            </div>
            <div className={twMerge('flex h-full w-fit justify-start', style?.height_bottom)}>
              <div
                className={twMerge(
                  'h-full w-fit flex-shrink-0 text-ellipsis text-left font-semibold text-gray-800',
                  isRead && 'font-normal',
                )}
              >
                {mail.subject && `${mail.subject} - `}
              </div>
              <div className="line-clamp-1 h-full text-ellipsis break-all pl-1 text-left text-gray-500">
                {`${convertHtmlToString(mail.content)}`}
              </div>
            </div>
          </div>

          <div
            className={twMerge(
              'z-5 z-5 absolute right-0 top-0 h-full w-12 text-xs font-semibold lg:w-32',
              itemMailStyle === 'classic' && 'py-1',
            )}
          >
            <div
              className={twMerge(
                'line-clamp-1 hidden h-full items-center text-ellipsis break-all text-gray-500 lg:flex lg:items-center lg:justify-center lg:text-center',
                // style?.height,
                !isRead && ' text-gray-800',
              )}
            >
              {dayjs(mail.time).format('ddd, MMM D, h:mm A')}
            </div>
            <div
              className={twMerge(
                'line-clamp-1 flex h-1/2 w-full items-center justify-end text-ellipsis break-all text-center leading-6 text-gray-500 lg:hidden',
                !isRead && ' text-gray-800',
              )}
            >
              {dayjs(mail.time).format('MMM D')}
            </div>
            <p
              className={twMerge(
                'flex h-1/2 items-center justify-end leading-6 text-gray-500 lg:hidden lg:h-0',
                !isRead && ' text-gray-800',
              )}
            >
              40kb
            </p>
          </div>
        </div>
      </div>
      <MailItemAction />
    </div>
  );
};
export default MailItem;
