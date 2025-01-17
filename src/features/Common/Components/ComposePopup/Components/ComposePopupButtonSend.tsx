import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiArrowUpSFill } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';
import ButtonRipple from '../../Button/ButtonRipple/ButtonRiple';
import ComposePopupSelectStatusSend from './ComposePopupSelectStatusSend';
import './style.scss';

interface ComposePopupButtonSendProps {
  onClickSend: () => void;
  onClickSendWithTime: () => void;
  isLoading: boolean;
}

const ComposePopupButtonSend = ({
  onClickSend,
  onClickSendWithTime,
  isLoading,
}: ComposePopupButtonSendProps) => {
  const [isShowStatusSend, setIsShowStatusSend] = useState<boolean>(false);

  const { t } = useTranslation();
  const handleClickArrow = () => {
    setIsShowStatusSend(true);
  };

  const handleClickSendWihTime = () => {
    onClickSendWithTime();
    setIsShowStatusSend(false);
  };

  return (
    <>
      {!isLoading && (
        <div
          className={twMerge(
            'relative flex translate-y-1 items-center rounded-full bg-mainColor-500 text-white',
          )}
        >
          <ButtonRipple
            className=" flex h-9 w-16 items-center justify-center rounded-l-full border-r border-gray-200 bg-mainColor-500 text-sm font-medium uppercase ring-0 hover:bg-primary-700"
            onClick={onClickSend}
          >
            {t('send')}
          </ButtonRipple>

          <ButtonRipple
            className="py-auto flex items-center rounded-r-full bg-mainColor-500 px-2 ring-0 hover:bg-mainColor-500"
            onClick={handleClickArrow}
          >
            <RiArrowUpSFill size={15} className="rotate-180" />
          </ButtonRipple>
          {/* <div
            className="py-auto flex items-center rounded-r-full px-2 hover:bg-primary-700"
            tabIndex={0}
            role="button"
          >
          </div> */}
        </div>
      )}
      {isLoading && (
        <div className="flex h-9 w-[95px] translate-y-1 items-center justify-center rounded-full bg-primary-700 px-4 text-sm font-medium text-white opacity-80">
          Sending
          <div className="flex translate-y-1 items-center justify-center">
            <span className="loading__dot" />
            <span className="loading__dot" />
            <span className="loading__dot" />
          </div>
        </div>
      )}
      <ComposePopupSelectStatusSend
        isShow={isShowStatusSend}
        setIsShow={setIsShowStatusSend}
        onClickSendWithTime={handleClickSendWihTime}
      />
    </>
  );
};
export default ComposePopupButtonSend;
