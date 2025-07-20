import axios from "axios";
import { SearchResult, SearchResponse, Artist, Album } from "./search-module";

class DeezerService {
  private API_BASE_URL: string = "/api/deezer";

  async searchTracks(query: string, limit: number = 20): Promise<SearchResponse> {
    try {
      const response = await axios.get(this.API_BASE_URL, {
        params: {
          path: 'search',
          q: query,
          limit
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching tracks:', error);
      throw error;
    }
  }

  async getTrack(id: number): Promise<SearchResult> {
    try {
      const response = await axios.get(this.API_BASE_URL, {
        params: {
          path: `track/${id}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error getting track ${id}:`, error);
      throw error;
    }
  }

  async getArtist(id: number): Promise<Artist> {
    try {
      const response = await axios.get(this.API_BASE_URL, {
        params: {
          path: `artist/${id}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error getting artist ${id}:`, error);
      throw error;
    }
  }

  async getAlbum(id: number): Promise<Album> {
    try {
      const response = await axios.get(this.API_BASE_URL, {
        params: {
          path: `album/${id}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error getting album ${id}:`, error);
      throw error;
    }
  }

  async getCharts(limit: number = 20): Promise<SearchResponse> {
    try {
      const response = await axios.get(this.API_BASE_URL, {
        params: {
          path: 'chart/0/tracks',
          limit
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting charts:', error);
      throw error;
    }
  }
}
const deezerService = new DeezerService();
export default deezerService;