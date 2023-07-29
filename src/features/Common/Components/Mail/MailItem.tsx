import dayjs from 'dayjs';
import _ from 'lodash';
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
  onChangeSelectRows: (idRows: number, checked: boolean) => void;
  onClickShowMail: (mail: MailType) => void;
  selected: boolean;
  selectedMail: MailType | null;
}

const MailItem = ({ mail, onChangeSelectRows, onClickShowMail, selected, selectedMail }: MailItemProps) => {
  const isRead = mail?.read;
  const { itemMailStyle } = useSelector((state) => state.layout);

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
        <div className="flex-center h-full w-fit rounded-md px-2">
          <div className="flex-center h-full w-max ">
            <Checkbox checked={selected} onChange={(e) => onChangeSelectRows(mail.uuid, e.target.checked)} />
          </div>
          <div className="flex items-center justify-center">
            {isRead ? (
              <LuMailOpen size={20} className="ml-3 text-gray-300" />
            ) : (
              <IoMailOutline size={21} className="ml-3 text-blue-700" />
            )}
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => onClickShowMail(mail)}
          className="relative h-full w-[calc(100%-52px)] pl-2 pr-24"
        >
          <div
            className={twMerge(
              'flex h-full w-[95%] justify-start overflow-hidden text-gray-700',
              style?.display,
            )}
          >
            <div
              className={twMerge(
                'line-clamp-1 flex h-full w-48 flex-shrink-0 text-ellipsis  break-all font-semibold  text-gray-700',
                isRead && 'font-normal',
                style?.height_top,
              )}
            >
              {mail?.author}
            </div>
            <div className={twMerge('flex h-full w-fit justify-start', style?.height_bottom)}>
              <div
                className={twMerge(
                  'flex h-full max-w-[calc(100%-192px)] flex-shrink-0 text-ellipsis  font-semibold ',
                  isRead && 'font-normal',
                )}
              >
                <div className="line-clamp-1 break-all">{mail?.subject}</div>
              </div>
              <div className="line-clamp-1 h-full text-ellipsis break-all pl-1">
                {!_.isEmpty(mail?.content) && `- ${convertHtmlToString(mail.content)}`}
              </div>
            </div>
          </div>
          <div
            className={twMerge(
              'z-5 absolute right-0 top-0 line-clamp-1 flex h-full w-24 justify-end text-ellipsis break-all  pr-4  text-center text-xs font-semibold leading-[52px] text-gray-700',
              style?.height,
            )}
          >
            {dayjs(mail.time).format('ddd, MMM D, h:mm A')}
          </div>
        </div>
      </div>
      <MailItemAction />
    </div>
  );
};
export default MailItem;
