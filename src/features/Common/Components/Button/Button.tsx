import { twMerge } from 'tailwind-merge';

export type ButtonSizeType = 'xs' | 'sm' | 'normal';
export type ButtonColorType = 'primary' | 'light' | 'blue' | 'orange' | 'gray';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizeType;
  color?: ButtonColorType;
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button = ({
  isLoading,
  children,
  className,
  disabled,
  color = 'primary',
  size = 'normal',
  ...anotherProps
}: ButtonProps) => {
  let colorClassNames = '';
  let sizeClassNames = '';
  let spinnerColorClassNames = '';

  switch (color) {
    case 'light':
      colorClassNames +=
        'bg-white hover:bg-gray-200 disabled:bg-gray-100 text-black disabled:text-gray-400 ring-gray-200 disabled:ring-gray-200';
      spinnerColorClassNames += 'border-gray-400';
      break;
    case 'blue':
      colorClassNames += 'bg-sky-700  hover:bg-sky-800  text-white  ring-gray-200 disabled:ring-gray-200';
      spinnerColorClassNames += 'border-gray-400';
      break;
    case 'orange':
      colorClassNames +=
        'bg-orange-600  hover:bg-orange-700  text-white ring-gray-200 disabled:ring-gray-200';
      spinnerColorClassNames += 'border-gray-400';
      break;
    case 'gray':
      colorClassNames += 'bg-gray-700  hover:bg-gray-800  text-white ring-gray-200 disabled:ring-gray-200';
      spinnerColorClassNames += 'border-gray-400';
      break;
    default:
      colorClassNames += `bg-primary-700 hover:bg-primary-800 text-white ring-primary-700 disabled:ring-gray-300 disabled:bg-gray-300`;
      spinnerColorClassNames += disabled ? 'border-white' : 'border-gray-400';
  }

  switch (size) {
    case 'xs':
      sizeClassNames += 'px-2 py-1';
      break;

    case 'sm':
      sizeClassNames += 'px-4 py-2';
      break;

    default:
      sizeClassNames += 'px-8 py-3';
  }

  return (
    <button
      type="button"
      className={twMerge(
        sizeClassNames,
        'duration-100s rounded-xl font-semibold shadow-md outline-none ring-2 transition-colors',
        colorClassNames,
        'flex items-center justify-center',
        className,
      )}
      disabled={disabled}
      {...anotherProps}
    >
      {isLoading && (
        <div
          className={twMerge(
            'h-4 w-4 border-2',
            spinnerColorClassNames,
            'mr-3 animate-spin rounded-full border-t-transparent',
          )}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
