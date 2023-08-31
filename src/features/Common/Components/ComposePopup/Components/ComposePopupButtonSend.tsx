import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiArrowUpSFill } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';
import ComposePopupSelectStatusSend from './ComposePopupSelectStatusSend';

interface ComposePopupButtonSendProps {
  onClickSend: () => void;
  onClickArrow: () => void;
  onClickSendWithTime: () => void;
}

const ComposePopupButtonSend = ({
  onClickSend,
  onClickArrow,
  onClickSendWithTime,
}: ComposePopupButtonSendProps) => {
  const [isShowStatusSend, setIsShowStatusSend] = useState<boolean>(false);

  const { t } = useTranslation();

  const handleClickArrow = () => {
    onClickArrow();
    setIsShowStatusSend(true);
  };

  const handleClickSendWihTime = () => {
    onClickSendWithTime();
    setIsShowStatusSend(false);
  };

  return (
    <>
      <div
        className={twMerge(
          'item-center relative flex translate-y-[4px] rounded-full bg-primary-500 text-white',
        )}
      >
        <div
          className="flex h-9 w-16 items-center justify-center rounded-l-full border-r border-gray-200 text-sm font-medium uppercase hover:bg-primary-700"
          tabIndex={0}
          role="button"
          onClick={onClickSend}
        >
          {t('send')}
        </div>
        <div
          className="py-auto flex items-center rounded-r-full px-2 hover:bg-primary-700"
          tabIndex={0}
          role="button"
          onClick={handleClickArrow}
        >
          <RiArrowUpSFill size={15} className="rotate-180" />
        </div>
      </div>
      <ComposePopupSelectStatusSend
        isShow={isShowStatusSend}
        setIsShow={setIsShowStatusSend}
        onClickSendWithTime={handleClickSendWihTime}
      />
    </>
  );
};
export default ComposePopupButtonSend;
