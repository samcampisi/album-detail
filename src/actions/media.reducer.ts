import { Reducer } from 'redux';
import { MediaState, initialMediaState } from './media.state';
import {
  MediaActions,
  MediaActionTypes,
  FetchAlbumsSuccess,
  FetchAlbumsFailure,
  FetchPhotosByAlbumSuccess,
  FetchPhotosByAlbumFailure,
} from './media.actions';
import { Album } from 'actions/types';

export const mediaReducer: Reducer<MediaState, MediaActions> = (
  state: MediaState = initialMediaState,
  action: MediaActions,
): MediaState => {
  switch (action.type) {
    case MediaActionTypes.FETCH_ALBUMS:
      return {
        ...state,
        isLoadingAlbums: true,
        error: undefined,
      };
    case MediaActionTypes.FETCH_ALBUMS_SUCCESS: {
      action = action as FetchAlbumsSuccess;
      const albums = new Map(state.albums);
      action.payload.albums.forEach((album: Album) => {
        const albumEntry = albums.get(album.id);
        albums.set(album.id, { ...albumEntry, album });
      });
      return {
        ...state,
        isLoadingAlbums: false,
        albums,
        error: undefined,
      };
    }
    case MediaActionTypes.FETCH_ALBUMS_FAILURE:
      action = action as FetchAlbumsFailure;
      return {
        ...state,
        isLoadingAlbums: false,
        error: action.payload.error,
      };
    case MediaActionTypes.FETCH_PHOTOS_BY_ALBUM:
      return {
        ...state,
        isLoadingPhotos: true,
        error: undefined,
      };
    case MediaActionTypes.FETCH_PHOTOS_BY_ALBUM_SUCCESS: {
      action = action as FetchPhotosByAlbumSuccess;
      const albums = new Map(state.albums);
      const albumEntry = albums.get(action.payload.albumId);
      if (albumEntry) {
        albums.set(action.payload.albumId, {
          ...albumEntry,
          photos: action.payload.photos,
        });
      }
      return {
        ...state,
        isLoadingPhotos: false,
        albums,
        error: undefined,
      };
    }
    case MediaActionTypes.FETCH_PHOTOS_BY_ALBUM_FAILURE:
      action = action as FetchPhotosByAlbumFailure;
      return {
        ...state,
        isLoadingPhotos: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
