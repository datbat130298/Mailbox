import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { MailType } from '../../../../../../app/Types/commonTypes';
import ViewMailSpaceItem from '../ViewMailSpaceItem/ViewMailSpaceItem';

interface ViewMailSpaceContainerProp {
  mailData: MailType | null;
}

const ViewMailSpaceContainer = ({ mailData }: ViewMailSpaceContainerProp) => {
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
      <div className={twMerge('ml-0.5 flex h-12 items-center px-5', isShowShadow && '')}>
        <p className="line-clamp-1 text-ellipsis text-left text-base font-medium">{`Re: ${subjectRe}`}</p>
      </div>
      <div className="ml-1 h-[calc(100%-110px)] overflow-y-auto" onScroll={(e) => handleScroll(e)}>
        {mailData?.inbox && mailData?.inbox.length ? (
          <>
            <ViewMailSpaceItem
              mail={mailData}
              isActive={selectedMail.uuid === mailData.uuid}
              handleSelectMail={handleSelectMail}
              isArray
              isFirstOpen
            />
            {mailData.inbox.map((mail) => (
              <ViewMailSpaceItem
                key={mail.uuid}
                mail={mail}
                isActive={selectedMail.uuid === mail.uuid}
                isArray
                handleSelectMail={handleSelectMail}
              />
            ))}
          </>
        ) : (
          <ViewMailSpaceItem mail={mailData} isActive />
        )}
      </div>
    </>
  );
};

export default ViewMailSpaceContainer;
