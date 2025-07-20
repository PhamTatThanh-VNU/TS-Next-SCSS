'use client';

import { SearchResult } from '@/lib/deezer/search-module';
import TrackItem from './TrackItem';

interface TrackListProps {
  tracks: SearchResult[];
  loading: boolean;
  title?: string;
}

export default function TrackList({ tracks, loading, title = "Kết quả tìm kiếm" }: TrackListProps) {
  if (loading) {
    return (
      <div className="track-list">
        <div className="track-list__loading">
          <div className="spinner"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="track-list">
        <div className="track-list__empty">
          <p>Không có dữ liệu để hiển thị</p>
        </div>
      </div>
    );
  }

  return (
    <div className="track-list">
      <div className="track-list__header">
        <h2>{title} ({tracks.length})</h2>
      </div>
      
      <div className="track-list__items">
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}