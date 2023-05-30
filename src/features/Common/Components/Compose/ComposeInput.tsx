import _ from 'lodash';
import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type InputSizeType = 'xs' | 'sm' | 'normal';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSizeType;
  label?: string;
  labelPostfix?: JSX.Element;
  error?: string;
  inlineError?: boolean;
  isShowLabelWhenFocusing?: boolean;
  inputClassName?: string;
}

const ComposeInput = (
  {
    label,
    id,
    className,
    value,
    disabled,
    children,
    error,
    style,
    size = 'normal',
    inlineError = false,
    isShowLabelWhenFocusing = false,
    labelPostfix,
    inputClassName,
    onFocus,
    onBlur,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const [, setIsFocusing] = useState(false);

  const handleFocus = () => {
    setIsFocusing(true);
    if (_.isFunction(onFocus)) onFocus();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocusing(false);
    if (_.isFunction(onBlur)) onBlur(e);
  };

  useEffect(() => {
    if (disabled) {
      setIsFocusing(false);
    }
  }, [disabled]);

  return (
    <div className="mx-2 my-1 flex items-center gap-2 border-b-[1px] border-gray-200 py-2 pb-3" id={id}>
      {/* <span className="text-sm font-medium text-gray-500">{ label}</span> */}
      <input
        placeholder={label}
        className={twMerge('w-full border-none bg-inherit text-sm outline-none transition-none')}
        value={value || ''}
        disabled={disabled}
        {...props}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={ref}
      />
    </div>
  );
};

export default forwardRef(ComposeInput);
