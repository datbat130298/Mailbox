import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdTagFaces } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { triggerClickOutside } from '../../../../../utils/helpers';
import Tooltip from '../../../Tooltip/Tooltip';
import './Emoji.scss';

interface ComposeButtonFooterEmotionPickerProp {
  onInsertEmoji: (emoji: EmojiClickData) => void;
}

const ComposeButtonFooterEmotionPicker = ({ onInsertEmoji }: ComposeButtonFooterEmotionPickerProp) => {
  const [isShowEmoji, setIsShowEmoji] = useState(false);
  const { t } = useTranslation();
  const emojiRef = useRef<HTMLDivElement>(null);

  const handleClickShowEmojiPicker = () => {
    setIsShowEmoji((prev) => !prev);
  };

  useEffect(() => {
    triggerClickOutside(emojiRef, () => {
      setIsShowEmoji(false);
    });
  }, []);
  const preview = {
    showPreview: false, // defaults to: true
  };

  return (
    <div className="relative">
      <Tooltip title={t('insert_emotion')} position="top">
        <div
          className={twMerge(
            '-mb-2.5 -mr-1 flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100',
          )}
          onClick={handleClickShowEmojiPicker}
          role="button"
          tabIndex={0}
          // ref={emojiRef}
        >
          <MdTagFaces size={20} />
        </div>
      </Tooltip>
      {isShowEmoji && (
        <div className="absolute bottom-full" ref={emojiRef}>
          <EmojiPicker
            onEmojiClick={onInsertEmoji}
            lazyLoadEmojis
            emojiStyle={EmojiStyle.FACEBOOK}
            previewConfig={preview}
          />
        </div>
      )}
    </div>
  );
};

export default ComposeButtonFooterEmotionPicker;
