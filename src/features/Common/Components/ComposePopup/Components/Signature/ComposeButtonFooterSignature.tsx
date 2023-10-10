import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuPencilLine } from 'react-icons/lu';
import { setSelectSignature, SignatureType } from '../../../../../../app/Slices/signatureSlice';
import useDispatch from '../../../../../Hooks/useDispatch';
import useSelector from '../../../../../Hooks/useSelector';
import ComposePopupToolbarItem from '../ComposePopupToolbarItem';
import DropdownSignature from './DropdownSignature';

interface ComposeButtonFooterSignatureProp {
  onInsertSignature: (value: string) => void;
  data: SignatureType[];
}

const ComposeButtonFooterSignature = ({ onInsertSignature, data }: ComposeButtonFooterSignatureProp) => {
  const [isShowDropdownSignature, setIsShowDropdownSignature] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const signatureRef = useRef<HTMLDivElement>(null);
  const selectSignature: SignatureType | [] = useSelector((state) => state.signature.signatureSelect);

  const handleClickShowSignatureDropdown = () => {
    setIsShowDropdownSignature((prev) => !prev);
  };

  const handleClickSignature = (signature: SignatureType) => {
    dispatch(setSelectSignature(signature));
    onInsertSignature(signature.value);
  };

  const handleClose = () => {
    setIsShowDropdownSignature(false);
  };

  return (
    <div className="relative">
      <ComposePopupToolbarItem
        title={t('insert_emotion')}
        icon={<LuPencilLine size={19} />}
        onClick={handleClickShowSignatureDropdown}
      />
      {isShowDropdownSignature && (
        <DropdownSignature
          onClose={handleClose}
          data={data}
          onSelect={handleClickSignature}
          selected={selectSignature.id}
          ref={signatureRef}
        />
      )}
    </div>
  );
};

export default ComposeButtonFooterSignature;
