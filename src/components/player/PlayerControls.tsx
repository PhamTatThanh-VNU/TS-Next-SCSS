'use client';

import { useState, useEffect, useRef } from 'react';
import { BiPlay, BiPause, BiSkipPrevious, BiSkipNext, BiVolumeFull, BiVolumeLow, BiVolumeMute } from 'react-icons/bi';
import { SearchResult } from '@/lib/deezer/search-module';

interface PlayerControlsProps {
  track: SearchResult;
}

export default function PlayerControls({ track }: PlayerControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Tạo audio element khi component mount
    const audio = new Audio(track.preview);
    audio.volume = volume;
    audioRef.current = audio;

    // Cập nhật thời gian phát
    audio.addEventListener('timeupdate', updateTime);
    
    // Xử lý khi audio phát xong
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    });
    
    // Cleanup khi component unmount
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', () => {
        setIsPlaying(false);
      });
      audioRef.current = null;
    };
  }, [track.preview]);

  // Xử lý thay đổi volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <BiVolumeMute />;
    if (volume < 0.5) return <BiVolumeLow />;
    return <BiVolumeFull />;
  };

  return (
    <div className="player-controls">
      <div className="player-controls__progress">
        <span className="player-controls__time">{formatTime(currentTime)}</span>
        <input
          type="range"
          className="player-controls__progress-bar"
          min="0"
          max="30" // Deezer preview thường chỉ dài 30s
          step="0.01"
          value={currentTime}
          onChange={handleProgressChange}
          style={{ 
            '--progress': `${(currentTime / 30) * 100}%` 
          } as React.CSSProperties}
        />
        <span className="player-controls__time">{formatTime(30)}</span>
      </div>
      
      <div className="player-controls__buttons">
        <button className="player-controls__button">
          <BiSkipPrevious />
        </button>
        
        <button 
          className="player-controls__button player-controls__button--play"
          onClick={togglePlay}
        >
          {isPlaying ? <BiPause /> : <BiPlay />}
        </button>
        
        <button className="player-controls__button">
          <BiSkipNext />
        </button>
      </div>
      
      <div className="player-controls__volume">
        <button className="player-controls__button player-controls__button--volume">
          {getVolumeIcon()}
        </button>
        <input
          type="range"
          className="player-controls__volume-slider"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}
