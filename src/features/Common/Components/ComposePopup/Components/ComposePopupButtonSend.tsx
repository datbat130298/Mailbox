import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiArrowUpSFill } from 'react-icons/ri';
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
      <div className="item-center relative flex rounded-full bg-blue-700 text-white">
        <div
          className="flex items-center rounded-l-full border-r border-gray-800 py-2 pl-5 pr-4 text-sm font-medium uppercase hover:bg-blue-600"
          tabIndex={0}
          role="button"
          onClick={onClickSend}
        >
          {t('send')}
        </div>
        <div
          className="py-auto flex items-center rounded-r-full px-2 hover:bg-blue-600"
          tabIndex={0}
          role="button"
          onClick={handleClickArrow}
        >
          <RiArrowUpSFill size={15} className="rotate-180" />
        </div>
      </div>
      <ComposePopupSelectStatusSend isShow={isShowStatusSend} onClickSendWithTime={handleClickSendWihTime} />
    </>
  );
};
export default ComposePopupButtonSend;
