import { useTranslation } from 'react-i18next';
import { MdOutlineEdit } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { DraftActionEnum, useDraftsDispatch } from '../../../../app/Context/DraftContext';
import { ComposeViewTypeEnum } from '../../../../app/Enums/commonEnums';
import useSelector from '../../../Hooks/useSelector';
import Button from '../Button';
import ListOfMiniatureDrafts from '../ListOfMiniatureDrafts/ListOfMiniatureDrafts';

interface ComposeButtonProp {
  isShowSidebar: boolean;
}

const ComposeButton = ({ isShowSidebar }: ComposeButtonProp) => {
  const { t } = useTranslation();
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);

  const dispatch = useDraftsDispatch();

  const handleClickCompose = () => {
    dispatch({ type: DraftActionEnum.ADD_COMPOSE, viewType: ComposeViewTypeEnum.POPUP });
    if (!localStorage.getItem('defaultFullScreen')) {
      localStorage.setItem('defaultFullScreen', 'false');
    }
  };

  return (
    <div className="">
      <Button
        className={twMerge(
          'group mb-2 ml-3 h-14 w-10 overflow-hidden border-0 bg-slate-300 text-gray-700 shadow-none ring-1 hover:bg-slate-200 hover:text-primary-700 hover:drop-shadow-md',
          (isShowFullSidebar || isShowSidebar) && 'w-40',
        )}
        color="light"
        onClick={handleClickCompose}
        style={{ transition: '.3s' }}
      >
        <div
          className={twMerge(
            '-ml-7 flex h-full w-full items-center justify-start',
            (isShowFullSidebar || isShowSidebar) && '',
          )}
        >
          <div>
            <MdOutlineEdit size={26} className="" />
          </div>
          <div
            className={twMerge(
              'flex h-full items-center justify-center px-2 opacity-0',
              (isShowFullSidebar || isShowSidebar) && 'opacity-100',
            )}
          >
            {t('compose')}
          </div>
        </div>
      </Button>
      <ListOfMiniatureDrafts />
    </div>
  );
};
export default ComposeButton;
