import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgMailForward, CgMailReply } from 'react-icons/cg';
import { MdArrowDropDown, MdOutlineMoreVert } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { ComposeViewTypeEnum } from '../../../../app/Enums/commonEnums';
import { getInboxById } from '../../../../app/Services/Inbox/InboxService';
import { ComposeType, MailType } from '../../../../app/Types/commonTypes';
import Button from '../Button';
import ComposePopupContainer from '../ComposePopup/ComposeContainer';
import Tooltip from '../Tooltip/Tooltip';
import MailTag from './MailTag';

const ViewMailSpace = () => {
  const { t } = useTranslation();
  const [composeViewType, setComposeViewType] = useState(ComposeViewTypeEnum.POPUP);
  const [isShowComposePopup, setIsShowComposePopup] = useState(false);
  const [mailInbox, setMail] = useState<MailType>();
  const [composeDraftList, setComposeDraftList] = useState<ComposeType[]>([]);

  const handleShowCompose = (id: number, data: boolean) => {
    composeDraftList[id].isShow = data;
  };

  const { id } = useParams();

  const fetchDataMail = useCallback(() => {
    const data = getInboxById(Number(id));
    if (data) {
      setMail(data);
    }
  }, [id]);

  useEffect(() => {
    fetchDataMail();
  }, [id]);
  const handleClickReply = () => {
    setComposeViewType(ComposeViewTypeEnum.REPLY);
    setIsShowComposePopup(true);
  };

  const handleClickForward = () => {
    setComposeViewType(ComposeViewTypeEnum.FORWARD);
    setIsShowComposePopup(true);
  };

  const handleClear = () => {
    setComposeViewType(ComposeViewTypeEnum.POPUP);
    setIsShowComposePopup(false);
  };

  return (
    <div className="overflow-overlay -z-10 h-full w-full overflow-hidden overflow-y-auto  px-4">
      <div className="mt-2 flex min-h-[40px] w-full items-start justify-start gap-x-2 pl-16 text-xl">
        <div className="flex-shink-0">{mailInbox?.subject}</div>
        <MailTag />
      </div>
      <div className="mb-4 flex h-12 w-full">
        <div className="flex h-12 w-fit flex-shrink-0 items-center justify-center">
          <div
            className={twMerge(
              'flex h-full w-12 flex-shrink-0  items-center justify-center rounded-full bg-cyan-500 drop-shadow',
            )}
          >
            <p className="text-[20px] font-semibold">{mailInbox?.author.slice(0, 1)}</p>
          </div>
        </div>
        <div className="flex h-full w-[calc(100%-48px)] justify-between pl-4">
          <div>
            <div className="flex h-6 w-fit justify-start ">
              <div className="text-sm font-semibold leading-6">{mailInbox?.author}</div>
              <div className="px-1 text-xs leading-6 text-gray-700">{`<${mailInbox?.address}>`}</div>
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
              {dayjs(mailInbox?.time).format('MMMM D, YYYY HH:mm A')}
            </div>
            <Tooltip title={t('reply')} position="bottom">
              <div role="button" tabIndex={0} onClick={handleClickReply} className="flex-center h-full w-fit">
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
      <div className="h-fit pl-16">
        <div className="h-fit w-full text-left">{mailInbox?.content}</div>
        {composeViewType === ComposeViewTypeEnum.POPUP && (
          <div className="mt-8 flex h-fit w-full justify-start gap-x-3 pb-8">
            <Button
              className="h-8 rounded-2xl border-none bg-white text-gray-700 ring-1"
              size="sm"
              color="light"
              onClick={handleClickReply}
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
              onClick={handleClickForward}
            >
              <div className="mx-1 flex min-w-[64px] items-center justify-center gap-x-2">
                <div>
                  <CgMailForward size={18} className="h-full w-fit" />
                </div>
                <div className="text-sm">{t('forward')}</div>
              </div>
            </Button>
          </div>
        )}
      </div>

      <div className="relative z-0 my-8 flex h-[344px] w-full">
        {(composeViewType === ComposeViewTypeEnum.REPLY ||
          composeViewType === ComposeViewTypeEnum.FORWARD) && (
          <div className="h-16 w-16 ">
            <div className="flex h-12 w-fit flex-shrink-0 items-center justify-center">
              <div
                className={twMerge(
                  'flex h-full w-12 flex-shrink-0  items-center justify-center rounded-full bg-purple-700 drop-shadow',
                )}
              >
                <p className="text-[20px] font-semibold text-white">{mailInbox?.author.slice(0, 1)}</p>
              </div>
            </div>
          </div>
        )}

        <ComposePopupContainer
          composeDraftList={composeDraftList}
          handleShowCompose={handleShowCompose}
          setComposeDraftList={setComposeDraftList}
          composeClassName="z-0"
          onClear={handleClear}
          fromMail={mailInbox}
          viewType={composeViewType}
          isShowComposePopup={isShowComposePopup}
          composePopupStyle={
            composeViewType === ComposeViewTypeEnum.REPLY || composeViewType === ComposeViewTypeEnum.FORWARD
              ? {
                  containerClassName:
                    'absolute right-0 top-0 h-[444px] w-[calc(100%-64px)] rounded-2xl overflow-auto',
                  composeClassName: 'h-[258px]',
                }
              : {
                  containerClassName: '',
                  composeClassName: '',
                }
          }
        />
      </div>
    </div>
  );
};
export default ViewMailSpace;
