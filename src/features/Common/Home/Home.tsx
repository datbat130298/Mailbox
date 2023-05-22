import { useEffect } from 'react';
import Login from '../Auth/Login/Login';

const Home = () => {
  useEffect(() => {
    window.document.title = `Home - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-fit w-[800px]">
        <Login />
      </div>
    </div>
  );
};

export default Home;
