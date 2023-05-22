import { useEffect } from 'react';
import useSelector from '../../../Hooks/useSelector';

const LoginSuccess = () => {
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    window.document.title = `Login success - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="flex h-screen w-full flex-shrink-0 items-center justify-center">
      <div>
        <div>Login Successfully</div>
        <div className="text-2xl font-semibold">Hello, Wellcome {user?.email}</div>
      </div>
    </div>
  );
};
export default LoginSuccess;
