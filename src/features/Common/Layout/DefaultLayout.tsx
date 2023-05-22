import Header from './Header';

interface DefaultLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Header />
      <div className="z-0 mt-[-96px] h-screen w-full">{children}</div>
    </>
  );
};

export default DefaultLayout;
