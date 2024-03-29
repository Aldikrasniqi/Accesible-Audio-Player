import { useRef, useState } from "react";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaVolumeMute,
  FaVolumeUp,
  FaRedoAlt,
  FaUndoAlt,
} from "react-icons/fa";

import DropdownMenu from "../dropdown/Menu";
import { formatTime, formatHumanReadTime } from "../../Utils/formatTime";

import "./audio-player.css";
/* eslint-disable react/prop-types */
const AudioPlayer = ({ src, transcript }) => {
  // Create a play button that toggles play and pause
  // Create elapsed time and total time
  // create a fast forward and rewind 15 second button
  // create a scrubber
  // create a playback rate button
  // volume slider
  // mute toggle
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [mediaTime, setMediaTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const onTimeUpdate = () => {
    setMediaTime(audioRef.current.currentTime);
  };

  const onScrubberChange = (event) => {
    const newTime = event.target.value;
    setMediaTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const onRewind = () => {
    const { currentTime } = audioRef.current;
    const newTime = Math.max(currentTime - 15, 0);
    setMediaTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const onFastForward = () => {
    const { currentTime } = audioRef.current;
    const newTime = Math.min(currentTime + 15, duration);
    setMediaTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const rates = [0.75, 1, 1.5, 2];

  const changeRate = (rate) => {
    setPlaybackRate(rate);
    audioRef.current.playbackRate = rate;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const onVolumeChange = () => {
    if (audioRef.current.muted || audioRef.current.volume === 0) {
      setIsMuted(true);
    } else if (!audioRef.current.muted) {
      setIsMuted(false);
      setVolume(audioRef.current.volume);
    }
  };

  const onVolumeScrubberChange = (event) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const buttonText = (
    <>
      <span className="visually-hidden">Playback Rate</span>
      <span>{playbackRate}x</span>
    </>
  );

  return (
    <>
      <div className="audio">
        <button className="audio__play-button" onClick={togglePlaying}>
          {isPlaying ? (
            <>
              <span className="visually-hidden"></span>
              <FaPauseCircle aria-hidden="true" />
            </>
          ) : (
            <>
              <span className="visually-hidden"></span>
              <FaPlayCircle aria-hidden="true" />
            </>
          )}
        </button>
        <span className="elapsed">Elapsed Time: {formatTime(mediaTime)}</span>
        <span className="duration">Total Time: {formatTime(duration)}</span>
        <label htmlFor="time-scrubber">scrubber</label>
        <input
          type="range"
          id="time-scrubber"
          value={mediaTime}
          min={0}
          max={duration}
          onChange={onScrubberChange}
          aria-valuetext={formatHumanReadTime(mediaTime)}
        />
        <button
          className="audio__rewind-button"
          aria-label="Rewind 15 seconds"
          onClick={onRewind}
        >
          <FaUndoAlt />
          <span className="rewind--fifteen">15s</span>
        </button>
        <button
          className="audio__fast-forward-button"
          aria-label="Fast-Forward 15 seconds"
          onClick={onFastForward}
        >
          <FaRedoAlt />
          <span className="fast-forward--fifteen">15s</span>
        </button>
        <DropdownMenu
          className="audio__playback-wrapper"
          buttonClass="audio__playback-toggle"
          menuClass="audio__rates-wrapper"
          buttonText={buttonText}
          onOptionClick={changeRate}
          options={rates}
        />
        <button className="audio__mute-button" onClick={toggleMute}>
          {isMuted ? (
            <>
              <span className="visually-hidden"></span>
              <FaVolumeMute aria-hidden="true" />
            </>
          ) : (
            <>
              <span className="visually-hidden"></span>
              <FaVolumeUp aria-hidden="true" />
            </>
          )}
        </button>
        <label htmlFor="volume-scrubber">Volume:</label>
        <input
          type="range"
          id="volume-scrubber"
          value={isMuted ? 0 : volume}
          min={0}
          max={1}
          step={0.1}
          onChange={onVolumeScrubberChange}
        />
      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={onVolumeChange}
        src={src}
      />
      <div>{transcript}</div>
    </>
  );
};

export default AudioPlayer;