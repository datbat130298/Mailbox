import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineScheduleSend } from 'react-icons/md';
import { triggerClickOutside } from '../../../../utils/helpers';

interface ComposePopupSelectStatusSendProps {
  onClickSendWithTime: () => void;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

const ComposePopupSelectStatusSend = ({
  onClickSendWithTime,
  isShow,
  setIsShow,
}: ComposePopupSelectStatusSendProps) => {
  const { t } = useTranslation();
  const tabRef = useRef<HTMLDivElement>(null);

  const optionSend = useMemo(
    () => [
      {
        label: t('schedule_send'),
        id: '1',
        icon: <MdOutlineScheduleSend size={23} />,
      },
    ],

    [],
  );

  useEffect(() => {
    triggerClickOutside(tabRef, () => setIsShow(false));
  }, [tabRef, triggerClickOutside]);

  return (
    <div className="absolute -top-10 rounded-lg bg-white shadow-compose" ref={tabRef}>
      {isShow &&
        optionSend.map((item) => (
          <div
            className="my-1.5 flex items-center gap-3 p-1 px-5 text-sm hover:bg-gray-200"
            role="button"
            tabIndex={0}
            onClick={onClickSendWithTime}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
    </div>
  );
};

export default ComposePopupSelectStatusSend;
