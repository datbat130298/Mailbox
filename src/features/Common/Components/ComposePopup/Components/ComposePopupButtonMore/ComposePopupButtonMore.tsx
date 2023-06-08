import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { triggerClickOutside } from '../../../../../utils/helpers';
import Tooltip from '../../../Tooltip/Tooltip';
import ComposePopupMoreOptionItem from './ComposePopupMoreOptionItem';

interface ComposePopupButtonMoreProp {
  className?: string;
  title: string;
  onClick: () => void;
  id?: string;
  icon: React.ReactNode;
  isActive: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const ComposePopupButtonMore = ({
  className,
  title,
  onClick,
  id,
  icon,
  isActive,
  setActive,
}: ComposePopupButtonMoreProp) => {
  const ref = useRef(null);

  const handleClickSetDefaultFullScreen = () => {
    setActive(false);
    if (localStorage.getItem('defaultFullScreen') === 'true') {
      localStorage.setItem('defaultFullScreen', 'false');
    } else {
      localStorage.setItem('defaultFullScreen', 'true');
    }
  };

  const arrayOption = useMemo(() => {
    return [
      {
        id: 1,
        label: 'Default to full screen',
        isActive: 0,
      },
      {
        id: 4,
        label: 'Label',
      },
      {
        id: 2,
        label: 'Plain text mode',
        isActive: 0,
      },
      {
        id: 3,
        label: 'Print',
      },
      {
        id: 5,
        label: 'Check Spelling',
      },
      {
        id: 6,
        label: 'Smart Compose feedback',
      },
    ];
  }, []);

  useEffect(() => {
    triggerClickOutside(ref, () => setActive(false));
  }, [ref, triggerClickOutside]);

  return (
    <div className="relative">
      <Tooltip title={title} position="top">
        <div
          id={id}
          className={twMerge(
            '-mb-2.5 -mr-1 flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100',
            isActive && 'bg-gray-200',
            className,
          )}
          onClick={onClick}
          role="button"
          tabIndex={0}
        >
          {icon}
        </div>
      </Tooltip>
      {isActive && (
        <div className="absolute -right-48 -top-48" ref={ref}>
          <div className="h-max w-max rounded-lg bg-white py-1 text-center shadow-compose">
            {arrayOption.map((option) => (
              <ComposePopupMoreOptionItem
                item={option}
                className=""
                onClick={handleClickSetDefaultFullScreen}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComposePopupButtonMore;
