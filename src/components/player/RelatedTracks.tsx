'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SearchResult } from '@/lib/deezer/search-module';
import deezerService from '@/lib/deezer/deezer-service';
import Image from 'next/image';

interface RelatedTracksProps {
  artistId: number;
  currentTrackId: number;
}

export default function RelatedTracks({ artistId, currentTrackId }: RelatedTracksProps) {
  const [tracks, setTracks] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedTracks = async () => {
      if (!artistId) return;
      
      setLoading(true);
      try {
        const artist = await deezerService.getArtist(artistId);
        
        if (artist && artist.name) {
          // Tìm kiếm bài hát theo tên nghệ sĩ
          const response = await deezerService.searchTracks(`artist:"${artist.name}"`, 10);
          
          const filteredTracks = response.data
            .filter(track => track.id !== currentTrackId)
            .slice(0, 5);
          setTracks(filteredTracks);
        }
      } catch (error) {
        console.error("Error fetching related tracks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedTracks();
  }, [artistId, currentTrackId]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="related-tracks">
        <h2 className="related-tracks__title">Bài hát liên quan</h2>
        <div className="related-tracks__loading">
          <div className="spinner spinner--small"></div>
        </div>
      </div>
    );
  }

  if (!tracks.length) {
    return null;
  }

  return (
    <div className="related-tracks">
      <h2 className="related-tracks__title">Bài hát liên quan</h2>
      
      <ul className="related-tracks__list">
        {tracks.map(track => (
          <li key={track.id} className="related-tracks__item">
            <Link href={`/track/${track.id}`} className="related-tracks__link">
              <div className="related-tracks__image">
                <Image 
                  src={track.album.cover_small} 
                  alt={track.title} 
                  width={50}
                  height={50}
                  loading="lazy"
                />
              </div>
              <div className="related-tracks__info">
                <span className="related-tracks__track-title">{track.title}</span>
                <span className="related-tracks__duration">
                  {formatDuration(track.duration)}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
