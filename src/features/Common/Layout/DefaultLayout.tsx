import Header from './Header';

interface DefaultLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <Header />
      <div className="z-0 h-screen w-full pt-20">{children}</div>
    </div>
  );
};

export default DefaultLayout;
