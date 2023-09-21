import { twMerge } from 'tailwind-merge';
import './LoadingHeader.scss';

interface LoadingHeaderProp {
  isShow: boolean;
}

const LoadingHeader = ({ isShow }: LoadingHeaderProp) => {
  return (
    // <div
    //   className={twMerge(
    //     'fixed left-1/2 top-2 z-50 rounded-md border-2 border-slate-500 bg-white px-8 py-2 shadow-md',
    //     !isShow && 'hidden',
    //   )}
    // >
    //   <ul className="flex items-center justify-center">
    //     <li>L</li>
    //     <li>o</li>
    //     <li>a</li>
    //     <li>d</li>
    //     <li>i</li>
    //     <li>n</li>
    //     <li>g</li>
    //     <li>.</li>
    //     <li>.</li>
    //     <li>.</li>
    //   </ul>
    // </div>
    <div
      className={twMerge(
        'fixed -bottom-1 -right-4 z-[9999] rounded-t-lg bg-black pb-1 pl-8 pr-48 pt-0.5 text-sm text-white',
        !isShow && 'hidden',
      )}
    >
      Waiting for Mailbox...
    </div>
  );
};

export default LoadingHeader;
