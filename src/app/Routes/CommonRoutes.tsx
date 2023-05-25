import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthPage from '../../features/Common/Auth/AuthPage';
import LoginSuccess from '../../features/Common/Auth/Login/LoginSuccess';
import ContainerWorkSpace from '../../features/Common/WorkSpace/ContainerWorkSpace';
import useDispatch from '../../features/Hooks/useDispatch';
import { getLoginStatus, getMe } from '../Services/Common/AuthService';
import { setUser } from '../Slices/userSlice';

const CommonRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getLoginStatus()
      .then(() => {
        return getMe();
      })
      .then((res) => {
        return dispatch(setUser(res.data.data));
      })
      .catch(() => {
        return navigate('/auth/login', {
          replace: true,
        });
      });
  }, []);
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
