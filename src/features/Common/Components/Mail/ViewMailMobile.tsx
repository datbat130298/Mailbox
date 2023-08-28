/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IoArrowBack } from 'react-icons/io5';
import { MdMoreVert } from 'react-icons/md';
import { RiDeleteBin6Line, RiMailDownloadLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import {
  getConversationById,
  getMailById,
} from '../../../../app/Services/ConversationService/ConversationService';
import { MailType } from '../../../../app/Types/commonTypes';
import useNotify from '../../../Hooks/useNotify';
import Modal from '../Modal/Modal';
import Tooltip from '../Tooltip/Tooltip';
import MailItemSkeleton from './MailItemSkeleton';
import ViewMailSpaceItemMobile from './MailTableContainer/ViewMailMobile/ViewMailSpaceItemMobile';
import MailTag from './MailTag';

interface ViewMailMobileProps {
  mailData: MailType | null;
  isOpen: boolean;
  onClose: () => void;
  onClickReply: () => void;
  onClickForward: () => void;
  onClickReplyAll: () => void;
  type: TypeChat;
}

const ViewMailMobile = ({
  type,
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
  const [conversation, setConversation] = useState<Array<MailType>>([]);
  const [selectedMail, setSelectedMail] = useState<MailType>(mailData || ({} as MailType));
  const [isActiveStar, setIsActiveStar] = useState(false);
  const [emailReply, setEmailReply] = useState({});
  const { id } = useParams();
  const toast = useNotify();
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataMail = useCallback((mailId: string | undefined) => {
    const data = getMailById(Number(mailId));
    if (data) {
      setMail(data as MailType);
    }
  }, []);

  const fetchDataConversation = useCallback(
    (idMail: number) => {
      setIsLoading(true);
      getConversationById(idMail)
        .then((res) => setConversation(res))
        .catch((err) => toast.error(err.message))
        .finally(() => setIsLoading(false));
    },
    [type, mailData],
  );

  useEffect(() => {
    if (!_.isEmpty(mailData) && type === TypeChat.INBOX) {
      fetchDataConversation(mailData.id);
    }
  }, [mailData, type]);

  useEffect(() => {
    if (!_.isEmpty(mailData)) {
      setMail(mailData);
    } else {
      fetchDataMail(id);
    }
  }, [id, mailData, fetchDataMail]);

  const subjectRe = useMemo(() => {
    if (mailData?.subject) return mailData.subject;
    return '(No subject)';
  }, [mailData]);

  const handleClickReply = () => {
    onClose();
    setEmailReply({ email: mailData?.address });
    setIsShowCompose(true);
  };

  const handleSelectMail = (mailSelected: MailType) => {
    setSelectedMail(mailSelected);
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
        <div className="fixed flex w-full flex-col bg-slate-100 p-3 px-4">
          <div className="flex  items-center justify-between">
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
          <div className="flex justify-start gap-2 bg-slate-100 px-1 pb-0.5 pt-1">
            {/* <p className="flex h-full justify-start font-medium">Subject:</p> */}
            <p className="h-max text-left text-base font-medium">{`Re: ${subjectRe}`}</p>
          </div>
        </div>

        {/* content */}
        <div className="h-full w-full overflow-auto pt-[86px] md:px-[30px]">
          {!isLoading && (
            <div className="h-full w-full overflow-auto">
              {mailData && !_.isEmpty(conversation) ? (
                <>
                  <ViewMailSpaceItemMobile
                    isActive={selectedMail.id === mailData?.id}
                    isArray
                    mail={mailData}
                    onClickForward={onClickForward}
                    onClickReply={onClickReply}
                    onClickReplyAll={onClickReplyAll}
                    handleSelectMail={handleSelectMail}
                    selectedEmail={selectedMail}
                    type={type}
                  />
                  {conversation.map((item) => (
                    <ViewMailSpaceItemMobile
                      isArray
                      selectedEmail={selectedMail}
                      handleSelectMail={handleSelectMail}
                      isActive={selectedMail.id === item.id}
                      mail={item?.email || item}
                      type={item?.type || type}
                      onClickForward={onClickForward}
                      onClickReply={onClickReply}
                      onClickReplyAll={onClickReplyAll}
                    />
                  ))}
                </>
              ) : (
                <ViewMailSpaceItemMobile
                  type={type}
                  handleSelectMail={handleSelectMail}
                  selectedEmail={selectedMail}
                  isActive
                  mail={mailData || ({} as unknown as MailType)}
                  onClickForward={onClickForward}
                  onClickReply={onClickReply}
                  onClickReplyAll={onClickReplyAll}
                />
              )}
            </div>
          )}
          {isLoading &&
            Array.from({ length: 17 }).map((_1, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <MailItemSkeleton key={index} />
            ))}
        </div>
      </div>
    </Modal>
  );
};
export default ViewMailMobile;
