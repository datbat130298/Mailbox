import { IoClose } from 'react-icons/io5';

export interface EmailItem {
  avatar: string;
  email: string;
  id: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ComposePopupSelectItem = ({ email }: any) => {
  return (
    <div className="flex h-max items-center gap-1 rounded-full border border-green-200 text-slate-600 hover:text-black">
      <div className="m-px h-6 w-6 overflow-hidden rounded-full">
        <img src={email.avatar} alt="d" className="h-full w-full object-cover object-center" />
      </div>
      <span className="mx-1 pb-0.5 text-sm font-medium">{email.email}</span>
      <div className="mr-1.5 " role="button" tabIndex={0}>
        <IoClose size={20} />
      </div>
    </div>
  );
};

export default ComposePopupSelectItem;
