import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addSignature, editSignature, SignatureType } from '../../../../../../app/Slices/signatureSlice';
import useDispatch from '../../../../../Hooks/useDispatch';
import Button from '../../../../Components/Button';
import SignatureLabelItem from './SignatureLabelItem';
import SignatureLabelModal from './SignatureLabelModal';

interface SignatureLabelProp {
  data: SignatureType[];
  selected: SignatureType | null;
  onSelect: (sig: SignatureType) => void;
}

const SignatureLabel = ({ data, selected, onSelect }: SignatureLabelProp) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const handleClose = () => {
    setIsShowAddModal(false);
    setIsShowEditModal(false);
  };

  const handleClickAdd = () => {
    setIsShowAddModal(true);
  };

  const handleClickEdit = (sig: SignatureType) => {
    setIsShowEditModal(true);
    onSelect(sig);
  };

  const handleSubmitAddSignature = (value: string) => {
    dispatch(
      addSignature({
        id: nanoid(),
        value: '',
        label: value,
      }),
    );
    handleClose();
  };

  const handleSubmitEdit = (value: string) => {
    dispatch(
      editSignature({
        id: selected?.id || nanoid(),
        value: selected?.value || '',
        label: value,
      }),
    );
    handleClose();
  };

  const dataSignatureCustom = data.filter((item) => item.id !== '1');

  return (
    <>
      <div className="h-full w-full ">
        {dataSignatureCustom.map((item) => (
          <SignatureLabelItem
            key={item.id}
            signature={item}
            onClick={onSelect}
            selected={selected}
            onClickEdit={handleClickEdit}
          />
        ))}
        <div className="w-full px-4 pt-3">
          <Button className="h-9 w-full text-gray-800" color="light" onClick={handleClickAdd}>
            {t('add_signature')}
          </Button>
        </div>
      </div>
      <SignatureLabelModal
        isOpen={isShowAddModal}
        onClose={handleClose}
        onSubmit={handleSubmitAddSignature}
      />
      <SignatureLabelModal
        isOpen={isShowEditModal}
        onClose={handleClose}
        signature={selected?.label}
        onSubmit={handleSubmitEdit}
      />
    </>
  );
};

export default SignatureLabel;
