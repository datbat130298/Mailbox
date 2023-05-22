import { twMerge } from 'tailwind-merge';
import logo from '../../../../assets/image/logo.png';

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  imageClassName?: string;
}

const Logo = ({ className, imageClassName }: LogoProps) => {
  return (
    <div className={className}>
      {!logo && <div className={twMerge('h-10 w-40 animate-pulse rounded-lg bg-gray-100', imageClassName)} />}
      {logo && <img src={logo} alt="CStorage Logo" className={imageClassName} />}
    </div>
  );
};

export default Logo;
