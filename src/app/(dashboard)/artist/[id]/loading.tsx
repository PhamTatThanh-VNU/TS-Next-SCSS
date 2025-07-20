import Header from '@/components/dashboard/Header';

export default function Loading() {
  return (
    <div className="artist-page">
      <Header />
      <div className="artist-page__loading">
        <div className="spinner"></div>
        <p>Đang tải thông tin nghệ sĩ...</p>
      </div>
    </div>
  );
}
