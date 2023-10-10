import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdTagFaces } from 'react-icons/md';
import { triggerClickOutside } from '../../../../../utils/helpers';
import ComposePopupToolbarItem from '../ComposePopupToolbarItem';
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
      <ComposePopupToolbarItem
        title={t('insert_emotion')}
        icon={<MdTagFaces size={20} />}
        onClick={handleClickShowEmojiPicker}
      />
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
