import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import logo from '../../../assets/image/logo.png';
import useSelector from '../../Hooks/useSelector';
import Button from '../Components/Button';
import UserDropdown from '../Components/UserDropdown/UserDropdown';

const Header = () => {
  const userTabRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state) => state.user);
  const [isUserTabVisible, setUserTabVisible] = useState(false);
  const handleToggleUserDropdown = useCallback(() => {
    setUserTabVisible((prev) => !prev);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userTabRef.current && !userTabRef.current.contains(event.target as Node)) {
        setUserTabVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [userTabRef]);
  return (
    <div className="sticky top-0 z-50 flex h-24 w-full justify-between border-b px-8">
      <NavLink to="/*">
        <div className="flex h-full w-max flex-shrink-0 items-center justify-center">
          <div className=" flex h-10 flex-shrink-0 justify-start xs:h-8 xs:w-40 sm:h-10 sm:w-[190px] md:h-10 md:w-[190px] lg:h-10 lg:w-[190px] xl:h-10 xl:w-[190px]">
            <img className="h-full w-full" src={logo} alt="Workflow" />
          </div>
        </div>
      </NavLink>
      <div className="flex h-full w-fit flex-shrink-0 items-center justify-center">
        {user?.uuid === 0 ? (
          <div className="hidden lg:block">
            <NavLink to="/auth/login">
              <Button type="button" className="rounded-lg px-6 py-3 text-center text-sm font-semibold">
                Login
              </Button>
            </NavLink>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Header;
