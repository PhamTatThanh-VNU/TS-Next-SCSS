import Link from 'next/link';
import { Artist } from '@/lib/deezer/search-module';
import Image from 'next/image';

interface ArtistInfoProps {
  artist: Artist;
}

export default function ArtistInfo({ artist }: ArtistInfoProps) {
  return (
    <div className="artist-info">
      <h2 className="artist-info__title">Nghệ sĩ</h2>
      
      <div className="artist-info__content">
        <div className="artist-info__image">
          <Image 
            src={artist.picture_medium} 
            alt={artist.name} 
            width={80}
            height={80}
            loading="lazy"
          />
        </div>
        
        <div className="artist-info__details">
          <h3 className="artist-info__name">
            <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
          </h3>
          
          <div className="artist-info__meta">
            {artist.nb_fan !== undefined && (
              <p className="artist-info__fans">
                {new Intl.NumberFormat('vi-VN').format(artist.nb_fan)} fans
              </p>
            )}
            
            {artist.nb_album !== undefined && (
              <p className="artist-info__albums">
                {artist.nb_album} album
              </p>
            )}
          </div>
          
          <Link href={`/artist/${artist.id}`} className="artist-info__link">
            Thông tin
          </Link>
        </div>
      </div>
    </div>
  );
}
