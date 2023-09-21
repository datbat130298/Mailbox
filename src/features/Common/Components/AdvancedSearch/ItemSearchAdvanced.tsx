import { Dispatch, SetStateAction } from 'react';
import Input from '../Form/Input';

interface ItemSearchAdvancedProps {
  label: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const ItemSearchAdvanced = ({ label, value, onChange }: ItemSearchAdvancedProps) => {
  return (
    <div className="mb-0.5 grid h-fit w-full grid-cols-5">
      <div className="col-span-1 h-10 overflow-hidden text-left text-sm font-[400] leading-[48px] text-gray-600">
        {label}
      </div>
      <div className="col-span-4 h-10">
        <Input
          value={value}
          size="sm"
          onChange={(e) => onChange(e.target.value)}
          className="h-full w-full rounded-none border border-x-0 border-t-0 bg-transparent px-0 pb-1"
        />
      </div>
    </div>
  );
};

export default ItemSearchAdvanced;
