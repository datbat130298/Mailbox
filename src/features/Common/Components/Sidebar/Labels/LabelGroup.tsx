import _ from 'lodash';
import { useMemo, useState } from 'react';
import { BiLabel } from 'react-icons/bi';
import { MdMoreVert } from 'react-icons/md';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { addSearchTerm } from '../../../../../app/Slices/labelSlice';
import useDispatch from '../../../../Hooks/useDispatch';
import useSelector from '../../../../Hooks/useSelector';
import Tooltip from '../../Tooltip/Tooltip';
import LabelCustomPopup from './LabelCustomPopup';
import LabelItem from './LabelItem';
import { LabelType } from './LabelManagement';

interface GroupLabelProp {
  id: number;
  label: string;
  childrenLabel: LabelType[] | [];
  className?: string;
  onRemove: (id: number) => void;
  onClickEdit: (data: LabelType) => void;
}

const LabelGroup = ({ label, id, childrenLabel, className, onRemove, onClickEdit }: GroupLabelProp) => {
  const [isShowChildren, setIsShowChildren] = useState<boolean>(false);
  const [isShowLabelCustomPopup, setIsShowLabelCustomPopup] = useState<boolean>(false);
  const [colorPicker, setColorPicker] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);

  const isActivated = useMemo(() => {
    if (label === 'Menu' && isShowFullSidebar) return true;
    return false;
  }, [isShowFullSidebar]);

  const handleClickLabelGroup = () => {
    if (!isShowFullSidebar || _.isEmpty(childrenLabel)) return;
    setIsShowChildren((prev) => !prev);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate({
      pathname: '/search',
      search: createSearchParams({
        from: [label],
        to: [label],
        search: label,
        subject: label,
        body: label,
        // attachment: hasAttachmentChecked.toString(),
        type: 'all',
      }).toString(),
    });
    dispatch(addSearchTerm(label));
  };

  const handleClickLabelCustom = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsShowLabelCustomPopup(true);
  };

  return (
    <div className="relative">
      <Tooltip position="right" title={label}>
        <div
          tabIndex={0}
          role="button"
          onClick={(e) => handleClick(e)}
          className={twMerge(
            'group relative mx-3 my-0.5 flex w-[60px] items-center justify-between overflow-hidden rounded-md py-1.5 pl-3.5 text-gray-700 transition-width  duration-300 before:absolute before:left-0 before:top-1/2 before:h-2/3 before:w-1 before:-translate-y-1/2 before:rounded-sm before:bg-primary-800 hover:bg-slate-200',
            isShowFullSidebar && 'w-[92%] sm:w-60',
            isActivated
              ? 'bg-slate-200 font-semibold text-primary-600 before:block'
              : 'text-slate-700 before:hidden',
            className,
          )}
        >
          <div className="flex ">
            <div id={id.toString()} className="ml-0.5 flex items-center gap-4">
              <div
                role="button"
                tabIndex={0}
                onClick={handleClickLabelGroup}
                className={twMerge(
                  'rounded-full p-1.5 pl-[9px]  duration-200',
                  isShowChildren && 'rotate-90',
                  _.isEmpty(childrenLabel) && '',
                  isShowFullSidebar && !_.isEmpty(childrenLabel) && 'group-hover:opacity-90',
                  `bg-[${colorPicker}]`,
                )}
              >
                <BiLabel size={18} />
              </div>
              <p className={twMerge('-ml-1 w-3/4 truncate text-sm', `text-[${colorPicker}]`)}>{label}</p>
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
        </div>
      </Tooltip>
      {isShowChildren &&
        !_.isEmpty(childrenLabel) &&
        childrenLabel.map((chil) => (
          <LabelItem
            key={chil.id}
            value={chil.value}
            id={chil.id}
            onRemove={onRemove}
            onClickEdit={onClickEdit}
          />
        ))}
      {isShowLabelCustomPopup && (
        <LabelCustomPopup
          onClickEdit={onClickEdit}
          onRemove={onRemove}
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
