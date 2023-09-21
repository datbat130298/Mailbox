import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgMenu } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { getLanguagesPage, setLanguagesPage } from '../../../app/Services/Language/LanguageService';
import { setIsShowFullSidebar } from '../../../app/Slices/layoutSlice';
import logoText from '../../../assets/image/logo_text.png';
import useSelector from '../../Hooks/useSelector';
import { triggerClickOutside } from '../../utils/helpers';
import AdvancedSearch from '../Components/AdvancedSearch/AdvancedSearch';
import Button from '../Components/Button';
import ChooseLanguage from '../Components/ChooseLanguage/ChooseLanguage';
import LoadingHeader from '../Components/Loading/LoadingHeader';
// eslint-disable-next-line import/no-named-as-default
import SidebarResponsive from '../Components/Sidebar/SidebarResponsive/SidebarResponsive';
import UserDropdown from '../Components/UserDropdown/UserDropdown';

const Header = () => {
  const [language, setLanguage] = useState('en');
  const [isUserTabVisible, setUserTabVisible] = useState(false);
  const [isShowSidebarMobile, setIsShowSidebarMobile] = useState(false);
  const [isShowLoading, setIsShowLoading] = useState(false);

  const userTabRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();

  const handleToggleUserDropdown = useCallback(() => {
    setUserTabVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    setLanguage(getLanguagesPage());
  }, []);

  const handChangeLanguage = (e: string) => {
    setLanguage(e);
    setLanguagesPage({ lang: e }).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    triggerClickOutside(userTabRef, () => setUserTabVisible(false));
  }, [userTabRef]);

  const dispatch = useDispatch();

  const isShowFullSidebar = useSelector((state) => state.layout.isShowFullSidebar);

  const handleShowFullSidebar = useCallback(() => {
    if (user?.uuid === 0) {
      return undefined;
    }
    if (isShowFullSidebar) {
      return dispatch(setIsShowFullSidebar(false));
    }
    return dispatch(setIsShowFullSidebar(true));
  }, [user, isShowFullSidebar]);
  const handleShowSidebarMobile = useCallback(() => {
    if (user?.uuid === 0) {
      return undefined;
    }
    return setIsShowSidebarMobile((prev) => !prev);
  }, [user]);

  return (
    <>
      <div className="fixed right-0 top-0 z-50 flex h-16 w-full justify-between bg-slate-100 pl-0 pr-2 lg:h-20 lg:pl-6 lg:pr-4">
        <div className="flex h-full w-max items-center">
          <div
            role="button"
            tabIndex={0}
            onClick={window.innerWidth >= 1024 ? handleShowFullSidebar : handleShowSidebarMobile}
            className={twMerge(
              'mr-1 flex h-10 w-10 items-center rounded-full active:bg-slate-50 active:drop-shadow-sm lg:mr-2',
              isShowFullSidebar && 'bg-slate-200',
            )}
          >
            <CgMenu size={20} className="mx-auto " />
          </div>
          {/* </Tooltip> */}
          <div className="flex h-full w-fit flex-shrink-0 items-center justify-start pl-0 lg:w-[185px] lg:pl-4">
            <img className="h-6 max-w-[120px] lg:h-[28px] lg:w-[120px]" src={logoText} alt="Workflow" />
          </div>
          {user?.uuid !== 0 && <AdvancedSearch setIsShowLoading={setIsShowLoading} />}
        </div>
        <div className="flex h-full w-fit flex-shrink-0 items-center justify-center">
          {user?.uuid === 0 ? (
            <div className="hidden lg:block">
              <NavLink to="/auth/login">
                <Button type="button" className="rounded-lg px-6 py-3 text-center text-sm font-semibold">
                  {t('login')}
                </Button>
              </NavLink>
            </div>
          ) : (
            <>
              <div className="mr-1 hidden border-r-2 border-gray-200 pr-4 lg:block">
                <ChooseLanguage language={language} onChangeLanguage={handChangeLanguage} />
              </div>
              {/* {user?.uuid && (
                <>
                  <HeaderNotification />
                  <div className="h-5 w-0.5 bg-gray-200 lg:mx-1" />
                </>
              )} */}
              <div className="lg:m-l4 ml-3 flex h-full w-fit flex-shrink-0 items-center justify-center">
                <div
                  className="relative h-9 w-9 cursor-pointer rounded-full lg:h-11 lg:w-11"
                  ref={userTabRef}
                >
                  <div
                    role="button"
                    className="h-full w-full rounded-full"
                    tabIndex={0}
                    onClick={handleToggleUserDropdown}
                  >
                    <div className={twMerge('h-full w-full overflow-hidden rounded-full shadow-md')}>
                      <img className="h-full w-full rounded-full" src={user?.avatar_img_absolute} alt="" />
                    </div>
                  </div>
                  {isUserTabVisible && <UserDropdown onClick={() => setUserTabVisible(false)} />}
                </div>
              </div>
            </>
          )}
        </div>
        <LoadingHeader isShow={isShowLoading} />
      </div>
      <SidebarResponsive isOpen={isShowSidebarMobile} onClose={handleShowSidebarMobile} />
    </>
  );
};

export default Header;
