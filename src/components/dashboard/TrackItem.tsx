'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiPlay, BiPause } from 'react-icons/bi';
import { SearchResult } from '@/lib/deezer/search-module';
import Image from 'next/image'

interface TrackItemProps {
  track: SearchResult;
}

export default function TrackItem({ track }: TrackItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsPlaying(!isPlaying);
  };

  const navigateToTrack = () => {
    router.push(`/track/${track.id}`);
  };

  return (
    <div className="track-item" onClick={navigateToTrack}>
      <div className="track-item__index">{"-"}</div>
      
      <div className="track-item__cover">
        <Image 
          src={track.album.cover_small} 
          alt={track.album.title}
          fill
          loading="lazy"
        />
        <button 
          className="track-item__play-btn"
          onClick={handlePlayPause}
        >
          {isPlaying ? <BiPause /> : <BiPlay />}
        </button>
      </div>
      
      <div className="track-item__info">
        <h3 className="track-item__title">{track.title}</h3>
        <p className="track-item__artist">{track.artist.name}</p>
      </div>
      
      <div className="track-item__album">{track.album.title}</div>
      <div className="track-item__duration">{formatDuration(track.duration)}</div>
    </div>
  );
}