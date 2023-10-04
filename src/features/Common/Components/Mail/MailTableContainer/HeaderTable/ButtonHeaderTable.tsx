import { ReactNode } from 'react';

interface ButtonHeaderTableProp {
  icon?: ReactNode;
  title: string;
  onClick: () => void;
  responsive?: boolean;
}

const ButtonHeaderTable = ({ icon, title, onClick, responsive }: ButtonHeaderTableProp) => {
  return (
    <div
      className="my-auto flex h-8 w-max items-center gap-2 rounded-md bg-[#F5F6F8] px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-[#ececee]"
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      {icon}
      {!responsive ? (
        <p className="line-clamp-1 hidden md:block">{title}</p>
      ) : (
        <p className="line-clamp-1 ">{title}</p>
      )}
    </div>
  );
};

export default ButtonHeaderTable;
