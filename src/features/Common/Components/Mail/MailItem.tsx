import Checkbox from '../Form/Checkbox';

interface MailItemProps {
  mail: any;
}

const MailItem = ({ mail }: MailItemProps) => {
  return (
    <div className="flex h-12 w-full justify-start border-b-[0.5px] px-2 hover:bg-gray-100">
      <div className="my-2 flex h-8 w-fit rounded-md px-2 hover:bg-gray-100">
        <div className="flex-center h-full w-max">
          <Checkbox />
        </div>
      </div>
      <div className="h-full w-max px-2 leading-[48px]">{mail?.title}</div>
    </div>
  );
};
export default MailItem;
