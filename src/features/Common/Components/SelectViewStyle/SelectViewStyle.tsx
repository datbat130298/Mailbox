import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineViewList, MdOutlineViewModule, MdOutlineViewQuilt } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { setMailItemStyle } from '../../../../app/Slices/layoutSlice';
import useDispatch from '../../../Hooks/useDispatch';
import useSelector from '../../../Hooks/useSelector';
import { triggerClickOutside } from '../../../utils/helpers';

interface SelectViewStyleType {
  uuid: number;
  label: string;
  value: string;
  icon: React.ReactNode;
}

const SelectViewStyle = () => {
  const { t } = useTranslation();
  const viewStyleTabRef = useRef<HTMLDivElement>(null);
  const [isShowSelectViewStyle, setIsShowSelectViewStyle] = useState(false);
  const dispatch = useDispatch();
  const { itemMailStyle } = useSelector((state) => state.layout);
  const [selectStyle, setSelectStyle] = useState<SelectViewStyleType>({
    uuid: 1,
    label: t('classic'),
    value: 'classic',
    icon: <MdOutlineViewQuilt size={22} />,
  });
  const styleViews = [
    {
      uuid: 1,
      label: t('grid'),
      value: 'grid',
      icon: <MdOutlineViewModule size={21} />,
    },
    {
      uuid: 2,
      label: t('classic'),
      value: 'classic',
      icon: <MdOutlineViewQuilt size={21} />,
    },
    {
      uuid: 3,
      label: t('compact'),
      value: 'compact',
      icon: <MdOutlineViewList size={21} />,
    },
  ];

  useEffect(() => {
    triggerClickOutside(viewStyleTabRef, () => setIsShowSelectViewStyle(false));
  }, [viewStyleTabRef, triggerClickOutside]);

  useEffect(() => {
    const currentStyle = styleViews.find((item) => item.value === itemMailStyle);
    if (currentStyle) {
      setSelectStyle(currentStyle);
    }
  }, [itemMailStyle]);

  return (
    <div
      className="flex-center my-3 h-8 w-max rounded-md p-2 text-sm hover:bg-gray-100 hover:text-primary-700"
      role="button"
      tabIndex={0}
      onClick={() => setIsShowSelectViewStyle((prev) => !prev)}
      ref={viewStyleTabRef}
    >
      <div className="relative">
        {selectStyle.icon}
        <div
          className={twMerge(
            'absolute -right-2 top-8 z-50 hidden h-fit w-fit rounded-md bg-white p-1 text-gray-700 shadow-box',
            isShowSelectViewStyle && 'block',
          )}
        >
          {styleViews?.map((item) => (
            <div
              className={twMerge(
                'flex h-8 w-full rounded-sm hover:bg-gray-200 hover:text-primary-700',
                selectStyle?.uuid === item.uuid && 'bg-gray-200 text-primary-700',
              )}
              key={item.uuid}
              role="button"
              tabIndex={0}
              onClick={() => {
                setIsShowSelectViewStyle(false);
                setSelectStyle(item);
                dispatch(setMailItemStyle(item.value));
              }}
            >
              <div className="flex-center mr-1 h-full w-8">{item.icon}</div>
              <div className="h-full w-[104px] justify-start text-start text-sm leading-8">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectViewStyle;
