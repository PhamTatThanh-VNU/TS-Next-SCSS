'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/lib/utils/ProtectedRoute';
import Header from '@/components/dashboard/Header';
import SearchBar from '@/components/dashboard/SearchBar';
import TrackList from '@/components/dashboard/TrackList';
import { SearchResult } from '@/lib/deezer/search-module';
import deezerService from '@/lib/deezer/deezer-service';

export default function Dashboard() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [chartResults, setChartResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Fetch charts on component mount
  useEffect(() => {
    const fetchCharts = async () => {
      setLoading(true);
      try {
        const response = await deezerService.getCharts(20);
        setChartResults(response.data);
      } catch (error) {
        console.error('Error fetching charts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []);

  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
    setIsSearchMode(true);
  };

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  // Determine which tracks to display
  const tracksToDisplay = isSearchMode ? searchResults : chartResults;
  const displayTitle = isSearchMode ? "Kết quả tìm kiếm" : "Bảng xếp hạng";

  return (
    <ProtectedRoute>
      <div className="dashboard">
        <Header />
        
        <main className="dashboard__main">
          <div className="dashboard__container">
            <h1 className="dashboard__title">Tìm kiếm bài hát</h1>
            <SearchBar 
              onResults={handleSearchResults}
              onLoading={handleLoading}
            />
            
            <div className="dashboard__section">
              <TrackList 
                tracks={tracksToDisplay}
                loading={loading}
                title={displayTitle}
              />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}