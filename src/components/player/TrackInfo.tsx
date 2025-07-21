import Link from 'next/link';
import { SearchResult } from '@/lib/deezer/search-module';
import Image from 'next/image';

interface TrackInfoProps {
  track: SearchResult;
}

export default function TrackInfo({ track }: TrackInfoProps) {
  const formattedDuration = () => {
    const mins = Math.floor(track.duration / 60);
    const secs = track.duration % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="track-info">
      <div className="track-info__cover">
        <Image 
          src={track.album.cover_big || track.album.cover_medium} 
          alt={track.title}
          width={300}
          height={300}
          loading="eager"
        />
      </div>
      
      <div className="track-info__details">
        <h1 className="track-info__title">{track.title}</h1>
        
        <Link href={`/artist/${track.artist.id}`} className="track-info__artist-link">
          {track.artist.name}
        </Link>
        
        <div className="track-info__meta">
          <div className="track-info__item">
            <span className="track-info__label">Album:</span>
            <Link href={`/album/${track.album.id}`} className="track-info__value track-info__value--link">
              {track.album.title}
            </Link>
          </div>
          
          <div className="track-info__item">
            <span className="track-info__label">Thời lượng:</span>
            <span className="track-info__value">{formattedDuration()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
