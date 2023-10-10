import { useTranslation } from 'react-i18next';
import { MdOutlineEdit } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { DraftActionEnum, useDraftsDispatch } from '../../../../app/Context/DraftContext';
import { ComposeViewTypeEnum } from '../../../../app/Enums/commonEnums';
import useSelector from '../../../Hooks/useSelector';
import ButtonRipple from '../Button/ButtonRipple/ButtonRiple';
import ListOfMiniatureDrafts from '../ListOfMiniatureDrafts/ListOfMiniatureDrafts';

interface ComposeButtonProp {
  isShowSidebar: boolean;
}

const ComposeButton = ({ isShowSidebar }: ComposeButtonProp) => {
  const { t } = useTranslation();
  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);

  const dispatch = useDraftsDispatch();

  const handleClickCompose = () => {
    dispatch({ type: DraftActionEnum.ADD_COMPOSE, viewType: ComposeViewTypeEnum.POPUP, body: ' ' });
    if (!localStorage.getItem('defaultFullScreen')) {
      localStorage.setItem('defaultFullScreen', 'false');
    }
  };

  return (
    <>
      <ButtonRipple
        className={twMerge(
          'group mb-2 ml-3 hidden h-14 w-0 justify-center overflow-hidden border-0 bg-slate-300 text-gray-700 shadow-none ring-0 hover:bg-slate-200 hover:text-primary-700 hover:drop-shadow-md active:bg-slate-300 active:drop-shadow-none lg:flex lg:w-10',
          (isShowFullSidebar || isShowSidebar) && 'w-0 lg:w-40',
        )}
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
      </ButtonRipple>
      <ListOfMiniatureDrafts />
    </>
  );
};
export default ComposeButton;
