type Genre = {
    name: string;
    id: string;
  }
  
export type Episode = {
    country: string;
    episodeUrl: string;
    closedCaptioning: string;
    collectionId: number;
    collectionName: string;
    artistIds: number[];
    episodeFileExtension: string;
    episodeContentType: string;
    artworkUrl160: string;
    genres: Genre[];
    episodeGuid: string;
    description: string;
    artworkUrl60: string;
    artistViewUrl: string;
    contentAdvisoryRating: string;
    releaseDate: string;
    trackId: number;
    trackName: string;
    feedUrl: string;
    trackViewUrl: string;
    artworkUrl600: string;
    trackTimeMillis: number;
    collectionViewUrl: string;
    previewUrl: string;
    shortDescription: string;
    kind: string;
    wrapperType: string;
  }