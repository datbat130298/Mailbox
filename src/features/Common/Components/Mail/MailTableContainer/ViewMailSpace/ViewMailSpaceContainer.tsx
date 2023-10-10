import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../../../app/Enums/commonEnums';
import { getConversationById } from '../../../../../../app/Services/ConversationService/ConversationService';
import { getDetailSentById } from '../../../../../../app/Services/Sent/SentService';
import { MailType } from '../../../../../../app/Types/commonTypes';
import Tooltip from '../../../Tooltip/Tooltip';
import MailItemSkeleton from '../../MailItemSkeleton';
import ViewMailSpaceItem from '../ViewMailSpaceItem/ViewMailSpaceItem';

interface ViewMailSpaceContainerProp {
  mailData: MailType | null;
  type: string;
  getDetailById?: (id: number) => void;
  handleClose: () => void;
  onDeleteEmail?: (id: Array<number>) => void;
  onRemoveItem?: (id: number) => void;
}

const ViewMailSpaceContainer = ({
  onDeleteEmail,
  mailData,
  type,
  getDetailById,
  handleClose,
  onRemoveItem,
}: ViewMailSpaceContainerProp) => {
  const [isShowShadow, setIsShowShadow] = useState(false);
  const [selectedMail, setSelectedMail] = useState<MailType>();
  const [conversation, setConversation] = useState<Array<MailType>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();

  const fetchDataDetail = useCallback((id: number) => {
    setIsLoading(true);
    if (_.isFunction(getDetailById)) {
      getDetailById(id)
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

  const fetchDataDetailCustom = useCallback((id: number, functionCallback: (id: number) => void) => {
    setIsLoading(true);
    if (_.isFunction(functionCallback)) {
      functionCallback(id)
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

  const handleSelectMail = (mail: MailType) => {
    setSelectedMail(mail);
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop !== 0) {
      setIsShowShadow(true);
      return;
    }
    setIsShowShadow(false);
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

  return (
    <>
      <div className={twMerge('ml-0.5 flex h-10 items-center justify-between px-5', isShowShadow && '')}>
        <p className="h-max text-left text-base font-medium text-gray-700">{`Subject: ${subjectRe}`}</p>
        <Tooltip title={t('close')} position="bottom">
          <div
            className="flex justify-center rounded-lg text-gray-500 transition-all duration-150 hover:cursor-pointer hover:bg-white  hover:text-primary-500"
            tabIndex={0}
            role="button"
            onClick={handleClose}
          >
            <IoClose className="mt-[3px]" size={20} />
          </div>
        </Tooltip>
      </div>
      {!isLoading && (
        <div className="ml-1 h-[calc(100%-110px)] overflow-y-auto" onScroll={(e) => handleScroll(e)}>
          {mailData && !_.isEmpty(conversation) ? (
            <div>
              {conversation?.map((mail) => (
                <ViewMailSpaceItem
                  onRemoveItem={onRemoveItem}
                  onDeleteEmail={onDeleteEmail}
                  selectedMail={selectedMail || conversation[0]}
                  type={type}
                  key={mail.id}
                  mail={mail}
                  isActive={selectedMail?.id === mail.id}
                  isArray
                  handleSelectMail={handleSelectMail}
                  onClose={handleClose}
                />
              ))}
            </div>
          ) : (
            <ViewMailSpaceItem
              onRemoveItem={onRemoveItem}
              onDeleteEmail={onDeleteEmail}
              onClose={handleClose}
              mail={selectedMail || ({} as unknown as MailType)}
              isActive
              type={type}
              selectedMail={selectedMail || ({} as MailType)}
            />
          )}
        </div>
      )}
      {isLoading &&
        Array.from({ length: 17 }).map((_1, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <MailItemSkeleton key={index} />
        ))}
    </>
  );
};

export default ViewMailSpaceContainer;
