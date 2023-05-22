import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthPage from '../../features/Common/Auth/AuthPage';
import LoginSuccess from '../../features/Common/Auth/Login/LoginSuccess';
import Home from '../../features/Common/Home/Home';
import useDispatch from '../../features/Hooks/useDispatch';
import useSelector from '../../features/Hooks/useSelector';
import { setUser } from '../../features/User/userSlice';
import { getLoginStatus, getMe } from '../Services/Common/AuthService';

const CommonRoutes = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.uuid === 0) {
      getLoginStatus()
        .then(async () => {
          return getMe()
            .then((res) => {
              return dispatch(setUser(res.data.data));
            })
            .catch(() => {
              return navigate('/auth/login', {
                replace: true,
              });
            });
        })
        .catch(() => {
          return Promise.reject();
        });
    }
  }, [user]);
  return (
    <Routes>
      <Route path="/*">
        <Route path="*" element={<Home />} />
        <Route path="auth/*">
          <Route path="login" element={<AuthPage />} />
          <Route path="login-success" element={<LoginSuccess />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default CommonRoutes;
