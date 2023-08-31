import { twMerge } from 'tailwind-merge';
import './LoadingHeader.scss';

interface LoadingHeaderProp {
  isShow: boolean;
}

const LoadingHeader = ({ isShow }: LoadingHeaderProp) => {
  return (
    <div
      className={twMerge(
        'absolute left-1/2 top-2 z-50 hidden rounded-md border-2 border-red-200 bg-white px-8 py-2 shadow-md',
        isShow && 'block',
      )}
    >
      <ul className="flex items-center justify-center">
        <li>L</li>
        <li>o</li>
        <li>a</li>
        <li>d</li>
        <li>i</li>
        <li>n</li>
        <li>g</li>
        <li>.</li>
        <li>.</li>
        <li>.</li>
      </ul>
    </div>
  );
};

export default LoadingHeader;
