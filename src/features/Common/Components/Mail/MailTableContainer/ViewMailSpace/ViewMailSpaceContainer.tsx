import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { MailType } from '../../../../../../app/Types/commonTypes';
import ViewMailSpaceItem from '../ViewMailSpaceItem/ViewMailSpaceItem';

interface ViewMailSpaceContainerProp {
  mailData: MailType | null;
  type: string;
}

const ViewMailSpaceContainer = ({ mailData, type }: ViewMailSpaceContainerProp) => {
  const [isShowShadow, setIsShowShadow] = useState(false);
  const [selectedMail, setSelectedMail] = useState<MailType>(mailData || ({} as MailType));

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

  return (
    <>
      <div className={twMerge('ml-0.5 flex items-center px-5 py-3', isShowShadow && '')}>
        <p className="h-max text-left text-base font-medium">{`Re: ${subjectRe}`}</p>
      </div>
      <div className="ml-1 h-[calc(100%-110px)] overflow-y-auto" onScroll={(e) => handleScroll(e)}>
        {mailData?.inbox && mailData?.inbox.length ? (
          <>
            <ViewMailSpaceItem
              type={type}
              mail={mailData}
              isActive={selectedMail.id === mailData.id}
              handleSelectMail={handleSelectMail}
              isArray
              isFirstOpen
            />
            {mailData.inbox.map((mail) => (
              <ViewMailSpaceItem
                type={type}
                key={mail.id}
                mail={mail}
                isActive={selectedMail.id === mail.id}
                isArray
                handleSelectMail={handleSelectMail}
              />
            ))}
          </>
        ) : (
          <ViewMailSpaceItem mail={mailData || ({} as unknown as MailType)} isActive type={type} />
        )}
      </div>
    </>
  );
};

export default ViewMailSpaceContainer;
