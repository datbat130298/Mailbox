import { useEffect, useRef, useState } from 'react';
import { MdOutlineViewList, MdOutlineViewModule, MdOutlineViewQuilt } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

const SelectViewStyle = () => {
  const viewStyleTabRef = useRef<HTMLDivElement>(null);
  const [isShowSelectViewStyle, setIsShowSelectViewStyle] = useState(false);
  const [selectStyle, setSelectStyle] = useState({
    uuid: 1,
    label: 'Classic',
    icon: <MdOutlineViewQuilt size={20} />,
  });
  const styleViews = [
    {
      uuid: 1,
      label: 'Classic',
      icon: <MdOutlineViewQuilt size={20} />,
    },
    {
      uuid: 2,
      label: 'Compact',
      icon: <MdOutlineViewModule size={20} />,
    },
    {
      uuid: 3,
      label: 'Super Compact',
      icon: <MdOutlineViewList size={20} />,
    },
  ];
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (viewStyleTabRef.current && !viewStyleTabRef.current.contains(event.target as Node)) {
        setIsShowSelectViewStyle(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [viewStyleTabRef]);
  return (
    <div
      className="flex-center my-3 h-8 w-max rounded-md p-2 text-sm hover:bg-gray-100"
      role="button"
      tabIndex={0}
      onClick={() => setIsShowSelectViewStyle((prev) => !prev)}
      ref={viewStyleTabRef}
    >
      <div className="relative">
        {selectStyle.icon}
        <div
          className={twMerge(
            'absolute -right-2 top-8 z-50 hidden h-fit w-fit rounded-md bg-white p-1 text-gray-500 shadow-box',
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
                setSelectStyle(item);
                setIsShowSelectViewStyle(false);
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
