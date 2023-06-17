import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectOptionType } from '../../../../app/Types/elementTypes';
// import { useTranslation } from 'react-i18next';

import Input from '../Form/Input';
import Modal from '../Modal/Modal';
import { Select } from '../Select';

interface AddLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const AddLabelsModal = ({ isOpen, onClose, title }: AddLabelModalProps) => {
  const [labelName, setLabelName] = useState<string>('');
  const [parent, selectParent] = useState<SelectOptionType | null>();
  const { t } = useTranslation();

  const isAllowSubmit = useMemo(() => {
    if (labelName && parent) {
      return true;
    }
    return false;
  }, [labelName, parent]);

  const handleChangeInputLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelName(e.target.value);
  };

  const array = [
    {
      value: 1,
      label: 'Company',
    },
    {
      value: 2,
      label: 'Entertainment',
    },
  ];

  const handleSelectParant = (value: SelectOptionType | null) => {
    selectParent(value);
  };

  return (
    <Modal
      contentContainerClassName="w-[600px] p-4"
      onClose={onClose}
      isOpen={isOpen}
      title={title}
      className="p-4"
      isAllowSubmit={isAllowSubmit}
    >
      <div className="m-4 flex flex-col gap-6">
        <Input
          className="w-full"
          value={labelName}
          onChange={handleChangeInputLabel}
          label="Please enter name label"
        />
        <Select
          options={array}
          value={parent}
          onChange={handleSelectParant}
          className="m-0 p-0"
          placeholder={t('Please select a parent')}
        />
      </div>
    </Modal>
  );
};

export default AddLabelsModal;
