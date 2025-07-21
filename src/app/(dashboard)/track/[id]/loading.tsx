import Header from '@/components/dashboard/Header';

export default function Loading() {
  return (
    <div className="track-player__loading-container">
    <Header />
    <div className="track-player__loading">
      <div className="spinner spinner--large"></div>
      <p>Đang tải thông tin bài hát...</p>
      </div>
    </div>
  );
}
