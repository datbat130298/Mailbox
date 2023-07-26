import { DefaultTFuncReturn } from 'i18next';

interface EmptyDataProps {
  message: DefaultTFuncReturn;
  description?: DefaultTFuncReturn;
}

const EmptyData = ({ message, description }: EmptyDataProps) => {
  return (
    <div className="flex-center mt-10 h-fit w-full text-center text-gray-700">
      <div>
        <div className="h-fit w-full text-sm">{message}</div>
        <div className="h-fit w-full text-sm">{description}</div>
      </div>
    </div>
  );
};
export default EmptyData;
