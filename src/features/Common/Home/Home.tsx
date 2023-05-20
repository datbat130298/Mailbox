import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    window.document.title = `Home - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return <div className="flex h-screen w-full items-center justify-center">Home</div>;
};

export default Home;
