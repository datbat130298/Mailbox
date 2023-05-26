import { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoOptionsSharp } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import logoText from '../../../assets/image/logo_text.png';
import useSelector from '../../Hooks/useSelector';
import Button from '../Components/Button';
import Input from '../Components/Form/Input';
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
    <div className="fixed right-0 top-0 z-50 flex h-20 w-[calc(100vw-72px)] justify-between bg-slate-100 pl-4 pr-2">
      <div className="flex h-full w-max">
        <div className="flex h-full w-52 flex-shrink-0 items-center justify-start">
          <img className="h-[28px] w-[120px]" src={logoText} alt="Workflow" />
        </div>
        <div className="my-3.5 flex  h-12 w-[720px] justify-start rounded-4xl bg-slate-200 p-1.5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-300">
            <HiOutlineSearch size={18} />
          </div>
          <Input
            size="sm"
            placeholder="Search in mailbox"
            className="mx-1 h-full w-[628px] border-none bg-transparent px-[-4px]"
            inputClassName="placeholder-slate-400"
            isShowPlacehoder
          />
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-300">
            <IoOptionsSharp size={20} />
          </div>
        </div>
      </div>
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
          <div className=" flex h-full w-fit flex-shrink-0 items-center justify-center">
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
        )}
      </div>
    </div>
  );
};

export default Header;
