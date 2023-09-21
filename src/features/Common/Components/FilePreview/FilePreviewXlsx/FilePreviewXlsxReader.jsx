import { useMemo, useState } from 'react';
import { AiOutlineFileProtect } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import './FilePreviewXlsx.scss';
import FilePreviewXlsxSheet from './FilePreViewXlsxSheet';

const FilePreviewXlsxReader = ({ attachment }) => {
  const [isShowAlert, setIsShowAlert] = useState(false);

  const options = useMemo(
    () => ({
      mode: 'edit',
      showToolbar: true,
      showContextmenu: true,
      showBottomBar: true,
      view: {
        height: () => document.documentElement.clientHeight - 106,
      },
    }),
    [],
  );

  return (
    <div className="-mt-4 h-full w-full overflow-hidden bg-[#F5F6F7]">
      {!isShowAlert && (
        <div className={twMerge('flex justify-start bg-white py-2 pl-5', isShowAlert && 'hidden')}>
          <div className="flex text-lg font-semibold">
            <AiOutlineFileProtect color="#FF9900" size="24" />
            <p className="px-1">PROTECTED VIEW</p>
          </div>
          <p className="pl-5 text-base underline">Protected view be careful files from the internet excel.</p>
          <button
            type="button"
            className="mx-5 border-2 border-solid px-3"
            onClick={() => {
              setIsShowAlert(true);
            }}
          >
            Enable Editing
          </button>
        </div>
      )}
      <FilePreviewXlsxSheet file={attachment} options={isShowAlert && options} />
    </div>
  );
};

export default FilePreviewXlsxReader;
