/* eslint-disable jsx-a11y/label-has-associated-control */
import { AiOutlineSearch } from 'react-icons/ai';
import { FiStar } from 'react-icons/fi';

interface LabelPopupProp {
  handleMoveSelect: () => void;
}

const LabelPopup = ({ handleMoveSelect }: LabelPopupProp) => {
  return (
    <div
      className="absolute -left-[90%] -top-56 z-[60] w-52 rounded-lg border border-gray-300 bg-white text-sm text-gray-600 shadow-compose"
      onMouseMove={() => handleMoveSelect()}
    >
      <p className="w-full px-2 pt-3 text-left font-normal">Label:</p>
      <div className="mx-2 flex h-7 justify-between border-b-2 border-blue-800 py-1">
        <input className="w-3/4 outline-none" />
        <div className="pr-2">
          <AiOutlineSearch size={18} className="" />
        </div>
      </div>
      <form className="mb-1 mt-4 gap-2 text-start">
        <div className="flex items-center p-2 pl-2 hover:bg-gray-200">
          <input type="checkbox" name="social" className="mx-2 " />
          <label htmlFor="social">Social</label>
        </div>

        <div className="flex items-center p-2 pl-2 hover:bg-gray-200">
          <input type="checkbox" name="updates" className="mx-2 " />
          <label htmlFor="updates">Updates</label>
        </div>
        <div className="flex items-center p-2 pl-2 hover:bg-gray-200">
          <input type="checkbox" name="forums" className="mx-2 " />
          <label htmlFor="forums">Forums</label>
        </div>
        <div className="flex items-center p-2 pl-2 hover:bg-gray-200">
          <input type="checkbox" name="promotion" className="mx-2 " />
          <label htmlFor="promotion">Promotions</label>
        </div>
      </form>

      <div className=" border-y border-gray-300">
        <div className="my-1 flex items-center justify-start  gap-2 p-2 pl-4 hover:bg-gray-200">
          <FiStar />
          <p>Add star</p>
        </div>
      </div>
      <div className="mt-1 w-full p-2 pl-9 text-start hover:bg-gray-200">Create new</div>
      <div className="mb-1 w-full p-2 pl-9 text-start hover:bg-gray-200">Manage Label</div>
    </div>
  );
};

export default LabelPopup;
