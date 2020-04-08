import { Album } from './types';

export interface MediaState {
  isLoading: boolean;
  error?: any;
  albums: Map<number, Album>;
}

export const initialMediaState: MediaState = {
  isLoading: false,
  albums: new Map(),
};
