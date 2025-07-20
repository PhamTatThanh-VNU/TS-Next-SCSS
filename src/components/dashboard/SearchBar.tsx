'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { BiSearch, BiX } from 'react-icons/bi';
import deezerService from '@/lib/deezer/deezer-service';
import { SearchResult } from '@/lib/deezer/search-module';

interface SearchBarProps {
  onResults: (results: SearchResult[]) => void;
  onLoading: (loading: boolean) => void;
}

export default function SearchBar({ onResults, onLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout khi component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      onResults([]);
      return;
    }

    onLoading(true);
    try {
      const response = await deezerService.searchTracks(searchQuery, 20);
      onResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      onResults([]);
    } finally {
      onLoading(false);
    }
  }, [onResults, onLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Clear timeout trước đó nếu có
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Debounced search
    if (value.trim()) {
      timeoutRef.current = setTimeout(() => handleSearch(value), 500);
    } else {
      // Khi xóa hết query, trả về mảng rỗng để hiển thị charts
      onResults([]);
    }
  };

  // Thêm nút clear search
  const handleClearSearch = () => {
    setQuery('');
    onResults([]);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-bar__form">
        <div className="search-bar__input-wrapper">
          <BiSearch className="search-bar__icon" />
          <input
            type="text"
            placeholder="Tìm kiếm bài hát, nghệ sĩ..."
            value={query}
            onChange={handleInputChange}
            className="search-bar__input"
            autoComplete="off"
          />
          {query && (
            <button 
              type="button"
              className="search-bar__clear"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <BiX />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}