import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { MailType } from '../../../../../app/Types/commonTypes';
import ViewMailSpaceItem from './ViewMailSpaceItem/ViewMailSpaceItem';

interface ViewMailSpaceContainerProp {
  mailData: MailType | null;
}

const ViewMailSpaceContainer = ({ mailData }: ViewMailSpaceContainerProp) => {
  const [isShowShadow, setIsShowShadow] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleClickItem = () => {
    setIsOpen((prev: boolean) => !prev);
  };

  const subjectRe = useMemo(() => {
    if (mailData?.subject) return mailData.subject;
    return '(No subject)';
  }, [mailData]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop !== 0) {
      setIsShowShadow(true);
      return;
    }
    setIsShowShadow(false);
  };

  return (
    <>
      <div className={twMerge('flex h-12 items-center px-6', isShowShadow && 'shadow-bottom')}>
        <p className="line-clamp-1 text-ellipsis text-base font-medium">{`Re: ${subjectRe}`}</p>
      </div>
      <div className="mx-3">
        <ViewMailSpaceItem
          mail={mailData}
          isActive
          isOpen={isOpen}
          onClickViewMailHeader={handleClickItem}
          handleScroll={handleScroll}
        />
      </div>
    </>
  );
};

export default ViewMailSpaceContainer;
