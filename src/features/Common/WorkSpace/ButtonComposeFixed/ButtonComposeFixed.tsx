import { MdOutlineEdit } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

interface ButtonComposeFixedProp {
  onClick: () => void;
}

const ButtonComposeFixed = ({ onClick }: ButtonComposeFixedProp) => {
  return (
    <div
      className={twMerge(
        'absolute bottom-8 right-6 z-[49] flex h-14 w-14 items-center justify-center rounded-full border-[0.5px] bg-slate-300 text-gray-700 shadow-lg hover:bg-slate-200 hover:text-primary-700 hover:drop-shadow-md lg:hidden',
      )}
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      <MdOutlineEdit size={24} />
    </div>
  );
};

export default ButtonComposeFixed;
