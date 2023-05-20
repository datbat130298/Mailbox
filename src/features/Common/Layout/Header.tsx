import logo from '../../../assets/image/logo.png';

const Header = () => {
  return (
    <div className="sticky h-24 top-0 z-50 w-full bg-gray-100 flex justify-between">
      <div className="w-max h-full justify-center flex flex-shrink-0 items-center">
        <div className="flex mx-8 xl:w-[190px] xl:h-10 lg:w-[190px] lg:h-10 md:w-[190px] md:h-10 sm:w-[190px] sm:h-10 xs:w-40 xs:h-8 justify-start flex-shrink-0 h-10">
          <img className="w-full h-full" src={logo} alt="Workflow" />
        </div>
      </div>
    </div>
  );
};

export default Header;
