import { LuTrash2 } from 'react-icons/lu';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { SignatureType } from '../../../../../../app/Slices/signatureSlice';

interface SignatureLabelItemProp {
  signature: SignatureType;
  selected: SignatureType | null;
  onClick: (sig: SignatureType) => void;
  onClickEdit: (sig: SignatureType) => void;
}

const SignatureLabelItem = ({ signature, onClick, selected, onClickEdit }: SignatureLabelItemProp) => {
  const handleClick = () => {
    onClick(signature);
  };
  const handleClickEdit = () => {
    onClickEdit(signature);
  };
  return (
    <div
      className={twMerge(
        'group flex w-full items-center justify-between px-4 py-1.5 text-gray-700 hover:bg-gray-50',
        selected && selected.id === signature.id && 'bg-gray-100',
      )}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <p className="text-base">{signature.label}</p>
      <div className="flex items-center">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full opacity-0 hover:bg-gray-200 hover:text-black group-hover:opacity-100"
          tabIndex={0}
          role="button"
          onClick={handleClickEdit}
        >
          <MdOutlineModeEditOutline size={20} />
        </div>
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full opacity-0 hover:bg-gray-200 hover:text-black group-hover:opacity-100"
          tabIndex={0}
          role="button"
        >
          <LuTrash2 size={18} />
        </div>
      </div>
    </div>
  );
};

export default SignatureLabelItem;
