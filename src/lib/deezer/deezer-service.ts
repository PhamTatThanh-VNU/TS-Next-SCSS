import axios from "axios";
import { SearchResult, SearchResponse, Artist, Album } from "./search-module";

class DeezerService {
  private PROXY_URL: string = "https://cors-anywhere.herokuapp.com/";
  private DEEZER_API_URL: string = "https://api.deezer.com";

  private getProxiedUrl(url: string): string {
    return `${this.PROXY_URL}${url}`;
  }

  async searchTracks(query: string, limit: number = 20): Promise<SearchResponse> {
    try {
      const response = await axios.get(
        this.getProxiedUrl(`${this.DEEZER_API_URL}/search`),
        {
          params: {
            q: query,
            limit
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error searching tracks:', error);
      throw error;
    }
  }

  async getTrack(id: number): Promise<SearchResult> {
    try {
      const response = await axios.get(
        this.getProxiedUrl(`${this.DEEZER_API_URL}/track/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error(`Error getting track ${id}:`, error);
      throw error;
    }
  }

  async getArtist(id: number): Promise<Artist> {
    try {
      const response = await axios.get(
        this.getProxiedUrl(`${this.DEEZER_API_URL}/artist/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error(`Error getting artist ${id}:`, error);
      throw error;
    }
  }

  async getAlbum(id: number): Promise<Album> {
    try {
      const response = await axios.get(
        this.getProxiedUrl(`${this.DEEZER_API_URL}/album/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error(`Error getting album ${id}:`, error);
      throw error;
    }
  }

  async getCharts(limit: number = 20): Promise<SearchResponse> {
    try {
      const response = await axios.get(
        this.getProxiedUrl(`${this.DEEZER_API_URL}/chart/0/tracks`),
        {
          params: { limit }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error getting charts:', error);
      throw error;
    }
  }
}
const deezerService = new DeezerService();
export default deezerService;