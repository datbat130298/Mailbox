import _ from 'lodash';
import { forwardRef, useMemo, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { twMerge } from 'tailwind-merge';
import MultiValueLabel from './MultiValueLabel';
import MultiValueRemove from './MultiValueRemove';

export interface OptionLabel {
  value: string;
  label: string;
  avatar: string;
}

interface ComposePopupSelectRecipientProps {
  options: Array<OptionLabel>;
  defaultValue: readonly OptionLabel[];
  onChange: (selectedOptions: MultiValue<OptionLabel>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: string;
  className?: string;
}

const ComposePopupSelectRecipient = ({
  options,
  defaultValue,
  onChange,
  label,
  className,
}: ComposePopupSelectRecipientProps) => {
  const [inputValue, setInputValue] = useState('');

  const optionsList = useMemo(() => {
    return options.find((item) => item.label.includes(inputValue));
  }, [options, inputValue]);

  const isOpenMenuOption = useMemo(() => {
    if (inputValue && !_.isEmpty(optionsList)) {
      return true;
    }
    return false;
  }, [inputValue, optionsList]);

  const customStyles = useMemo(() => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      control: (base: any) => ({
        ...base,
        width: '100%',
        border: 'none',
        outline: 'none',
        boxShadow: 'none ',
        cursor: 'text',
        marginLeft: -2,
        backgroundColor: 'bg-transparent',
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      multiValue: (base: any) => ({
        ...base,
        border: '1px solid rgb(156 163 175)',
        borderRadius: '9999px',
        backgroundColor: 'white',
        padding: '0px',
        margin: '4px 4px',
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      multiValueRemove: (base: any) => ({
        ...base,
        marginRight: '3px',
        padding: '0px',
        borderRadius: '9999px',
        backgroundColor: 'white',
        color: 'rgb(51 65 85)',
        '&:hover': {
          backgroundColor: 'white',
          color: 'black',
        },
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      multiValueLabel: (base: any) => ({
        ...base,
        padding: '1px',
        paddingLeft: '1px',
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dropdownIndicator: (base: any) => ({
        ...base,
        display: 'none',
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      indicatorSeparator: (base: any) => ({
        ...base,
        display: 'none',
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      indicatorsContainer: (base: any) => ({
        ...base,
        display: 'none',
      }),
    };
  }, []);

  const formatCustomerOptionLabel = ({ label: labelOption, avatar }: OptionLabel) => (
    <div className="flex items-center gap-3">
      <div className="m-px h-8 w-8 overflow-hidden rounded-full">
        <img src={avatar} alt="d" className="h-full w-full object-cover object-center" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-slate-700">{labelOption}</span>
        <span className="text-xs text-slate-500">{labelOption}</span>
      </div>
    </div>
  );

  return (
    <div className={twMerge('-mx-1 flex w-full items-center py-0.5 text-sm', className)}>
      <div className="h-full items-start text-slate-600 hover:underline" role="button" tabIndex={0}>
        {label}
      </div>
      <Select
        autoFocus
        closeMenuOnSelect={false}
        inputValue={inputValue}
        onInputChange={(newValue) => setInputValue(newValue)}
        value={defaultValue}
        components={{ MultiValueLabel, MultiValueRemove }}
        isMulti
        menuIsOpen={isOpenMenuOption}
        openMenuOnFocus={false}
        options={options}
        styles={customStyles}
        placeholder=""
        className={twMerge('custom-select w-full bg-transparent')}
        formatOptionLabel={formatCustomerOptionLabel}
        onChange={onChange}
      />
    </div>
  );
};

export default forwardRef(ComposePopupSelectRecipient);
