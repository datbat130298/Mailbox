import logo from '../../../assets/image/logo.png';

const Header = () => {
  return (
    <div className="sticky top-0 z-50 flex h-24 w-full justify-between bg-gray-100">
      <div className="flex h-full w-max flex-shrink-0 items-center justify-center">
        <div className="mx-8 flex h-10 flex-shrink-0 justify-start xs:h-8 xs:w-40 sm:h-10 sm:w-[190px] md:h-10 md:w-[190px] lg:h-10 lg:w-[190px] xl:h-10 xl:w-[190px]">
          <img className="h-full w-full" src={logo} alt="Workflow" />
        </div>
      </div>
    </div>
  );
};

export default Header;
