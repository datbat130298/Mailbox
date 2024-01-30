import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  addFolder,
  editFolder,
  getAllFolder,
  removeFolderById,
} from '../../../../../app/Services/Folder/FolderService';
import useNotify from '../../../../Hooks/useNotify';
import AddLabelsModal from '../../Labels/AddLabelsModal';
import ButtonAddLabel from '../../Labels/ButtonAddLabel';
import LoadingHeader from '../../Loading/LoadingHeader';
import LabelGroup from './LabelGroup';

export interface LabelType {
  id: number;
  value: string;
  title: string;
  children: Array<LabelType> | [];
}

interface LabelManagementProp {
  isShowSidebar: boolean;
}

const LabelManagement = ({ isShowSidebar }: LabelManagementProp) => {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [errorRes, setErrorRes] = useState();
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [selectedAction, setSelectedAction] = useState<LabelType>();

  const { t } = useTranslation();
  const toast = useNotify();

  const fetchDataFolder = useCallback(() => {
    getAllFolder()
      .then((res) => setFolders(res))
      .catch((err) => setErrorRes(err));
  }, []);

  const handleClickAdd = () => {
    setIsShowModal(true);
  };

  useEffect(() => {
    fetchDataFolder();
  }, []);

  const labelOption = useMemo(() => {
    return folders.map((item: LabelType) => ({
      id: item?.id,
      value: item?.title,
      label: item?.title,
      children: item?.children,
    }));
  }, [folders]);

  const handleClose = () => {
    setSelectedAction(undefined);
    setIsShowModal(false);
    setIsShowEdit(false);
    setIsLoading(false);
    setErrorRes(undefined);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitAdd = (data: any) => {
    setIsLoading(true);
    addFolder(data)
      .then(() => {
        handleClose();
        fetchDataFolder();
        toast.success(t('action_complete'));
      })
      .catch((err) => {
        setErrorRes(err);
        toast.error(t('action_error'));
      })
      .finally(() => setIsLoading(false));
  };

  const handleRemoveLabel = (id: number) => {
    setIsLoading(true);
    removeFolderById(id)
      .then(() => {
        fetchDataFolder();
        toast.success(t('action_complete'));
      })
      .catch(() => toast.error(t('action_error')))
      .finally(() => setIsLoading(false));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitEdit = (data: any) => {
    setIsLoading(true);
    editFolder(selectedAction?.id || 0, data)
      .then(() => {
        setIsShowEdit(false);
        toast.success(t('action_complete'));
        fetchDataFolder();
      })
      .catch((err) => {
        setErrorRes(err);
        toast.error(t('action_error'));
      })
      .finally(() => setIsLoading(false));
  };

  const handleClickEdit = (label: LabelType) => {
    setSelectedAction(label);
    setIsShowEdit(true);
  };

  return (
    <div className="relative w-full border-t pt-1">
      <ButtonAddLabel isShowSidebar={isShowSidebar} onClickAdd={handleClickAdd} />
      {labelOption?.map((item) => (
        <LabelGroup
          id={item.id}
          key={item.id}
          label={item.label}
          childrenLabel={item.children}
          onRemove={handleRemoveLabel}
          onClickEdit={handleClickEdit}
        />
      ))}

      <AddLabelsModal
        selectedLabel={selectedAction}
        isLoading={isLoading}
        isOpen={isShowModal || isShowEdit}
        onClose={handleClose}
        title={isShowModal ? t('new_label') : t('edit_label')}
        onSubmit={isShowModal ? handleSubmitAdd : handleSubmitEdit}
        errorResponse={errorRes}
      />

      <LoadingHeader isShow={isLoading} />
    </div>
  );
};

export default LabelManagement;
