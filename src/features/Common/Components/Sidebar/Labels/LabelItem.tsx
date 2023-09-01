import { useMemo, useState } from 'react';
import { MdMoreVert, MdOutlineLabel } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { addSearchTerm } from '../../../../../app/Slices/labelSlice';
import useDispatch from '../../../../Hooks/useDispatch';
import useSelector from '../../../../Hooks/useSelector';
import Tooltip from '../../Tooltip/Tooltip';
import LabelCustomPopup from './LabelCustomPopup';
import { LabelType } from './LabelManagement';

export interface LabelItemProps {
  id: number;
  value: string;
  onRemove: (id: number) => void;
  onClickEdit: (data: LabelType) => void;
}

const LabelItem = ({ id, value, onRemove, onClickEdit }: LabelItemProps) => {
  const [isShowLabelCustomPopup, setIsShowLabelCustomPopup] = useState<boolean>(false);
  const [colorPicker, setColorPicker] = useState<string>('');

  const { pathname } = useLocation();
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);

  const dispatch = useDispatch();
  const isActivated = useMemo(() => {
    if (value === 'Menu' && isShowFullSidebar) return true;
    return false;
  }, [pathname, value, isShowFullSidebar]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addSearchTerm({ key: 'label', value }));
  };

  const handleShowLabelCustom = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShowLabelCustomPopup(true);
  };

  return (
    <div className="relative">
      <Tooltip title={value} position="right">
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => handleClick(e)}
          className={twMerge(
            'group relative mx-3 my-0.5 flex w-[60px] items-center justify-between overflow-hidden rounded-md py-1.5 pl-3.5 text-gray-700 transition-width duration-300 before:absolute before:left-0 before:top-1/2 before:h-2/3 before:w-1 before:-translate-y-1/2 before:rounded-sm before:bg-primary-800 hover:bg-slate-200',
            isShowFullSidebar && 'w-[92%] sm:w-60',
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
              {value}
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
        </div>
      </Tooltip>
      {isShowLabelCustomPopup && (
        <LabelCustomPopup
          onClickEdit={onClickEdit}
          onRemove={onRemove}
          setIsShow={setIsShowLabelCustomPopup}
          label={value}
          id={id}
          setColorPicker={setColorPicker}
        />
      )}
    </div>
  );
};

export default LabelItem;
