import { ChangeEvent } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Checkbox from '../../../../Form/Checkbox';

interface MailItemIconProp {
  onChangeSelectRow: (idRows: number, checked: boolean) => void;
  id: number;
  selected: boolean;
  onClickStar: () => void;
  isStar: boolean;
}

const MailItemIcon = ({ onChangeSelectRow, isStar, id, selected, onClickStar }: MailItemIconProp) => {
  const handleOnChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeSelectRow(id, e.target.checked);
  };
  return (
    <div className="hidden h-full w-full items-center gap-[13px] md:flex">
      <Checkbox checked={selected} onChange={handleOnChangeCheck} />
      <div className="mb-0.5" role="button" tabIndex={0} onClick={onClickStar}>
        {!isStar ? (
          <FaRegStar size={17} className="text-gray-700 opacity-30 group-hover:opacity-90" />
        ) : (
          <FaStar size={17} className="text-amber-400 opacity-90 group-hover:shadow-md" />
        )}
      </div>
    </div>
  );
};

export default MailItemIcon;
