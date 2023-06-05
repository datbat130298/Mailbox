import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { getLanguagesPage, setLanguagesPage } from '../../../app/Services/Language/LanguageService';
import logoText from '../../../assets/image/logo_text.png';
import useSelector from '../../Hooks/useSelector';
import { triggerClickOutside } from '../../utils/helpers';
import AdvancedSearch from '../Components/AdvancedSearch/AdvancedSearch';
import Button from '../Components/Button';
import ChooseLanguage from '../Components/ChooseLanguage/ChooseLanguage';
import UserDropdown from '../Components/UserDropdown/UserDropdown';

const Header = () => {
  const userTabRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state) => state.user);
  const [language, setLanguage] = useState('en');
  const [isUserTabVisible, setUserTabVisible] = useState(false);
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
  return (
    <div className="fixed right-0 top-0 z-50 flex h-20 w-[calc(100vw-72px)] justify-between bg-slate-100 pl-4 pr-2">
      <div className="flex h-full w-max">
        <div className="flex h-full w-52 flex-shrink-0 items-center justify-start">
          <img className="h-[28px] w-[120px]" src={logoText} alt="Workflow" />
        </div>
        <AdvancedSearch />
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
            <ChooseLanguage language={language} onChangeLanguage={handChangeLanguage} />
            <div className="ml-4 flex h-full w-fit flex-shrink-0 items-center justify-center">
              <div className="relative h-11 w-11 cursor-pointer rounded-full" ref={userTabRef}>
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
    </div>
  );
};

export default Header;
