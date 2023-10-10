import { ForwardedRef, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCheck2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { SignatureType } from '../../../../../../app/Slices/signatureSlice';

interface DropdownSignatureProp {
  data: SignatureType[];
  onSelect: (signature: SignatureType) => void;
  selected: string;
  onClose: () => void;
}

const DropdownSignature = (
  { data, selected, onSelect, onClose }: DropdownSignatureProp,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { t } = useTranslation();

  const noSignature: SignatureType = {
    id: '1',
    value: '',
    label: 'No Signature',
  };

  return (
    <div
      className="absolute bottom-full w-max  rounded-md border border-gray-300 text-sm shadow-md"
      ref={ref}
    >
      <Link to="settings/3">
        <div className="my-1 px-11 py-1 hover:bg-gray-100" role="button" tabIndex={0} onClick={onClose}>
          {t('manage_signatures')}
        </div>
      </Link>
      <div className="border-t border-gray-300 py-1">
        <div
          className="line-clamp-1 flex w-full items-center py-1 pl-2 pr-4 hover:bg-gray-100"
          role="button"
          tabIndex={0}
          onClick={() => onSelect(noSignature)}
        >
          <BsCheck2
            size={20}
            className={twMerge('mx-2 opacity-100', selected !== noSignature.id && 'opacity-0')}
          />
          {noSignature.label}
        </div>
        {data.map((item) => (
          <div
            className="line-clamp-1 flex w-full items-center py-1 pl-2 pr-4 hover:bg-gray-100"
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(item)}
          >
            <BsCheck2
              size={20}
              className={twMerge('mx-2 opacity-100', selected !== item.id && 'opacity-0')}
            />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default forwardRef(DropdownSignature);
