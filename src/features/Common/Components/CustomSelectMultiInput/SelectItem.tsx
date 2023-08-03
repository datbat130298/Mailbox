import { IoClose } from 'react-icons/io5';

interface SelectedItemProp {
  avatar?: string;
  email: string;
  onRemove: (id: string) => void;
  id: string;
}

const SelectedItem = ({ avatar, id, email, onRemove }: SelectedItemProp) => {
  return (
    <div className="flex w-fit items-center justify-between gap-2 rounded-full border-[0.5px] border-gray-400 text-slate-700">
      {avatar ? (
        <div className="m-px h-6 w-6 overflow-hidden rounded-full bg-cyan-200">
          <img src={avatar} alt="d" className="h-full w-full object-cover object-center" />
        </div>
      ) : (
        <div className="m-px flex h-6 w-6 items-center justify-center rounded-full bg-primary-200">
          <p className="mb-px text-sm font-semibold uppercase">{email.slice(0, 1)}</p>
        </div>
      )}

      <p className="text-center text-sm font-medium">{email}</p>
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full"
        role="button"
        tabIndex={0}
        onClick={() => onRemove(id)}
      >
        <IoClose size={18} />
      </div>
    </div>
  );
};

export default SelectedItem;
