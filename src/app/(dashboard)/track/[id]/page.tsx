'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';
import deezerService from '@/lib/deezer/deezer-service';
import Header from '@/components/dashboard/Header';
import ProtectedRoute from '@/lib/utils/ProtectedRoute';
import PlayerControls from '@/components/player/PlayerControls';
import TrackInfo from '@/components/player/TrackInfo';
import ArtistInfo from '@/components/player/ArtistInfo';
import RelatedTracks from '@/components/player/RelatedTracks';
import { SearchResult, Artist } from '@/lib/deezer/search-module';

export default function TrackPage() {
  const { id } = useParams();  
  const [track, setTrack] = useState<SearchResult | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrackData = async () => {
      setLoading(true);
      try {
        // Fetch track details
        const trackData = await deezerService.getTrack(Number(id));
        setTrack(trackData);
        
        // Fetch artist details if track data is available
        if (trackData && trackData.artist && trackData.artist.id) {
          const artistData = await deezerService.getArtist(trackData.artist.id);
          setArtist(artistData);
        }
      } catch (err) {
        console.error('Error fetching track data:', err);
        setError('Không thể tải thông tin bài hát. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTrackData();
    }
  }, [id]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="track-player">
          <Header />
          <div className="track-player__loading">
            <div className="spinner"></div>
            <p>Đang tải thông tin bài hát...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="track-player">
          <Header />
          <div className="track-player__error">
            <p>{error}</p>
            <Link href="/dashboard" className="track-player__back-btn">
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!track) {
    return (
      <ProtectedRoute>
        <div className="track-player">
          <Header />
          <div className="track-player__not-found">
            <p>Không tìm thấy bài hát</p>
            <Link href="/dashboard" className="track-player__back-btn">
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="track-player">
        <Header />
        
        <div className="track-player__container">
          <div className="track-player__header">
            <Link href="/dashboard" className="track-player__back-link">
              <BiArrowBack /> Quay lại
            </Link>
          </div>
          
          <div className="track-player__content">
            <div className="track-player__main">
              <TrackInfo track={track} />
              <PlayerControls track={track} />
            </div>
            
            <div className="track-player__sidebar">
              {artist && <ArtistInfo artist={artist} />}
              <RelatedTracks artistName={track.artist.name} currentTrackId={track.id} />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
