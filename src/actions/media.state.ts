import { AlbumEntry } from './types';

export interface MediaState {
  isLoadingAlbums?: boolean;
  isLoadingPhotos?: boolean;
  error?: any;
  albums: Map<number, AlbumEntry>;
  noMoreAlbums?: boolean;
}

export const initialMediaState: MediaState = {
  isLoadingAlbums: false,
  isLoadingPhotos: false,
  albums: new Map(),
  noMoreAlbums: false,
};
