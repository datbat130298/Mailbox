/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from 'dayjs';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IoArrowBack } from 'react-icons/io5';
import { LuForward, LuReply, LuReplyAll } from 'react-icons/lu';
import { MdMoreVert } from 'react-icons/md';
import { RiDeleteBin6Line, RiMailDownloadLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { getMailById } from '../../../../app/Services/Inbox/InboxService';
import { MailType } from '../../../../app/Types/commonTypes';
import Modal from '../Modal/Modal';
import Tooltip from '../Tooltip/Tooltip';
import MailTag from './MailTag';

interface ViewMailMobileProps {
  mailData: MailType | null;
  isOpen: boolean;
  onClose: () => void;
  onClickReply?: () => void;
  onClickForward?: () => void;
  onClickReplyAll?: () => void;
}

const ViewMailMobile = ({
  mailData,
  isOpen,
  onClose,
  onClickForward,
  onClickReply,
  onClickReplyAll,
}: ViewMailMobileProps) => {
  const { t } = useTranslation();
  const [, setIsShowCompose] = useState(false);
  const [mail, setMail] = useState<MailType>();
  const [isActiveStar, setIsActiveStar] = useState(false);
  const [emailReply, setEmailReply] = useState({});
  const { uuid } = useParams();

  const fetchDataMail = useCallback((mailId: string | undefined) => {
    const data = getMailById(Number(mailId));
    if (data) {
      setMail(data as MailType);
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(mailData)) {
      setMail(mailData);
    } else {
      fetchDataMail(uuid);
    }
  }, [uuid, mailData, fetchDataMail]);

  const handleClickReply = () => {
    onClose();
    setEmailReply({ email: mailData?.address });
    setIsShowCompose(true);
  };

  const handleClickForward = () => {
    onClose();
    setIsShowCompose(true);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClear = () => {
    setIsShowCompose(false);
  };

  const handleClickStar = () => {
    setIsActiveStar((prev) => !prev);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isShowFooter={false}
      isShowHeader={false}
      className="overflow-hidden rounded-none"
      contentContainerClassName="p-0 h-screen w-screen rounded-none"
    >
      <div className="h-full w-full overflow-hidden bg-white">
        <div className="fixed flex w-full items-center justify-between bg-slate-100 p-3">
          <div className="flex items-center justify-center space-x-3">
            <div role="button" tabIndex={0} onClick={onClose}>
              <IoArrowBack size={22} className="mt-0.5" />
            </div>
            <MailTag />
            <div tabIndex={0} role="button" onClick={handleClickStar} className="basic-2/12">
              {!isActiveStar ? (
                <AiOutlineStar className="text-slate-700" size={22} />
              ) : (
                <AiFillStar className="text-primary-500" size={22} />
              )}
            </div>
          </div>

          <div className="-mr-1 flex items-center space-x-3 text-gray-800">
            <Tooltip position="bottom" title={t('storage')}>
              <RiMailDownloadLine size={19} className="ml-1" />
            </Tooltip>
            <Tooltip position="bottom" title={t('trash')}>
              <RiDeleteBin6Line size={19} className="ml-1" />
            </Tooltip>
            <Tooltip position="bottom" title={t('more')}>
              <MdMoreVert size={22} />
            </Tooltip>
          </div>
        </div>

        {/* content */}
        <div className="mt-[53px] h-full w-full overflow-auto pb-16 md:px-[30px]">
          <div className=" flex justify-start gap-2 bg-white px-4 pt-3">
            {/* <p className="flex h-full justify-start font-medium">Subject:</p> */}
            <p className="font-normal italic underline"> {mail?.subject}</p>
          </div>
          <div className="w-full bg-white px-3 py-2 ">
            <div className="flex w-full justify-between space-x-3">
              <div className="flex w-3/4 ">
                <div
                  className={twMerge(
                    'flex h-12 w-12 flex-shrink-0  items-center justify-center rounded-full bg-cyan-500 drop-shadow',
                  )}
                >
                  <p className="text-xl font-semibold">{mail?.author.slice(0, 1)}</p>
                </div>
                <div className="ml-2 flex w-[calc(100%-48px)] flex-col justify-between py-0.5">
                  <div className="truncate font-medium">{mail?.author}</div>
                  <div className="h-fit w-fit text-xs">
                    {dayjs(mail?.time).format('MMMM D, YYYY HH:mm A')}
                  </div>
                </div>
              </div>
              <div className="flex h-12 w-1/4 items-center justify-end space-x-2">
                <div role="button" className="my-auto w-5" tabIndex={0} onClick={() => null}>
                  <LuReply size={18} />
                </div>
                <div role="button" className="my-auto w-5" tabIndex={0} onClick={() => null}>
                  <MdMoreVert size={20} />
                </div>
              </div>
            </div>
            {/*  content mail */}
            <div className="px-1 pt-3 text-justify text-sm">
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: mailData ? mailData.content : ' ' }} />
            </div>
          </div>
          <div className="mb-4 mt-2 flex w-full justify-center space-x-4">
            <div className="flex h-14 w-24 items-center justify-center rounded-4xl border border-gray-700">
              <div className="text-sm" role="button" tabIndex={0} onClick={onClickReply}>
                <LuReply size={19} className="mx-auto -mb-1" />
                Reply
              </div>
            </div>
            <div className="flex h-14 w-24 items-center justify-center rounded-4xl border border-gray-700">
              <div className="text-sm" role="button" tabIndex={0} onClick={onClickReplyAll}>
                <LuReplyAll size={19} className="mx-auto -mb-1" />
                Reply all
              </div>
            </div>
            <div className="flex h-14 w-24 items-center justify-center rounded-4xl border border-gray-700">
              <div className="text-sm" role="button" tabIndex={0} onClick={onClickForward}>
                <LuForward size={19} className="mx-auto -mb-1" />
                Forward
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ViewMailMobile;
