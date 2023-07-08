import { useMemo, useState } from 'react';
import { MdMoreVert, MdOutlineLabel } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { addSearchTerm } from '../../../../../app/Slices/labelSlice';
import useDispatch from '../../../../Hooks/useDispatch';
import useSelector from '../../../../Hooks/useSelector';
import Tooltip from '../../Tooltip/Tooltip';
import LabelCustomPopup from './LabelCustomPopup';

export interface LabelItemProps {
  id: number;
  label: string;
  to: string;
}

const LabelItem = ({ id, label, to }: LabelItemProps) => {
  const [isShowLabelCustomPopup, setIsShowLabelCustomPopup] = useState<boolean>(false);
  const [colorPicker, setColorPicker] = useState<string>('');

  const { pathname } = useLocation();
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);

  const dispatch = useDispatch();
  const isActivated = useMemo(() => {
    if (label === 'Menu' && isShowFullSidebar) return true;
    if (pathname === to) return true;
    return false;
  }, [pathname, label, isShowFullSidebar]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addSearchTerm({ key: 'label', value: label }));
  };

  const handleShowLabelCustom = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShowLabelCustomPopup(true);
  };

  return (
    <div className="relative">
      <Tooltip title={label} position="right">
        <Link
          onClick={(e) => handleClick(e)}
          to={to || pathname}
          className={twMerge(
            'group relative mx-3 my-0.5 flex w-[60px] items-center justify-between overflow-hidden rounded-md py-1.5 pl-3.5 text-gray-700 transition-width duration-300 before:absolute before:left-0 before:top-1/2 before:h-2/3 before:w-1 before:-translate-y-1/2 before:rounded-sm before:bg-primary-800 hover:bg-slate-200',
            isShowFullSidebar && 'w-64',
            isActivated
              ? 'bg-slate-200 font-semibold text-primary-600 before:block'
              : 'text-slate-700 before:hidden',
          )}
        >
          <div
            id={id.toString()}
            className={twMerge('flex items-center gap-2', isShowFullSidebar && ' pl-3')}
          >
            <div className={twMerge('rounded-full p-1.5 duration-200', `bg-[${colorPicker}]`)}>
              <MdOutlineLabel size={18} />
            </div>
            <p
              className={twMerge(
                'w-3/4 truncate text-sm opacity-0',
                isShowFullSidebar && 'opacity-1',
                `!text-[${colorPicker}]`,
              )}
            >
              {label}
            </p>
          </div>

          <div
            className={twMerge('mr-5 rounded-full p-1 hover:bg-slate-300')}
            role="button"
            tabIndex={0}
            onClick={(e) => handleShowLabelCustom(e)}
          >
            <MdMoreVert size={20} />
          </div>
        </Link>
      </Tooltip>
      {isShowLabelCustomPopup && (
        <LabelCustomPopup
          setIsShow={setIsShowLabelCustomPopup}
          label={label}
          id={id}
          setColorPicker={setColorPicker}
        />
      )}
    </div>
  );
};

export default LabelItem;
