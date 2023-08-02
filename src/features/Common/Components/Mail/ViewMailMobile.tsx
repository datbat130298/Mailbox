import dayjs from 'dayjs';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgMailForward, CgMailReply } from 'react-icons/cg';
import { useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { getMailById } from '../../../../app/Services/Inbox/InboxService';
import { MailType } from '../../../../app/Types/commonTypes';
import useSelector from '../../../Hooks/useSelector';
import Button from '../Button';
import Modal from '../Modal/Modal';
import MailTag from './MailTag';

interface ViewMailMobileProps {
  mailData: MailType | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewMailMobile = ({ mailData, isOpen, onClose }: ViewMailMobileProps) => {
  const { t } = useTranslation();
  const [, setIsShowCompose] = useState(false);
  const [mail, setMail] = useState<MailType>();
  const { uuid } = useParams();

  const emailUser = useSelector((state) => state.user.email);

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

  const contentDefaultForward = `<br><br><p>---------- Forwarded message -------- <br> From: ${mailData?.from_user?.email} <br>Date: ${mailData?.time}<br>Subject: ${mailData?.subject}<br>To: ${emailUser}</p>`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const contentForward = `${contentDefaultForward} <br><br> ${mailData?.content}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isShowFooter={false}
      isShowHeader={false}
      className="overflow-hidden rounded-none"
      contentContainerClassName="p-0 h-screen w-screen rounded-none"
    >
      <div className="overflow-overlay z-49 h-full w-full overflow-hidden overflow-y-auto">
        <div className=" flex h-10 w-full items-center justify-between px-2 text-xl shadow-bottom">
          <div className="flex max-w-[256px] items-center justify-start gap-x-2">
            <div className="max-w-[220px] flex-shrink-0 truncate">{mail?.subject}</div>
            <MailTag />
          </div>
          <div
            className="flex h-6 w-6 flex-shrink-0  items-center justify-center rounded-full text-sm font-normal underline hover:bg-slate-200"
            role="button"
            tabIndex={0}
            onClick={onClose}
          >
            Back
          </div>
        </div>
        <div className="mb-2 mt-2 flex h-12 w-full px-2">
          <div className="flex h-12 w-fit flex-shrink-0 items-center justify-center">
            <div
              className={twMerge(
                'flex h-full w-12 flex-shrink-0  items-center justify-center rounded-full bg-cyan-500 drop-shadow',
              )}
            >
              <p className="text-xl font-semibold">{mail?.author.slice(0, 1)}</p>
            </div>
          </div>
          <div className="flex h-full w-[calc(100%-48px)] justify-between pl-2">
            <div>
              <div className="flex h-6 w-fit justify-start ">
                <div className="text-sm font-semibold leading-6">{mail?.author}</div>
                <div className="px-1 text-xs leading-6 text-gray-700">{`<${mail?.address}>`}</div>
              </div>
              <div className="h-fit w-fit pr-2 text-xs ">
                {dayjs(mail?.time).format('MMMM D, YYYY HH:mm A')}
              </div>
            </div>
          </div>
        </div>
        <div className="h-fit pl-16">
          <div className="h-fit w-full text-left">
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: mailData ? mailData.content : ' ' }}
            />
          </div>

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
        </div>
      </div>
    </Modal>
  );
};
export default ViewMailMobile;
