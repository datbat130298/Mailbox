import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { CgMailForward, CgMailReply } from 'react-icons/cg';
import { MdArrowDropDown, MdOutlineMoreVert } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { MailType } from '../../../../app/Types/commonTypes';
import Button from '../Button';
import Tooltip from '../Tooltip/Tooltip';
import MailTag from './MailTag';

interface ViewMailSpaceProps {
  mail: MailType;
}

const ViewMailSpace = ({ mail }: ViewMailSpaceProps) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-[calc(100%-16px)] w-full px-4">
      <div className="mt-2 flex min-h-[40px] w-full items-start justify-start gap-x-2 pl-16 text-xl">
        <div className="flex-shink-0">{mail.subject}</div>
        <MailTag />
      </div>
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
              <div className="px-1 text-xs leading-6 text-gray-700">{`<${mail.address}>`}</div>
            </div>
            <div className="flex h-6 w-fit gap-x-1 text-xs ">
              <div className="h-full  leading-[22px] text-gray-700">to me</div>
              <div className="flex-center h-full">
                <MdArrowDropDown size={16} />
              </div>
            </div>
          </div>
          <div className="flex h-full w-fit justify-end text-gray-700">
            <div className="h-full w-fit pr-2 text-xs leading-[48px]">
              {dayjs(mail.time).format('MMMM D, YYYY HH:mm A')}
            </div>
            <Tooltip title={t('reply')} position="bottom">
              <div className="flex-center h-full w-fit">
                <div className="flex-center h-10  w-10 rounded-full hover:bg-gray-100 hover:text-primary-700">
                  <CgMailReply size={18} />
                </div>
              </div>
            </Tooltip>
            <Tooltip title={t('more')} position="bottom">
              <div className="flex-center h-full w-fit">
                <div className="flex-center h-10 w-10 rounded-full hover:bg-gray-100 hover:text-primary-700">
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
            className="h-8  rounded-2xl border-none bg-white text-gray-700 ring-1"
            size="sm"
            color="light"
          >
            <div className="mx-1 flex min-w-[64px] items-center justify-center gap-x-2">
              <div>
                <CgMailReply size={18} />
              </div>
              <div className="text-sm">{t('reply')}</div>
            </div>
          </Button>
          <Button
            className="h-8 w-max rounded-2xl border-none bg-white text-gray-700 ring-1"
            size="sm"
            color="light"
          >
            <div className="mx-1 flex min-w-[64px] items-center justify-center gap-x-2">
              <div>
                <CgMailForward size={18} className="h-full w-fit" />
              </div>
              <div className="text-sm">{t('forward')}</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ViewMailSpace;
