import { useEffect, useRef, useState } from 'react';
import { AttachmentType } from '../../../../../app/Types/commonTypes';

export interface FilePreviewAudioProps {
  attachment: AttachmentType | null;
}

const FilePreviewAudioReader = ({ attachment }: FilePreviewAudioProps) => {
  const [fileAudio, setFileAudio] = useState<string>();
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (attachment) {
      setFileAudio(attachment.url);
      if (audioRef.current) {
        audioRef.current.src = attachment.url;
      }
    }
  }, [attachment]);
  return (
    <div className="-mt-20 flex h-screen w-full items-center justify-center">
      <div className="flex h-14 w-160 justify-start rounded-4xl p-1">
        <audio ref={audioRef} autoPlay controls className="h-full w-full rounded-4xl bg-[#F1F3F4] ">
          <source src={fileAudio} type="audio" />
          <track kind="captions" />
        </audio>
      </div>
    </div>
  );
};

export default FilePreviewAudioReader;
