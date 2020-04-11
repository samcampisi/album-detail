import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { MediaState } from './media.state';
import ApiService from 'api/ApiService';
import { AxiosResponse } from 'axios';
import { Album, Photo } from './types';

export enum MediaActionTypes {
  FETCH_ALBUMS = 'FETCH_ALBUMS',
  FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS',
  FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE',
  FETCH_PHOTOS_BY_ALBUM = 'FETCH_PHOTOS_BY_ALBUM',
  FETCH_PHOTOS_BY_ALBUM_SUCCESS = 'FETCH_PHOTOS_BY_ALBUM_SUCCESS',
  FETCH_PHOTOS_BY_ALBUM_FAILURE = 'FETCH_PHOTOS_BY_ALBUM_FAILURE',
  FETCH_PHOTO_BY_ID = 'FETCH_PHOTO_BY_ID',
  FETCH_PHOTO_BY_ID_SUCCESS = 'FETCH_PHOTO_BY_ID_SUCCESS',
  FETCH_PHOTO_BY_ID_FAILURE = 'FETCH_PHOTO_BY_ID_FAILURE',
}

export interface FetchAlbumsRequest extends Action {
  type: MediaActionTypes.FETCH_ALBUMS;
}

export interface FetchAlbumsSuccess extends Action {
  type: MediaActionTypes.FETCH_ALBUMS_SUCCESS;
  payload: { albums: Album[] };
}

export interface FetchAlbumsFailure extends Action {
  type: MediaActionTypes.FETCH_ALBUMS_FAILURE;
  payload: { error: any };
}

export interface FetchPhotosByAlbumRequest extends Action {
  type: MediaActionTypes.FETCH_PHOTOS_BY_ALBUM;
}

export interface FetchPhotosByAlbumSuccess extends Action {
  type: MediaActionTypes.FETCH_PHOTOS_BY_ALBUM_SUCCESS;
  payload: {
    albumId: number;
    photos: Photo[];
  };
}

export interface FetchPhotosByAlbumFailure extends Action {
  type: MediaActionTypes.FETCH_PHOTOS_BY_ALBUM_FAILURE;
  payload: { error: any };
}

export interface FetchPhotoByIdRequest extends Action {
  type: MediaActionTypes.FETCH_PHOTO_BY_ID;
}

export interface FetchPhotoByIdSuccess extends Action {
  type: MediaActionTypes.FETCH_PHOTO_BY_ID_SUCCESS;
  payload: { photo: Photo };
}

export interface FetchPhotoByIdFailure extends Action {
  type: MediaActionTypes.FETCH_PHOTO_BY_ID_FAILURE;
  payload: { error: any };
}

export type MediaActions =
  | FetchAlbumsRequest
  | FetchAlbumsSuccess
  | FetchAlbumsFailure
  | FetchPhotosByAlbumRequest
  | FetchPhotosByAlbumSuccess
  | FetchPhotosByAlbumFailure
  | FetchPhotoByIdRequest
  | FetchPhotoByIdSuccess
  | FetchPhotoByIdFailure;

type ThunkResult = ThunkAction<void, MediaState, undefined, MediaActions>;

export const ITEMS_PER_PAGE = 20;

export const getAlbums = (_start?: number): ThunkResult => {
  return async (
    dispatch: ThunkDispatch<MediaState, undefined, MediaActions>,
  ) => {
    dispatch(getAlbumsRequest());
    return ApiService.getInstance()
      .getClient()
      .get('albums', { params: { _start, _limit: ITEMS_PER_PAGE } })
      .then((response: AxiosResponse<Album[]>) => {
        dispatch(getAlbumsSuccess(response.data));
        response.data.forEach((album) => {
          dispatch(getPhotosByAlbum(album.id, 0, 1)); // only bring the first photo
        });
      })
      .catch((error: any) => dispatch(getAlbumsFailure(error)));
  };
};

export const getAlbumsRequest = (): MediaActions => ({
  type: MediaActionTypes.FETCH_ALBUMS,
});

export const getAlbumsSuccess = (albums: Album[]): MediaActions => ({
  type: MediaActionTypes.FETCH_ALBUMS_SUCCESS,
  payload: { albums },
});

export const getAlbumsFailure = (error: any): MediaActions => ({
  type: MediaActionTypes.FETCH_ALBUMS_FAILURE,
  payload: { error },
});

export const getPhotosByAlbum = (
  albumId: number,
  _start?: number,
  _limit?: number,
): ThunkResult => {
  return async (
    dispatch: ThunkDispatch<MediaState, undefined, MediaActions>,
  ) => {
    dispatch(getPhotosByAlbumRequest());
    return ApiService.getInstance()
      .getClient()
      .get('photos', { params: { albumId, _start, _limit } })
      .then((response: AxiosResponse<Photo[]>) =>
        dispatch(getPhotosByAlbumSuccess(albumId, response.data)),
      )
      .catch((error: any) => dispatch(getPhotosByAlbumFailure(error)));
  };
};

export const getPhotosByAlbumRequest = (): MediaActions => ({
  type: MediaActionTypes.FETCH_PHOTOS_BY_ALBUM,
});

export const getPhotosByAlbumSuccess = (
  albumId: number,
  photos: Photo[],
): MediaActions => ({
  type: MediaActionTypes.FETCH_PHOTOS_BY_ALBUM_SUCCESS,
  payload: { albumId, photos },
});

export const getPhotosByAlbumFailure = (error: any): MediaActions => ({
  type: MediaActionTypes.FETCH_PHOTOS_BY_ALBUM_FAILURE,
  payload: { error },
});

export const getPhotoById = (photoId: number): ThunkResult => {
  return async (
    dispatch: ThunkDispatch<MediaState, undefined, MediaActions>,
  ) => {
    dispatch(getPhotoByIdRequest());
    return ApiService.getInstance()
      .getClient()
      .get(`photos/${photoId}`)
      .then((response: AxiosResponse<Photo>) =>
        dispatch(getPhotoByIdSuccess(response.data)),
      )
      .catch((error: any) => dispatch(getPhotoByIdFailure(error)));
  };
};

export const getPhotoByIdRequest = (): MediaActions => ({
  type: MediaActionTypes.FETCH_PHOTO_BY_ID,
});

export const getPhotoByIdSuccess = (photo: Photo): MediaActions => ({
  type: MediaActionTypes.FETCH_PHOTO_BY_ID_SUCCESS,
  payload: { photo },
});

export const getPhotoByIdFailure = (error: any): MediaActions => ({
  type: MediaActionTypes.FETCH_PHOTO_BY_ID_FAILURE,
  payload: { error },
});
