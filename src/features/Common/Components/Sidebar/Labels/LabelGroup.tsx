import _ from 'lodash';
import { useMemo, useState } from 'react';
import { BiLabel } from 'react-icons/bi';
import { MdMoreVert } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { addSearchTerm } from '../../../../../app/Slices/labelSlice';
import useDispatch from '../../../../Hooks/useDispatch';
import useSelector from '../../../../Hooks/useSelector';
import Tooltip from '../../Tooltip/Tooltip';
import LabelCustomPopup from './LabelCustomPopup';
import LabelItem, { LabelItemProps } from './LabelItem';

interface GroupLabelProp {
  id: number;
  label: string;
  childrenLabel: LabelItemProps[] | [];
  className?: string;
  to: string;
}

const LabelGroup = ({ label, id, childrenLabel, className, to }: GroupLabelProp) => {
  const [isShowChildren, setIsShowChildren] = useState<boolean>(false);
  const [isShowLabelCustomPopup, setIsShowLabelCustomPopup] = useState<boolean>(false);
  const [colorPicker, setColorPicker] = useState<string>('');

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);

  const isActivated = useMemo(() => {
    if (label === 'Menu' && isShowFullSidebar) return true;
    if (pathname === to) return true;
    return false;
  }, [pathname, to, isShowFullSidebar]);

  const handleClickLabelGroup = () => {
    if (!isShowFullSidebar || _.isEmpty(childrenLabel)) return;
    setIsShowChildren((prev) => !prev);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addSearchTerm({ key: 'label', value: label }));
  };

  const handleClickLabelCustom = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsShowLabelCustomPopup(true);
  };

  return (
    <div className="relative">
      <Tooltip position="right" title={label}>
        <Link
          onClick={(e) => handleClick(e)}
          to={to || pathname}
          className={twMerge(
            'group relative mx-3 my-0.5 flex w-[60px] items-center justify-between overflow-hidden rounded-md py-1.5 pl-3.5 text-gray-700 transition-width  duration-300 before:absolute before:left-0 before:top-1/2 before:h-2/3 before:w-1 before:-translate-y-1/2 before:rounded-sm before:bg-primary-800 hover:bg-slate-200',
            isShowFullSidebar && 'w-60',
            isActivated
              ? 'bg-slate-200 font-semibold text-primary-600 before:block'
              : 'text-slate-700 before:hidden',
            className,
          )}
        >
          <div className="flex ">
            <div id={id.toString()} className="flex items-center gap-4">
              <div
                role="button"
                tabIndex={0}
                onClick={handleClickLabelGroup}
                className={twMerge(
                  'rounded-full p-1.5 duration-200',
                  isShowChildren && 'rotate-90',
                  _.isEmpty(childrenLabel) && '',
                  isShowFullSidebar && !_.isEmpty(childrenLabel) && 'group-hover:opacity-90',
                  `bg-[${colorPicker}]`,
                )}
              >
                <BiLabel size={18} />
              </div>
              <p className={twMerge('w-3/4 truncate text-sm', `text-[${colorPicker}]`)}>{label}</p>
            </div>
          </div>
          <div
            className="mr-5 rounded-full p-1 hover:bg-slate-300"
            onClick={(e) => handleClickLabelCustom(e)}
            tabIndex={0}
            role="button"
          >
            <MdMoreVert size={20} />
          </div>
        </Link>
      </Tooltip>
      {isShowChildren &&
        !_.isEmpty(childrenLabel) &&
        childrenLabel.map((chil) => <LabelItem key={chil.id} label={chil.label} id={chil.id} to={chil.to} />)}
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

export default LabelGroup;
