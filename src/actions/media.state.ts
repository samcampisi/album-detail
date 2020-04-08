import { AlbumEntry } from './types';

export interface MediaState {
  isLoading: boolean;
  error?: any;
  albums: Map<number, AlbumEntry>;
}

export const initialMediaState: MediaState = {
  isLoading: false,
  albums: new Map(),
};
