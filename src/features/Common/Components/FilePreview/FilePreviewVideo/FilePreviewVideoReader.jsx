import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import FilePreviewVideoControls from './FilePreviewVideoControls';
import FilePreviewVideoWrapper from './FilePreviewVideoWrapper';

const FilePreviewVideoReader = ({ attachment }) => {
  const [count, setCount] = useState(0);
  const [playerState, setPlayerState] = useState({
    pip: false,
    playing: true,
    isLoading: true,
    screenFull: false,
    light: false,
    isOpenSettingPopup: false,
    muted: true,
    played: [0],
    duration: 0,
    ended: false,
    playbackRate: 1.0,
    volume: [0],
    loop: false,
    url: '',
  });

  const playerRef = useRef();
  const controlsRef = useRef();
  const playerContainerRef = useRef();

  const {
    playing,
    isLoading,
    light,
    isOpenSettingPopup,
    muted,
    loop,
    ended,
    screenFull,
    playbackRate,
    pip,
    url,
    played,
    volume,
  } = playerState;

  const format = (seconds) => {
    if (Number.isNaN(seconds)) {
      return `00:00`;
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const handleProgress = (changeplayerState) => {
    if (count > 3 && !isOpenSettingPopup) {
      controlsRef.current.style.visibility = 'hidden';
      setCount(0);
    }
    if (controlsRef?.current?.style?.visibility === 'visible') {
      setCount((prev) => prev + 1);
    }
    if (!playerState.seeking) {
      setPlayerState({ ...playerState, played: [changeplayerState.played * 100] });
    }
  };

  const handleSeekChange = (newValue) => {
    setPlayerState({ ...playerState, played: newValue, isLoading: true });
  };

  const handleSeekMouseDown = () => {
    setPlayerState({ ...playerState, seeking: true, isOpenSettingPopup: false, playing: false });
  };

  const handleSeekMouseUp = (newValue) => {
    setPlayerState({ ...playerState, seeking: false, isOpenSettingPopup: false, playing: true });
    playerRef.current.seekTo(_.first(newValue) / 100, 'fraction');
  };

  const handleDuration = (duration) => {
    setPlayerState({ ...playerState, duration });
  };

  const handleMediaReady = () => {
    setPlayerState({ ...playerState, isLoading: false });
  };

  const hanldeMute = () => {
    if (muted) {
      setPlayerState({ ...playerState, muted: !playerState.muted, volume: [80], isOpenSettingPopup: false });
    } else {
      setPlayerState({ ...playerState, muted: !playerState.muted, volume: [0], isOpenSettingPopup: false });
    }
  };

  const handlePlayPause = () => {
    setPlayerState({
      ...playerState,
      playing: !playerState.playing,
      ended: false,
      isOpenSettingPopup: false,
    });
  };

  useEffect(() => {
    const isPlaying = playerRef?.current?.player?.isPlaying;
    setPlayerState({ ...playerState, playing: isPlaying });
  }, [playerRef?.current?.player?.isPlaying]);

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = 'visible';
    controlsRef.current.style.opacity = '1';
  };

  const hanldeMouseLeave = () => {
    if (playing && !isOpenSettingPopup) {
      controlsRef.current.style.visibility = 'hidden';
      controlsRef.current.style.opacity = '0';
      controlsRef.current.style.transition = 'all 0.3s linear,opacity 0.3s linear';
    }
  };

  useEffect(() => {
    if (isOpenSettingPopup) {
      handleMouseMove();
    }
  }, [isOpenSettingPopup]);

  const toggleFullScreen = () => {
    setPlayerState({ ...playerState, isOpenSettingPopup: false, screenFull: !screenFull });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    screenfull.toggle(playerContainerRef.current);
  };

  const handleVolumeSeekDown = (newValue) => {
    setPlayerState({ ...playerState, seeking: false, volume: newValue, isOpenSettingPopup: false });
  };
  const handleVolumeChange = (newValue) => {
    setPlayerState({
      ...playerState,
      volume: newValue,
      muted: !_.first(newValue),
      isOpenSettingPopup: false,
    });
  };

  const handleShowMiniView = () => {
    setPlayerState({ ...playerState, pip: true, isOpenSettingPopup: false });
  };

  const handleHideMiniView = () => {
    setPlayerState({ ...playerState, pip: false, isOpenSettingPopup: false });
  };

  const handlePlaybackRate = (rate) => {
    setPlayerState({ ...playerState, playbackRate: rate });
  };

  const handleShowSettingPopup = () => {
    setPlayerState({ ...playerState, isOpenSettingPopup: !isOpenSettingPopup });
  };

  const handleEnded = () => {
    setPlayerState({ ...playerState, ended: true });
  };

  const handleLoadUrl = () => {
    setPlayerState({
      ...playerState,
      url: attachment.absolute_slug,
    });
  };

  useEffect(() => {
    handleLoadUrl();
    return () => {
      setPlayerState({
        ...playerState,
        url: '',
      });
    };
  }, [attachment]);

  const currentTime = playerRef && playerRef.current ? playerRef.current.getCurrentTime() : '00:00';

  const duration = playerRef && playerRef.current ? playerRef.current.getDuration() : '00:00';

  const elapsedTime = format(currentTime);

  const totalDuration = format(duration);

  return (
    <div className="-mt-10 flex h-screen w-screen items-center justify-center">
      <FilePreviewVideoWrapper
        innerRef={playerContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={hanldeMouseLeave}
        onChangePlayPause={handlePlayPause}
        isPlaying={playing}
        isLoading={isLoading}
      >
        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="100%"
          url={url}
          pip={pip}
          playing={playing}
          light={light}
          loop={loop}
          playbackRate={playbackRate}
          volume={_.first(volume) / 100}
          muted={muted}
          onReady={handleMediaReady}
          onDisablePIP={handleHideMiniView}
          onProgress={handleProgress}
          onEnded={handleEnded}
          config={{
            file: {
              attributes: {
                crossOrigin: 'anonymous',
              },
            },
          }}
        />

        <FilePreviewVideoControls
          innerRef={controlsRef}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          onDuration={handleDuration}
          onPlayPause={handlePlayPause}
          onShowSettingPopup={handleShowSettingPopup}
          playing={playing}
          played={played}
          screenFull={screenFull}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
          onMute={hanldeMute}
          muted={muted}
          ended={ended}
          isOpenSettingPopup={isOpenSettingPopup}
          onShowMiniView={handleShowMiniView}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekDown={handleVolumeSeekDown}
          playbackRate={playbackRate}
          onPlaybackRateChange={handlePlaybackRate}
          onToggleFullScreen={toggleFullScreen}
          volume={volume}
        />
      </FilePreviewVideoWrapper>
    </div>
  );
};

export default FilePreviewVideoReader;
