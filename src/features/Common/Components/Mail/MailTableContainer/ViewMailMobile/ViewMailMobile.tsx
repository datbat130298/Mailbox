/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IoArrowBack } from 'react-icons/io5';
import { MdMoreVert, MdRestore } from 'react-icons/md';
import { RiDeleteBin6Line, RiMailDownloadLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { TypeChat } from '../../../../../../app/Enums/commonEnums';
import { getConversationById } from '../../../../../../app/Services/ConversationService/ConversationService';
import { getDetailSentById } from '../../../../../../app/Services/Sent/SentService';
import { MailType } from '../../../../../../app/Types/commonTypes';
import useDispatch from '../../../../../Hooks/useDispatch';
import useNotify from '../../../../../Hooks/useNotify';
import FilterDropdown, { FilterItemType } from '../../../FilterDropdown/FilterDropdown';
import Modal from '../../../Modal/Modal';
import Tooltip from '../../../Tooltip/Tooltip';
import MailItemSkeleton from '../../MailItemSkeleton';
import MailTag from '../../MailTag';
import ViewMailSpaceItemMobile from './ViewMailSpaceItemMobile';

interface ViewMailMobileProps {
  type: TypeChat;
  isOpen: boolean;
  onClose: () => void;
  onClickReply: () => void;
  mailData: MailType | null;
  onClickForward: () => void;
  onClickReplyAll: () => void;
  onRemoveItem?: (id: number) => void;
  getDetailById?: (id: number) => void;
  onClickDeleteMail?: (id: number) => void;
  onClickRestoreMail?: (id: number) => void;
  onRateStar?: (id: number, value: boolean) => void;
  onDeleteEmail?: (ids: Array<number>) => void;
  onClickCancelSchedule?: (id: number) => void;
}

const ViewMailMobile = ({
  type,
  isOpen,
  onClose,
  mailData,
  onRateStar,
  onRemoveItem,
  onClickReply,
  getDetailById,
  onDeleteEmail,
  onClickForward,
  onClickReplyAll,
  onClickDeleteMail,
  onClickRestoreMail,
  onClickCancelSchedule,
}: ViewMailMobileProps) => {
  const { t } = useTranslation();
  const [, setIsShowCompose] = useState(false);
  const [conversation, setConversation] = useState<Array<MailType>>([]);
  const [selectedMail, setSelectedMail] = useState<MailType>({} as MailType);
  const [isActiveStar, setIsActiveStar] = useState(false);
  const [emailReply, setEmailReply] = useState({});
  const { id } = useParams();
  const toast = useNotify();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataDetail = useCallback((idx: number) => {
    setIsLoading(true);
    if (_.isFunction(getDetailById)) {
      getDetailById(idx)
        .then((res: Array<MailType> | MailType) => {
          if (_.isArray(res)) {
            setConversation(res);
            return;
          }
          setSelectedMail(res as MailType);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);
  const fetchDataDetailCustom = useCallback((index: number, functionCallback: (id: number) => void) => {
    setIsLoading(true);
    if (_.isFunction(functionCallback)) {
      functionCallback(index)
        .then((res: Array<MailType> | MailType) => {
          if (_.isArray(res)) {
            setConversation(res);
            return;
          }
          setSelectedMail(res as MailType);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

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

  const handleClickCancelSchedule = useCallback(() => {
    if (_.isFunction(onClickCancelSchedule) && !_.isEmpty(selectedMail)) {
      onClickCancelSchedule(selectedMail?.id || 0);
    }
  }, [selectedMail]);

  const filterDropDown = useMemo(() => {
    return [
      {
        uuid: 1,
        label: t('cancel_schedule'),
        value: 'cancel_schedule',
        onClick: handleClickCancelSchedule,
      },
    ];
  }, []);

  const handleClickForward = () => {
    onClose();
    setIsShowCompose(true);
  };

  const handleClear = () => {
    setIsShowCompose(false);
  };

  useEffect(() => {
    if (mailData) {
      setSelectedMail(mailData);
    }
    if (_.isFunction(getDetailById) && mailData) {
      fetchDataDetail(mailData.id);
      return;
    }
    if (!_.isFunction(getDetailById) && mailData) {
      if (mailData.source && mailData.source === TypeChat.SENTS) {
        fetchDataDetailCustom(mailData.id, getDetailSentById);
        return;
      }
      if (mailData.source && mailData.source === TypeChat.EMAIL) {
        fetchDataDetailCustom(mailData.id, getConversationById);
        return;
      }
    }
    setIsLoading(false);
  }, [mailData, type]);

  const handleClickStar = () => {
    setIsActiveStar((prev) => !prev);
    if (type === TypeChat.STARRED && _.isFunction(onRemoveItem) && !_.isEmpty(mailData)) {
      onRemoveItem(mailData.id);
    }
    if (_.isFunction(onRateStar) && !_.isEmpty(mailData)) {
      onRateStar(mailData.id, !isActiveStar);
    }
  };

  const handleClickDelete = () => {
    if (_.isFunction(onClickDeleteMail)) {
      onClose();
      onClickDeleteMail(selectedMail!.id);
    }
  };

  const handleClickRestore = () => {
    if (_.isFunction(onClickRestoreMail)) {
      onClose();
      onClickRestoreMail(selectedMail!.id);
    }
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
      <div className="flex h-full w-full flex-col overflow-hidden bg-white">
        <div className="flex w-full flex-col bg-slate-100 p-3 px-4">
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
              {type !== TypeChat.TRASH && (
                <Tooltip position="bottom" title={t('trash')}>
                  <div className="" tabIndex={0} onClick={handleClickDelete} role="button">
                    <RiDeleteBin6Line size={19} className="ml-1" />
                  </div>
                </Tooltip>
              )}
              {type === TypeChat.TRASH && (
                <Tooltip position="bottom" title={t('restore')}>
                  <div className="" tabIndex={0} onClick={handleClickRestore} role="button">
                    <MdRestore size={19} className="ml-1" />
                  </div>
                </Tooltip>
              )}
              <FilterDropdown
                data={type === TypeChat.SCHEDULE ? (filterDropDown as FilterItemType[]) : []}
                position="right-5 top-7"
                className="-mx-2 h-3"
                type={type}
                icon={<MdMoreVert size={20} />}
              />
            </div>
          </div>
          <div className="flex justify-start gap-2 bg-slate-100 px-1 pb-0.5 pt-1">
            <p className="h-max text-left text-base font-medium">{`Re: ${subjectRe}`}</p>
          </div>
        </div>

        {/* content */}
        <div className="h-full w-full overflow-auto">
          {!isLoading && (
            <div className="h-full w-full overflow-auto">
              {mailData && !_.isEmpty(conversation) ? (
                <>
                  {conversation.map((item) => (
                    <ViewMailSpaceItemMobile
                      key={item.id}
                      isArray
                      selectedEmail={selectedMail}
                      handleSelectMail={handleSelectMail}
                      isActive={selectedMail.id === item.id}
                      mail={item}
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
                  mail={selectedMail || ({} as unknown as MailType)}
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
