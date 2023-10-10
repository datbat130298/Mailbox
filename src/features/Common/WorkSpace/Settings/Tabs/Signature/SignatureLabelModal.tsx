import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Input from '../../../../Components/Form/Input';
import Modal from '../../../../Components/Modal/Modal';

interface SignatureLabelModalProp {
  isOpen: boolean;
  onClose: () => void;
  signature?: string;
  onSubmit: (val: string) => void;
}

const SignatureLabelModal = ({ isOpen, onClose, signature, onSubmit }: SignatureLabelModalProp) => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (isOpen && signature) {
      setValue(signature);
      return;
    }
    setValue('');
  }, [signature, isOpen]);

  const handleSubmit = useCallback(() => {
    onSubmit(value);
  }, [value]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add signature"
      contentContainerClassName="w-[600px]"
      onConfirm={handleSubmit}
    >
      <div className="px-8">
        <Input
          className="w-full"
          onChange={handleChange}
          value={value}
          placeholder="Signature name"
          label="Signature name"
        />
      </div>
    </Modal>
  );
};

export default SignatureLabelModal;
