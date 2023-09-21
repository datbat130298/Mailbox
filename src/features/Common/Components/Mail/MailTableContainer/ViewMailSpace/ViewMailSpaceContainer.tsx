import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../../../app/Enums/commonEnums';
import { getConversationById } from '../../../../../../app/Services/ConversationService/ConversationService';
import { MailType } from '../../../../../../app/Types/commonTypes';
import MailItemSkeleton from '../../MailItemSkeleton';
import ViewMailSpaceItem from '../ViewMailSpaceItem/ViewMailSpaceItem';

interface ViewMailSpaceContainerProp {
  mailData: MailType | null;
  type: string;
}

const ViewMailSpaceContainer = ({ mailData, type }: ViewMailSpaceContainerProp) => {
  const [isShowShadow, setIsShowShadow] = useState(false);
  const [selectedMail, setSelectedMail] = useState<MailType>(mailData || ({} as MailType));
  const [conversation, setConversation] = useState<Array<MailType>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataConversation = useCallback((id: number) => {
    setIsLoading(true);
    getConversationById(id).then((res) => {
      setConversation(res);
      setIsLoading(false);
    });
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
    if (type === TypeChat.INBOX && mailData) {
      fetchDataConversation(mailData.id);
      return;
    }
    setIsLoading(false);
  }, [mailData, type]);

  return (
    <>
      <div className={twMerge('ml-0.5 flex items-center px-5 py-3', isShowShadow && '')}>
        <p className="h-max text-left text-base font-medium">{`Re: ${subjectRe}`}</p>
      </div>
      {!isLoading && (
        <div className="ml-1 h-[calc(100%-110px)] overflow-y-auto" onScroll={(e) => handleScroll(e)}>
          {mailData && !_.isEmpty(conversation) ? (
            <div>
              {conversation?.map((mail) => (
                <ViewMailSpaceItem
                  selectedMail={selectedMail}
                  type={type}
                  key={mail.id}
                  mail={mail?.email || mail}
                  isActive={selectedMail.id === mail.id}
                  isArray
                  handleSelectMail={handleSelectMail}
                />
              ))}
            </div>
          ) : (
            <ViewMailSpaceItem
              mail={mailData || ({} as unknown as MailType)}
              isActive
              type={type}
              selectedMail={selectedMail}
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
