import { useEffect, useRef } from 'react';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import { CgMiniPlayer } from 'react-icons/cg';
import { IoMdPause, IoMdPlay, IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeOff } from 'react-icons/io';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdOutlineRestartAlt } from 'react-icons/md';
import { getTrackBackground, Range } from 'react-range';
import { twMerge } from 'tailwind-merge';
import FilePreviewVideoSettingPopup from './FilePreviewVideoSettingPopup';

const FilePreviewVideoControls = ({
  innerRef,
  onSeek,
  onSeekMouseUp,
  onPlayPause,
  playing,
  played,
  elapsedTime,
  totalDuration,
  onMute,
  screenFull,
  muted,
  isOpenSettingPopup,
  onVolumeSeekDown,
  onShowMiniView,
  playbackRate,
  onPlaybackRateChange,
  onToggleFullScreen,
  onShowSettingPopup,
  volume,
  ended,
  onVolumeChange,
}) => {
  const prettoSlider = useRef();
  const prettoThumb = useRef();
  const volumeSlider = useRef();

  const handleShowPrettoThumb = () => {
    if (!prettoThumb) return;
    prettoThumb.current.style.visibility = 'visible';
    prettoThumb.current.style.opacity = '1';
  };

  const handleHidePrettoThumb = () => {
    if (!prettoThumb) return;
    prettoThumb.current.style.visibility = 'hidden';
    prettoThumb.current.style.opacity = '0';
    prettoThumb.current.style.transition = 'visibility 0.2s linear,opacity 0.2s linear';
  };

  const handleShowVolumeSlider = () => {
    if (!volumeSlider) return;
    volumeSlider.current.style.width = '144px';
  };

  const handleHideVolumeSlider = () => {
    if (!volumeSlider) return;
    volumeSlider.current.style.width = '40px';
  };

  useEffect(() => {
    if (prettoSlider) {
      prettoSlider?.current?.addEventListener('mouseover', handleShowPrettoThumb);
      prettoSlider?.current?.addEventListener('mouseout', handleHidePrettoThumb);
    }
    return () => {
      prettoSlider?.current?.removeEventListener('mouseover', handleShowPrettoThumb);
      prettoSlider?.current?.removeEventListener('mouseout', handleHidePrettoThumb);
    };
  });

  useEffect(() => {
    if (innerRef) {
      innerRef?.current?.addEventListener('mouseover', handleShowVolumeSlider);
      innerRef?.current?.addEventListener('mouseout', handleHideVolumeSlider);
    }
    return () => {
      innerRef?.current?.addEventListener('mouseover', handleShowVolumeSlider);
      innerRef?.current?.addEventListener('mouseout', handleHideVolumeSlider);
    };
  });

  return (
    <div ref={innerRef} className="h-18 absolute bottom-0 z-50 flex w-full flex-col justify-start px-3">
      <FilePreviewVideoSettingPopup
        isOpen={isOpenSettingPopup}
        playbackRate={playbackRate}
        onPlaybackRateChange={onPlaybackRateChange}
      />
      <Range
        min={0}
        step={0.0001}
        max={100}
        values={played}
        onChange={(values) => {
          onSeek(values);
        }}
        onFinalChange={(values) => {
          onSeekMouseUp(values);
        }}
        renderTrack={({ props, children }) => {
          return (
            <div ref={prettoSlider} {...props} tabIndex={0} role="button" className="relative h-5 w-full">
              <div className="h-4">
                <div
                  className="mt-4 h-[5px]"
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: played,
                      colors: ['#f00', '#ffffff33'],
                      min: 0,
                      max: 100,
                    }),
                  }}
                />
              </div>
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => (
          <div
            ref={prettoThumb}
            {...props}
            className="!mt-[-23px] h-3 w-3 rounded-full"
            style={{
              backgroundColor: '#F00',
            }}
          />
        )}
      />
      <div className="-mx-3 mt-0.5 flex h-12 items-center justify-between bg-black/20 px-2">
        <div className="flex items-center justify-center">
          <div role="button" tabIndex={0} className="h-12 w-12 cursor-pointer p-3" onClick={onPlayPause}>
            <div className="relative flex items-center justify-center">
              {ended ? (
                <MdOutlineRestartAlt size={24} color="#fff" />
              ) : (
                <>
                  <div
                    className={twMerge(
                      'absolute top-0 scale-0 transition duration-200 ease-linear',
                      playing && 'scale-100',
                    )}
                  >
                    <IoMdPause size={24} color="#fff" />
                  </div>
                  <div
                    className={twMerge(
                      'absolute top-0 scale-0 transition duration-200 ease-linear',
                      playing === false && 'scale-100',
                    )}
                  >
                    <IoMdPlay size={24} color="#fff" />
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            ref={volumeSlider}
            className="flex items-center justify-between overflow-hidden px-4 transition-[width] duration-200 ease-linear"
          >
            <div role="button" tabIndex={0} onClick={onMute} className="pr-4">
              {muted === true && <IoMdVolumeOff size={24} color="#fff" />}
              {!muted &&
                (volume && volume > 50 ? (
                  <IoMdVolumeHigh size={24} color="#fff" />
                ) : (
                  <IoMdVolumeLow size={24} color="#fff" />
                ))}
            </div>
            <Range
              min={0}
              max={100}
              values={volume}
              onChange={onVolumeChange}
              onFinalChange={onVolumeSeekDown}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-1 w-20 rounded-lg"
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: volume,
                      colors: ['#FFF', '#ffffff33'],
                      min: 0,
                      max: 100,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-3 w-3 rounded-full "
                  style={{
                    ...props.style,
                    backgroundColor: '#FFF',
                  }}
                />
              )}
            />
          </div>

          <div className="px-5 pb-[2px] text-white">
            {elapsedTime} / {totalDuration}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div
            role="button"
            tabIndex={0}
            className="px-3 py-2 transition duration-100 ease-in-out hover:scale-125"
            onClick={() => {
              onShowSettingPopup();
              onShowMiniView();
            }}
          >
            <CgMiniPlayer size={26} color="#fff" />
          </div>
          <div
            role="button"
            tabIndex={0}
            className={twMerge(
              'px-3 py-2 transition duration-150 ease-linear',
              isOpenSettingPopup && 'rotate-45',
            )}
            onClick={onShowSettingPopup}
          >
            <IoSettingsSharp size={26} color="#fff" />
          </div>
          <div
            role="button"
            tabIndex={0}
            className="px-3 py-2 transition duration-100 ease-in-out hover:scale-125"
            onClick={() => {
              onShowSettingPopup();
              onToggleFullScreen();
            }}
          >
            {screenFull ? (
              <BiExitFullscreen size={26} color="#fff" />
            ) : (
              <BiFullscreen size={26} color="#fff" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreviewVideoControls;
