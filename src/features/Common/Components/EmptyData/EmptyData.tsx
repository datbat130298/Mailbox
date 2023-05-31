interface EmptyDataProps {
  message: string;
  desription?: string;
}

const EmptyData = ({ message, desription }: EmptyDataProps) => {
  return (
    <div className="flex-center mt-10 h-fit w-full text-center text-gray-500">
      <div>
        <div className="h-fit w-full text-sm">{message}</div>
        <div className="h-fit w-full text-sm">{desription}</div>
      </div>
    </div>
  );
};
export default EmptyData;
