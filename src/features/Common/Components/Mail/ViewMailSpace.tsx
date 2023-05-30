import dayjs from 'dayjs';
import { CgMailForward, CgMailReply } from 'react-icons/cg';
import { MdArrowDropDown, MdOutlineMoreVert } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { MailType } from '../../../../app/Types/commonTypes';
import Button from '../Button';
import Tooltip from '../Tooltip/Tooltip';

interface ViewMailSpaceProps {
  mail: MailType;
}

const ViewMailSpace = ({ mail }: ViewMailSpaceProps) => {
  return (
    <div className="min-h-[calc(100%-16px)] w-full px-4">
      <div className="mt-2 min-h-[40px] w-full pl-16 text-xl">{mail.subject}</div>
      <div className="mb-4 flex h-12 w-full">
        <div className="flex h-12 w-fit flex-shrink-0 items-center justify-center">
          <div
            className={twMerge(
              'flex h-full w-12 flex-shrink-0  items-center justify-center rounded-full bg-cyan-500 drop-shadow',
            )}
          >
            <p className="text-[20px] font-semibold">{mail.author.slice(0, 1)}</p>
          </div>
        </div>
        <div className="flex h-full w-[calc(100%-48px)] justify-between pl-4">
          <div>
            <div className="flex h-6 w-fit justify-start ">
              <div className="text-sm font-semibold leading-6">{mail.author}</div>
              <div className="px-1 text-xs leading-6 text-gray-500">{`<${mail.address}>`}</div>
            </div>
            <div className="flex h-6 w-fit gap-x-1 text-xs ">
              <div className="h-full  leading-[22px] text-gray-500">to me</div>
              <div className="flex-center h-full">
                <MdArrowDropDown size={16} />
              </div>
            </div>
          </div>
          <div className="flex h-full w-fit justify-end text-gray-500">
            <div className="h-full w-fit pr-2 text-xs leading-[48px]">
              {dayjs(mail.time).format('MMMM D, YYYY HH:mm A')}
            </div>
            <Tooltip title="Reply" position="bottom">
              <div className="flex-center h-full w-fit">
                <div className="flex-center h-10  w-10 rounded-full hover:bg-gray-200 hover:text-primary-700">
                  <CgMailReply size={18} />
                </div>
              </div>
            </Tooltip>
            <Tooltip title="More" position="bottom">
              <div className="flex-center h-full w-fit">
                <div className="flex-center h-10 w-10 rounded-full hover:bg-gray-200 hover:text-primary-700">
                  <MdOutlineMoreVert size={18} />
                </div>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="pl-16">
        <div className="h-fit w-full justify-start">{mail.content}</div>
        <div className="mt-8 flex h-fit w-full justify-start gap-x-3">
          <Button
            className="h-8 rounded-2xl border-none bg-white text-gray-500 ring-1"
            size="sm"
            color="light"
          >
            <div className="mx-1 flex w-16 items-center justify-center gap-x-2">
              <div>
                <CgMailReply size={18} />
              </div>
              <div className="text-sm">Reply</div>
            </div>
          </Button>
          <Button
            className="h-8 rounded-2xl border-none bg-white text-gray-500 ring-1"
            size="sm"
            color="light"
          >
            <div className="mx-1 flex w-16 items-center justify-center gap-x-2">
              <div>
                <CgMailForward size={18} className="h-full w-fit" />
              </div>
              <div className="text-sm">Forward</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ViewMailSpace;
