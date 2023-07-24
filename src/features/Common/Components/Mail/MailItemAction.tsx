import { BsTrash } from 'react-icons/bs';
import { IoArchiveOutline, IoMailOpenOutline } from 'react-icons/io5';

const MailItemAction = () => {
  // const { t } = useTranslation();
  return (
    <div className="absolute right-0 top-0 z-10  hidden h-full w-40 justify-center bg-gray-200 text-gray-700 group-hover:block">
      <div className="flex h-full w-full justify-center gap-x-1 pr-2">
        {/* <Tooltip title={t('archive')} position="bottom"> */}
        <div className="flex-center h-full w-fit">
          <div className="flex-center h-9 w-9 rounded-full hover:bg-gray-300 hover:text-primary-700">
            <IoArchiveOutline size={16} />
          </div>
        </div>
        {/* </Tooltip> */}
        {/* <Tooltip title={t('trash')} position="bottom"> */}
        <div className="flex-center h-full w-fit">
          <div className="flex-center h-9 w-9 rounded-full hover:bg-gray-300  hover:text-primary-700">
            <BsTrash size={15} />
          </div>
        </div>
        {/* </Tooltip> */}
        {/* <Tooltip title={t('mask_as_read')} position="bottom"> */}
        <div className="flex-center h-full w-fit">
          <div className="flex-center h-9 w-9 rounded-full hover:bg-gray-300  hover:text-primary-700">
            <IoMailOpenOutline size={16} />
          </div>
        </div>
        {/* </Tooltip> */}
      </div>
    </div>
  );
};
export default MailItemAction;
