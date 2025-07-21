'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import ProtectedRoute from '@/lib/utils/ProtectedRoute';
import deezerService from '@/lib/deezer/deezer-service';
import { Artist, SearchResult } from '@/lib/deezer/search-module';
import Image from 'next/image';

export default function ArtistPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [topTracks, setTopTracks] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArtistData = async () => {
      setLoading(true);
      try {
        // Fetch artist details
        const artistData = await deezerService.getArtist(Number(id));
        setArtist(artistData);
        
        // Fetch top tracks by artist
        const response = await deezerService.searchTracks(`artist:"${artistData.name}"`, 15);
        setTopTracks(response.data || []);
      } catch (err) {
        console.error('Error fetching artist data:', err);
        setError('Không thể tải thông tin nghệ sĩ. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArtistData();
    }
  }, [id]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="artist-page">          
          <div className="artist-page__loading">
            <div className="spinner"></div>
            <p>Đang tải thông tin nghệ sĩ...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="artist-page">          
          <div className="artist-page__error">
            <p>{error}</p>
            <Link href="/dashboard" className="artist-page__back-btn">
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!artist) {
    return (
      <ProtectedRoute>
        <div className="artist-page">          
          <div className="artist-page__not-found">
            <p>Không tìm thấy thông tin nghệ sĩ</p>
            <Link href="/dashboard" className="artist-page__back-btn">
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="artist-page">        
        
        <div className="artist-page__container">
          <div className="artist-page__header">
            <Link href="/dashboard" className="artist-page__back-link">
              <BiArrowBack /> Quay lại
            </Link>
          </div>
          
          <div className="artist-page__profile">
            <div className="artist-page__cover" 
                 style={{ backgroundImage: `url(${artist.picture_big || artist.picture_medium})` }}>
              <div className="artist-page__overlay"></div>
            </div>
            
            <div className="artist-page__profile-content">
              <div className="artist-page__avatar">
                {artist.picture_medium && (
                  <Image 
                    src={artist.picture_medium} 
                    alt={artist.name} 
                    width={150}
                    height={150}
                    loading="lazy"
                  />
                )}
              </div>
              
              <div className="artist-page__info">
                <h1 className="artist-page__name">{artist.name}</h1>
                
                <div className="artist-page__stats">
                  <div className="artist-page__stat">
                    <span className="artist-page__stat-value">
                      {new Intl.NumberFormat('vi-VN').format(artist.nb_fan || 0)}
                    </span>
                    <span className="artist-page__stat-label">Người hâm mộ</span>
                  </div>
                  
                  <div className="artist-page__stat">
                    <span className="artist-page__stat-value">{artist.nb_album || 0}</span>
                    <span className="artist-page__stat-label">Album</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="artist-page__content">
            <section className="artist-page__tracks">
              <h2 className="artist-page__section-title">Bài hát nổi bật</h2>
              
              <div className="artist-page__tracks-list">
                {topTracks.length > 0 ? (
                  topTracks.map((track) => (
                    <Link href={`/track/${track.id}`} key={track.id} className="artist-page__track-item">
                      <div className="artist-page__track-image">
                        <Image src={track.album.cover_medium} alt={track.title} loading="lazy" width={266} height={266}/>
                        <div className="artist-page__track-play">
                          <span>▶</span>
                        </div>
                      </div>
                      <div className="artist-page__track-info">
                        <h3 className="artist-page__track-title">{track.title}</h3>
                        <p className="artist-page__track-album">{track.album.title}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="artist-page__no-tracks">Không có bài hát nào</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
