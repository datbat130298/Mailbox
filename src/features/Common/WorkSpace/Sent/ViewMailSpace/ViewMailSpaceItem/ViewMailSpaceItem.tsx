import dayjs from 'dayjs';
import { BsCameraVideo, BsChatLeftText } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { IoCallOutline, IoSearchOutline } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import { MailType } from '../../../../../../app/Types/commonTypes';
import ViewMailSpaceGroupButtonFooter from '../ViewMailSpaceGroupButtonFooter';
import ViewMailSpaceItemInfoCollapse from './ViewMailSpaceItemInfoCollapse';

interface ViewMailSpaceItemProp {
  mail: MailType | null;
  isActive: boolean;
  isOpen: boolean;
  onClickViewMailHeader: () => void;
  handleScroll: (e: React.UIEvent<HTMLElement>) => void;
}

const ViewMailSpaceItem = ({
  mail,
  isActive,
  isOpen,
  onClickViewMailHeader,
  handleScroll,
}: ViewMailSpaceItemProp) => {
  const dateMail = dayjs();
  const dateCurrent = dayjs(mail?.time);
  return (
    <div
      className={twMerge(
        'h-[750px] flex-col items-center justify-start overflow-y-scroll border-b-[0.5px]',
        isActive && '',
      )}
      onScroll={(e) => handleScroll(e)}
    >
      <div
        className={twMerge(
          'flex h-20 w-full items-center bg-white px-3',
          !isOpen && 'bg-gray-50 hover:bg-white',
        )}
        tabIndex={0}
        role="button"
        onClick={onClickViewMailHeader}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-500">
          <p className="text-lg font-semibold">{mail?.author.slice(0, 1)}</p>
        </div>
        {!isOpen && <ViewMailSpaceItemInfoCollapse mail={mail} />}
        {isOpen && (
          <div className="mx-2 flex flex-col gap-1">
            <div className="flex items-center justify-start gap-4">
              <p>{mail?.author}</p>
              <div className="flex items-center gap-0.5">
                <GoDotFill size={10} className="mx-1 mt-0.5 text-gray-300" />
                <div className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-gray-100">
                  <BsChatLeftText size={15} className=" text-gray-500" />
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-gray-100">
                  <IoCallOutline size={17} className=" text-gray-500" />
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-gray-100">
                  <BsCameraVideo size={18} className=" text-gray-500" />
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-gray-100">
                  <IoSearchOutline size={18} className=" text-gray-500" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-2">
              <p className="text-xs text-gray-600">
                {!dateMail.diff(dateCurrent, 'D')
                  ? dayjs(mail?.time).format('ddd, MMM D, YYYY h:mm A')
                  : dayjs(mail?.time).format('h:mm A')}
              </p>
              <p className="flex items-center  text-xs uppercase text-gray-600">
                {' '}
                <GoDotFill size={10} className="mx-1.5 mt-0.5 text-gray-300" /> SENT
              </p>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <>
          <div className="mx-3 mt-3 break-all border-y-[0.5px] pb-8 pt-5 text-left text-base">
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: mail?.content ? mail.content : ' ' }} />
          </div>
          <ViewMailSpaceGroupButtonFooter />
        </>
      )}
    </div>
  );
};

export default ViewMailSpaceItem;
