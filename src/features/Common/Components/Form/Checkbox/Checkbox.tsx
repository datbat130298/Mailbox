import { InputHTMLAttributes } from 'react';
import { BsCheck } from 'react-icons/bs';
import { HiMinusSm } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
}

const Checkbox = ({
  className,
  checked,
  indeterminate = false,
  disabled,
  type = 'checkbox',
  ...otherProps
}: CheckboxProps) => {
  const iconTouchedClassName = twMerge(
    !indeterminate && !checked && 'text-white group-hover:text-slate-500',
    !indeterminate && checked && 'text-white group-hover:text-white',
    indeterminate && 'text-slate-500 group-hover:text-slate-500',
    disabled && checked && 'text-white group-hover:text-white',
    disabled && !checked && 'text-gray-100 group-hover:text-gray-100',
  );

  const iconClassName = twMerge(
    'absolute top-1/2 left-1/2 z-0 mt-px -translate-x-1/2 -translate-y-1/2 group-hover:text-slate-500',
    iconTouchedClassName,
  );

  return (
    <div
      className={twMerge(
        'z-0 h-[18px] w-[18px]',
        className,
        'group relative inline-block rounded-[4px] bg-inherit',
      )}
    >
      <div
        className={twMerge(
          'absolute inset-0 -z-10 cursor-pointer rounded-md border border-gray-400 group-hover:border-gray-500',
          checked && !indeterminate && !disabled && 'border-slate-500 bg-slate-500',
          indeterminate && !disabled && 'border-slate-500',
          disabled && 'cursor-not-allowed bg-gray-100 group-hover:border-gray-100',
        )}
      />
      {indeterminate ? (
        <HiMinusSm size={18} className={iconClassName} />
      ) : (
        <BsCheck className={iconClassName} size={18} />
      )}
      <input
        type={type}
        name="nameClass"
        className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
        checked={!!checked}
        disabled={disabled}
        {...otherProps}
      />
    </div>
  );
};

export default Checkbox;
