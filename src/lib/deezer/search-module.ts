export interface SearchResult {
    id: number;
    title: string;
    link: string;
    duration: number;
    preview: string; 
    artist: {
        id: number;
        name: string;
        picture_small: string;
        picture_medium: string;
    };
    album: {
        id: number;
        title: string;
        cover_small: string;
        cover_medium: string;
        cover_big: string;
    };
}
export interface SearchResponse {
    data: SearchResult[];
    total: number;
    next?: string;
}
export interface Artist{
    id: number;
    name: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    nb_album: number; 
    nb_fan: number;
}
export interface Album {
    id: number;
    title: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    tracks: {
        data: SearchResult[];
    };
}