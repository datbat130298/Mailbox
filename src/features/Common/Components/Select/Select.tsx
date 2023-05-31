import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactSelect, { ActionMeta, GroupBase, OnChangeValue, Props, StylesConfig } from 'react-select';
import { twMerge } from 'tailwind-merge';

export interface CustomSelectAsyncProps {
  error?: string;
  classNameError?: string;
}

const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  error,
  placeholder,
  classNameError,
  isDisabled,
  onInputChange: onSearchInputChange,
  onChange: onChangeSelect,
  ...props
}: Props<Option, IsMulti, Group> & CustomSelectAsyncProps) => {
  const [isFocusing, setIsFocusing] = useState(false);
  const borderColor = twMerge(isFocusing ? 'border-blue-500 z-20' : 'border-gray-100');

  const selectRef = useRef<HTMLDivElement>(null);

  const customStyles: StylesConfig<Option, IsMulti, Group> = {
    control: (base) => ({
      ...base,
      backgroundColor: isDisabled ? 'border-gray-100' : 'bg-white',
      border: 'none',
      outline: 'none',
      boxShadow: 'none ',
      transform: 'translateX(-8px)',
    }),
    multiValue: (provided) => ({
      ...provided,
      background: '#f3f4f6',
      borderRadius: '8px',
      padding: 0,
      margin: 2,
    }),
  };

  const handleChangeInputValue = _.debounce((value: string, actionMeta) => {
    onSearchInputChange?.(value, actionMeta);
  }, 800);

  const handleChangeOnFocus = useCallback(() => {
    if (!isDisabled) setIsFocusing(true);
  }, [isDisabled]);

  const handleChangeOnBlur = useCallback(() => {
    if (!isDisabled) setIsFocusing(false);
  }, [isDisabled]);

  const handleChange = (newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => {
    onChangeSelect?.(newValue, actionMeta);
    if (actionMeta.action === 'select-option' && !props.isMulti) setIsFocusing(false);
  };

  useEffect(() => {
    if (!selectRef.current) {
      return undefined;
    }

    const selectElement = selectRef.current;

    const handleClickOutside = (event: MouseEvent) => {
      if (selectElement.contains(event.target as Node)) {
        return;
      }
      handleChangeOnBlur();
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [handleChangeOnBlur]);

  return (
    <div>
      <div
        ref={selectRef}
        className={twMerge(
          borderColor,
          'relative min-h-13 w-full rounded-lg border-2 px-3.5 pb-0.5 pt-1',
          isDisabled && 'bg-gray-100',
          error && 'border-red-500',
        )}
      >
        <div
          className={twMerge(
            'absolute left-2 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between bg-white px-2 text-gray-700 transition-all duration-100',
            isFocusing && '-top-0.5 text-sm font-semibold text-blue-500',
            props.value && '-top-0.5 text-sm font-semibold text-blue-500',
            error && 'text-red-500',
            isDisabled && 'bg-transparent',
          )}
          role="button"
          tabIndex={-1}
          onFocus={handleChangeOnFocus}
          onBlur={handleChangeOnFocus}
        >
          {placeholder}
        </div>
        <ReactSelect
          placeholder=""
          menuIsOpen={isFocusing}
          styles={customStyles}
          onMenuOpen={handleChangeOnFocus}
          onInputChange={handleChangeInputValue}
          isDisabled={isDisabled}
          onBlur={handleChangeOnBlur}
          onChange={handleChange}
          {...props}
        />
      </div>
      {error && <div className={twMerge('-mb-1.5 mt-1.5 text-sm text-red-500', classNameError)}>{error}</div>}
    </div>
  );
};
export default Select;
