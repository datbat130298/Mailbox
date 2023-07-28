import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import { AuthService } from '../../../../app/Services';
import { setTokens } from '../../../../app/Services/Common/AuthService';
import { setUser } from '../../../../app/Slices/userSlice';
import { AxiosErrorDataType } from '../../../../app/Types/commonTypes';
import Alert from '../../Components/Alert/Alert';
import Button from '../../Components/Button';
import Input from '../../Components/Form/Input';
import Logo from '../../Components/Logo/Logo';

const Login = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(
    isEmail(searchParams.get('email') || '') ? searchParams.get('email') : '',
  );
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAllowSubmit, setIsAllowSubmit] = useState(false);
  const [error, setError] = useState<AxiosErrorDataType | null>(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = `Login - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (!email || !password || !isEmail(email)) {
      setIsAllowSubmit(false);
      return;
    }
    setIsAllowSubmit(true);
  }, [email, password]);

  const handleChangeEmail = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setEmail(value);
    if (!isEmail(value)) {
      setEmailError('is valid email');
    } else {
      setEmailError('');
    }
  };

  const handleChangePassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!email || !password) return;
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    AuthService.loginWithEmailPassword(email, password)
      .then((res) => {
        let from = searchParams.get('redirect') || '';
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        const { token } = res.data.data;
        setTokens(token || '');
        AuthService.getMe().then((response) => {
          dispatch(setUser(response.data.data));
          // if (response?.data?.data?.roles?.find((role: any) => role.slug === 'admin')) {
          //   from = searchParams.get('redirect') || '/admin';
          // } else {
          //   from = searchParams.get('redirect') || '/my';
          // }
          from = '/inbox';
          navigate(from, {
            replace: true,
          });
        });
      })
      .catch((err) => {
        const { response } = err;
        if (response) {
          const { status } = response;
          if (status === 401) {
            setError({ message: 'Login success', ...err });
          } else if (status === 422) {
            setError({
              ...err,
              message: 'Account not exist',
            });
          } else {
            setError({ ...err });
          }
        }
        setIsSubmitting(false);
      });
  };
  return (
    <div className="flex sm:pb-10 sm:pt-16">
      <div className="w-full max-w-screen-sm rounded-2xl border-gray-100 bg-white px-2 py-6 xs:px-4 sm:m-auto sm:border-2 sm:px-20 sm:py-12 sm:shadow-md">
        <Logo imageClassName="mx-auto mb-8 hidden h-14 md:block" />

        <div className="mt-4 md:text-center">
          <div className="text-xl font-bold sm:text-3xl">Hi, Welcome Back!</div>
          <div className="mt-1 text-sm font-semibold text-gray-400 sm:mt-3 sm:text-base">
            Login to your SENDGPT account to continue
          </div>
        </div>
        <form action="" className="mt-10 sm:mt-14" onSubmit={handleSubmit}>
          {error && (
            <Alert
              title="Username or password have arror. Please check it again"
              message={error.message}
              type="error"
              className="mb-8"
              onClose={() => setError(null)}
            >
              {error.code === 'not_exists' && (
                <Link
                  to={`/auth/register?email=${encodeURIComponent(email || '')}&redirect=${encodeURIComponent(
                    searchParams.get('redirect') || '',
                  )}`}
                >
                  Create account
                </Link>
              )}
            </Alert>
          )}
          <Input
            type="email"
            label="Email"
            id="auth_email"
            name="auth_email"
            className="w-full"
            value={email || ''}
            onChange={handleChangeEmail}
            disabled={isSubmitting}
            error={emailError}
          />
          <Input
            type="password"
            label="Password"
            id="password"
            name="password"
            className="mt-1 w-full md:mt-4 lg:mt-5"
            value={password}
            onChange={handleChangePassword}
            disabled={isSubmitting}
          />
          <div className="mt-2 flex justify-end sm:mb-0">
            <Link
              to="/auth/forgot-password"
              className="text-center text-sm font-semibold text-gray-400 hover:underline"
            >
              Forgot Password
            </Link>
          </div>
          <div className="box-border w-full">
            <Button
              type="submit"
              className="mt-4 w-full"
              disabled={!isAllowSubmit || isSubmitting}
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </div>
        </form>
        <div className="text-center sm:mt-4">
          <div className="mt-8 text-center sm:mt-12">
            Do not have an account?{' '}
            <Link
              to={`/auth/register?redirect=${encodeURIComponent(searchParams.get('redirect') || '')}`}
              className="block font-semibold underline hover:text-primary-700 sm:inline-block"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
