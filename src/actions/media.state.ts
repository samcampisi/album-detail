import { AlbumEntry } from './types';

export interface MediaState {
  isLoadingAlbums?: boolean;
  isLoadingPhotos?: boolean;
  error?: any;
  albums: Map<number, AlbumEntry>;
}

export const initialMediaState: MediaState = {
  isLoadingAlbums: false,
  isLoadingPhotos: false,
  albums: new Map(),
};
