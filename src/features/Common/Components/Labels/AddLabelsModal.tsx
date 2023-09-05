import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectOptionType } from '../../../../app/Types/elementTypes';
// import { useTranslation } from 'react-i18next';
import Input from '../Form/Input';
import Modal from '../Modal/Modal';
import { Select } from '../Select';
import { LabelType } from '../Sidebar/Labels/LabelManagement';

export interface ErrorType {
  title: string;
  parent?: string;
}
interface AddLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  isLoading: boolean;
  errorResponse: ErrorType | undefined;
  selectedLabel: LabelType | undefined;
}

const AddLabelsModal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  isLoading,
  errorResponse,
  selectedLabel,
}: AddLabelModalProps) => {
  const [labelName, setLabelName] = useState<string>('');
  const [parent, setSelectParent] = useState<SelectOptionType | null>();
  const { t } = useTranslation();

  const isAllowSubmit = useMemo(() => {
    if (labelName) {
      return true;
    }
    return false;
  }, [labelName]);

  const handleChangeInputLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelName(e.target.value);
  };

  useEffect(() => {
    if (selectedLabel && isOpen) {
      setLabelName(selectedLabel.title);
    }
  }, [selectedLabel, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setLabelName('');
      setSelectParent(null);
    }
  }, [isOpen]);

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
    setSelectParent(value);
  };

  const handleSubmit = () => {
    onSubmit({ title: labelName, parent: parent?.value || parent });
  };

  return (
    <Modal
      contentContainerClassName="sm:w-[600px] p-4 w-full"
      onClose={onClose}
      isOpen={isOpen}
      title={title}
      className="p-4"
      isAllowSubmit={isAllowSubmit}
      onConfirm={handleSubmit}
      isLoading={isLoading}
    >
      <div className="m-1 flex flex-col gap-6 sm:m-4">
        <Input
          className="w-full"
          value={labelName}
          onChange={handleChangeInputLabel}
          label="Please enter name label"
          error={errorResponse?.title || ''}
        />
        <Select
          options={array}
          value={parent}
          onChange={handleSelectParant}
          className="m-0 p-0"
          placeholder={t('Please select a parent')}
          error={errorResponse?.parent || ''}
        />
      </div>
    </Modal>
  );
};

export default AddLabelsModal;
