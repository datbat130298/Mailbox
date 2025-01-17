import _ from 'lodash';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiHelpCircle, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { USER_ROLE } from '../../../../app/Const/USER';
import { logOut } from '../../../../app/Services/Common/AuthService';
import { clearUser } from '../../../../app/Slices/userSlice';
import useDispatch from '../../../Hooks/useDispatch';
import useSelector from '../../../Hooks/useSelector';

interface UserDropdownProps {
  onClick: () => void;
}

const UserDropdown = ({ onClick }: UserDropdownProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClickLogout = () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    logOut()
      .then(() => {
        dispatch(clearUser());
        onClick();
        navigate('/auth/login', {
          replace: true,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const getURLforRole = useMemo(() => {
    if (user.roles.find((role) => role === USER_ROLE.ADMIN)) {
      return '/admin';
    }
    return '/my';
  }, [user]);

  return (
    <div
      className={twMerge(
        'absolute right-0 top-14 w-48 rounded-lg border-2 border-gray-100 bg-white p-4 text-slate-700 shadow-sm transition duration-100 ease-linear',
      )}
    >
      <div className="group flex w-full cursor-pointer" role="button" tabIndex={0} onClick={onClick}>
        <div className="h-full w-full border-b-2 border-gray-100 pb-4 text-sm">
          <Link to={getURLforRole} className="font-semibold group-hover:text-primary-700">
            {_.capitalize(user.first_name)} {_.capitalize(user.last_name)}
          </Link>
          <Link
            to={getURLforRole}
            className="mt-1 line-clamp-1 break-all text-sm group-hover:text-primary-700"
          >
            {user.email}
          </Link>
        </div>
      </div>
      <div
        className="mt-3 flex w-full items-center hover:text-primary-700"
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <FiUser />
        <p className="ml-3 text-sm">
          <Link
            to={`${
              (user.roles?.find((role) => role === USER_ROLE.ADMIN) && '/admin/profile') ||
              (user.roles?.find((role) => role === USER_ROLE.USER) && '/my/profile')
            }`}
          >
            {t('profile')}
          </Link>
        </p>
      </div>

      <div
        className="mt-1.5 flex w-full items-center hover:text-primary-700"
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <FiSettings />
        <p className="ml-3 text-sm">
          <Link
            to={`${
              (user.roles?.find((role) => role === USER_ROLE.ADMIN) && 'admin') ||
              (user.roles?.find((role) => role === USER_ROLE.USER) && 'my')
            }`}
          >
            {t('setting')}
          </Link>
        </p>
      </div>

      <div
        className="mt-2 flex w-full items-center hover:text-primary-700"
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <FiHelpCircle />
        <Link
          to={`${
            (user.roles?.find((role) => role === 'admin') && 'admin/help') ||
            (user.roles?.find((role) => role === 'user') && 'my/help') ||
            (user.roles?.find((role) => role === 'editor') && 'editor/help')
          }`}
        >
          <p className="ml-3 text-sm">{t('help_and_contact')}</p>
        </Link>
      </div>
      <div
        className="mt-3 flex w-full items-center border-t-2 border-gray-100 pt-3 hover:text-primary-700"
        role="button"
        tabIndex={0}
        onClick={handleClickLogout}
      >
        {isSubmitting ? (
          <div className="h-4 w-4 animate-spin rounded-full border border-slate-700 border-t-transparent" />
        ) : (
          <FiLogOut />
        )}
        <div className="ml-3 text-sm">{t('logout')}</div>
      </div>
    </div>
  );
};
export default UserDropdown;
