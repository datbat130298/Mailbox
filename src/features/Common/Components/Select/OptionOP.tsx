import { twMerge } from 'tailwind-merge';

export interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  value: string;
}

const Option = ({ children, className, ...props }: OptionProps) => {
  return (
    <div
      className={twMerge('w-max whitespace-nowrap px-4 py-1.5 duration-100 hover:bg-gray-100', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Option;
