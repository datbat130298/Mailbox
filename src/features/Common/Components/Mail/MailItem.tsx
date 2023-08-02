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
        <div className="lg:flex-center hidden h-0 w-0 rounded-md p-0 lg:flex lg:h-full lg:w-fit lg:items-center lg:justify-center lg:px-2 ">
          <div className="lg:flex-center hidden h-0 w-0 lg:flex lg:h-full lg:w-max lg:items-center lg:justify-center">
            <Checkbox
              className=""
              checked={selected}
              onChange={(e) => onChangeSelectRow(mail.uuid, e.target.checked)}
            />
          </div>
          <div className="hidden w-10 items-center justify-center lg:flex">
            {isRead ? (
              <LuMailOpen size={20} className="ml-3 text-gray-300" />
            ) : (
              <IoMailOutline size={21} className="ml-3 text-blue-700" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center lg:hidden ">
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
          <div
            className={twMerge(
              'flex h-full w-[85%] justify-start overflow-hidden text-gray-700',
              style?.display,
            )}
          >
            <div
              className={twMerge(
                'line-clamp-1 flex h-full w-48 flex-shrink-0 text-ellipsis break-all font-semibold  text-gray-700',
                isRead && 'font-normal',
                style?.height_top,
              )}
            >
              {mail?.author}
            </div>
            <div className={twMerge('flex h-full w-fit justify-start', style?.height_bottom)}>
              <div
                className={twMerge(
                  'flex h-full w-full justify-start text-ellipsis font-semibold sm:w-[calc(100%-192px)]',
                  isRead && 'font-normal',
                )}
              >
                {mail.subject && (
                  <div className="w-full text-ellipsis break-all text-left">{`${mail.subject} - `}</div>
                )}
                <div className="line-clamp-1 h-full w-full text-ellipsis break-all pl-1 text-left">
                  {`${convertHtmlToString(mail.content)}`}
                </div>
              </div>
            </div>
          </div>

          <div
            className={twMerge(
              'z-5 z-5 absolute right-0 top-0 h-full w-12 text-xs font-semibold text-gray-700 lg:w-32',
              itemMailStyle === 'classic' && 'py-1',
            )}
          >
            <div
              className={twMerge(
                'line-clamp-1 hidden h-full  text-ellipsis break-all lg:block lg:items-center lg:justify-center lg:text-center',
                style?.height,
              )}
            >
              {dayjs(mail.time).format('ddd, MMM D, h:mm A')}
            </div>
            <div
              className={twMerge(
                'line-clamp-1 flex h-1/2 w-full items-center justify-end text-ellipsis break-all text-center leading-6 lg:hidden',
              )}
            >
              {dayjs(mail.time).format('MMM D')}
            </div>
            <p className="flex h-1/2 items-center justify-end font-normal leading-6 lg:hidden lg:h-0">40kb</p>
          </div>
        </div>
      </div>
      <MailItemAction />
    </div>
  );
};
export default MailItem;
