import _ from 'lodash';
import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ComposePopupInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  placeholder: string;
  label?: string;
  labelPostfix?: JSX.Element;
  error?: string;
  inlineError?: boolean;
  isShowLabelWhenFocusing?: boolean;
  inputClassName?: string;
}

const ComposePopupInput = (
  {
    label,
    placeholder,
    className,
    value,
    disabled,
    children,
    error,
    style,
    labelPostfix,
    inputClassName,
    onFocus,
    onBlur,
    ...props
  }: ComposePopupInputProps,
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
    <div className="mx-1 my-1 flex items-center gap-2 border-b-[1px] border-gray-200 py-2 pb-3">
      {label && <span className="text-sm">{label}</span>}
      <input
        placeholder={placeholder}
        className={twMerge('w-full border-none bg-inherit text-sm outline-none transition-none')}
        value={value || ''}
        disabled={disabled}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={ref}
        {...props}
      />
    </div>
  );
};

export default forwardRef(ComposePopupInput);
