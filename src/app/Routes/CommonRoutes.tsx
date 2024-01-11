import { useLayoutEffect } from 'react';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import AuthPage from '../../features/Common/Auth/AuthPage';
import LoginSuccess from '../../features/Common/Auth/Login/LoginSuccess';
import ContainerWorkSpace from '../../features/Common/WorkSpace/ContainerWorkSpace';
import useDispatch from '../../features/Hooks/useDispatch';
import useSelector from '../../features/Hooks/useSelector';
import { USER_ROLE } from '../Const/USER';
import { getMe } from '../Services/Common/AuthService';
import { setUser } from '../Slices/userSlice';

const CommonRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();

  useLayoutEffect(() => {
    if (user.sid) return;
    getMe()
      .then((res) => {
        let from = '';
        if (res?.data?.data?.roles?.find((role) => role === USER_ROLE.SYSTEM)) {
          from = searchParams.get('redirect') || `/${USER_ROLE.SYSTEM.replaceAll('_', '-')}`;
        } else if (res?.data?.data?.roles?.find((role) => role === USER_ROLE.ADMIN)) {
          from = searchParams.get('redirect') || `/${USER_ROLE.ADMIN.replaceAll('_', '-')}`;
        } else {
          from = searchParams.get('redirect') || `/${USER_ROLE.USER.replaceAll('_', '-')}`;
        }

        navigate(from, {
          replace: true,
        });

        return dispatch(setUser(res.data.data));
      })
      .catch(() => {
        return navigate('/auth/login', {
          replace: true,
        });
      });
  }, [user]);

  return (
    <Routes>
      <Route path="/*">
        <Route path="*" element={<ContainerWorkSpace />} />
        <Route path="auth/*">
          <Route path="login" element={<AuthPage />} />
          <Route path="login-success" element={<LoginSuccess />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default CommonRoutes;
