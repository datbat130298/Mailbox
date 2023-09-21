import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronLeft } from 'react-icons/fi';
import { MdOutlineHighQuality, MdOutlineSubtitles } from 'react-icons/md';
import { SiSpeedtest } from 'react-icons/si';
import { twMerge } from 'tailwind-merge';
import { SelectOptionType } from '../../../../../app/Types/elementTypes';
import FilePreviewVideoSettingItem from './FilePreviewVideoSettingItem';
import FilePreviewVideoSettingMenuDivide from './FilePreviewVideoSettingMenuDivide';

interface SelectedSettingType {
  title: string;
  content: SelectOptionType;
  action?: (value: SelectOptionType) => void;
  options: Array<SelectOptionType>;
}

interface FilePreviewVideoSettingPopupProps {
  isOpen: boolean;
  onPlaybackRateChange: (rate: number | string | undefined) => void;
}

const FilePreviewVideoSettingPopup = ({
  isOpen,
  onPlaybackRateChange,
}: FilePreviewVideoSettingPopupProps) => {
  const [selectedSetting, setSelectedSetting] = useState<SelectedSettingType | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<SelectOptionType>({ label: 'Normal', value: 1 });
  const [quality, setQuality] = useState<SelectOptionType>({ label: '360p', value: 360 });
  const [subtitle, setSubtitle] = useState<SelectOptionType>({ label: 'OFF', value: 0 });

  const { t } = useTranslation(['user'], {
    keyPrefix: 'pages.myStorage.filePreviewReader.fileVideo',
  });

  useEffect(() => {
    if (!isOpen) {
      setSelectedSetting(null);
    }
  }, [isOpen]);

  const handleSetPlaybackSpeed = (option: SelectOptionType) => {
    onPlaybackRateChange?.(option.value);
    setPlaybackSpeed(option);
    setSelectedSetting(null);
  };

  const handleSetQuality = (option: SelectOptionType) => {
    setQuality(option);
    setSelectedSetting(null);
  };

  const handleSetSubtitle = (option: SelectOptionType) => {
    setSubtitle(option);
    setSelectedSetting(null);
  };

  const settingOptions = [
    {
      title: t('playbackRate'),
      action: handleSetPlaybackSpeed,
      content: playbackSpeed,
      icon: <SiSpeedtest size={20} color="#FFF" />,
      options: [
        { label: '0.25', value: 0.25 },
        { label: '0.5', value: 0.5 },
        { label: '0.75', value: 0.75 },
        { label: t('normal'), value: 1 },
        { label: '1.25', value: 1.25 },
        { label: '1.5', value: 1.5 },
        { label: '1.75', value: 1.75 },
      ],
    },
    {
      title: t('subtitle'),
      action: handleSetSubtitle,
      content: subtitle,
      icon: <MdOutlineSubtitles size={20} color="#FFF" />,
      options: [{ label: t('off'), value: 0 }],
    },
    {
      title: t('quality'),
      action: handleSetQuality,
      content: quality,
      icon: <MdOutlineHighQuality size={20} color="#FFF" />,
      options: [
        { label: '1080p', value: 1080 },
        { label: '480p', value: 480 },
        { label: '360p', value: 360 },
      ],
    },
  ];

  return (
    <div className="absolute bottom-16 right-3 overflow-hidden">
      <div
        className={twMerge(
          'h-fit w-[251px] translate-x-64 overflow-hidden bg-neutral-900/80 transition duration-200 ease-linear',
          isOpen && 'translate-x-0',
        )}
      >
        <div className="flex h-full w-full flex-col py-2">
          {selectedSetting && (
            <>
              <div
                role="button"
                tabIndex={0}
                className="flex items-center justify-start px-4 py-3"
                onClick={() => setSelectedSetting(null)}
              >
                <FiChevronLeft size={18} color="#FFF" />
                <span className="px-4 text-base text-white">{selectedSetting?.title}</span>
              </div>
              <FilePreviewVideoSettingMenuDivide />
            </>
          )}
          {selectedSetting &&
            selectedSetting?.options.map((option, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i}>
                <FilePreviewVideoSettingItem
                  label={option.label}
                  onClick={() => selectedSetting?.action?.(option)}
                  selectedMenuItem={selectedSetting.content}
                />
              </div>
            ))}
          {_.isNil(selectedSetting) &&
            settingOptions.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i}>
                <FilePreviewVideoSettingItem
                  label={item.title}
                  onClick={() => setSelectedSetting(item)}
                  content={item.content?.label}
                  icon={item.icon}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FilePreviewVideoSettingPopup);
