export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  isShowHeader?: boolean;
  isShowFooter?: boolean;
  isAllowSubmit?: boolean;
  isLoading?: boolean;
  contentContainerClassName?: string;
  title?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export interface ConfigDataType {
  uuid?: number;
  key?: string;
  value: string;
  default_value?: string;
}

export interface ConfigFormErrorType {
  key?: string;
  value: string;
  default_value?: string;
}

export interface ConfigModifyModalProps extends Omit<ModalProps, 'onSubmit'> {
  config?: ConfigDataType;
  errors?: ConfigFormErrorType;
  onEdit: (data: ConfigDataType) => void;
}

export interface TrashDataType {
  id: number;
  source: string;
}
