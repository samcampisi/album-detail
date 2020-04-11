import {
  getAlbumsRequest,
  getAlbumsSuccess,
  getAlbumsFailure,
  getPhotosByAlbumRequest,
  getPhotosByAlbumSuccess,
  getPhotosByAlbumFailure,
  MediaActions,
} from '../src/actions/media.actions';
import { MediaState } from '../src/actions/media.state';
import { mediaReducer } from '../src/actions/media.reducer';

const album1 = {
  id: 1,
  title: 'Album 1',
  userId: 1,
};

const album2 = {
  id: 2,
  title: 'Album 2',
  userId: 1,
};

const photo1 = {
  albumId: 1,
  id: 1,
  title: 'Photo 1',
  url:
    'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg',
  thumbnailUrl:
    'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg',
};

const rawAlbums = [album1, album2];
const rawPhotos = [photo1];

const albumsWithoutPhotos = new Map([
  [
    1,
    {
      album: album1,
    },
  ],
  [
    2,
    {
      album: album2,
    },
  ],
]);

const albumsWithPhotos = new Map([
  [
    1,
    {
      album: album1,
      photos: [photo1],
    },
  ],
  [
    2,
    {
      album: album2,
    },
  ],
]);

const error = { status: 500 };

const initialState = {
  isLoadingAlbums: false,
  isLoadingPhotos: false,
  error: undefined,
  albums: new Map(),
  noMoreAlbums: false,
};

describe('media.reducer', () => {
  it('Returns the correct state when no state is passed and action is FETCH_ALBUMS', () => {
    // Given
    const action: MediaActions = getAlbumsRequest();
    const expectedState: MediaState = {
      ...initialState,
      isLoadingAlbums: true,
    };

    // When
    const reduced = mediaReducer(undefined, action);

    // Then
    expect(reduced).toEqual(expectedState);
  });
  it('Returns the correct state when action is FETCH_ALBUMS_SUCCESS', () => {
    // Given
    const action: MediaActions = getAlbumsSuccess(rawAlbums);
    const expectedState: MediaState = {
      ...initialState,
      isLoadingAlbums: false,
      albums: albumsWithoutPhotos,
    };

    // When
    const reduced = mediaReducer(initialState, action);

    // Then
    expect(reduced).toEqual(expectedState);
  });
  it('Returns the correct state when action is FETCH_ALBUMS_FAILURE', () => {
    // Given
    const action: MediaActions = getAlbumsFailure(error);
    const expectedState: MediaState = {
      ...initialState,
      isLoadingAlbums: false,
      error,
    };

    // When
    const reduced = mediaReducer(initialState, action);

    // Then
    expect(reduced).toEqual(expectedState);
  });
  it('Returns the correct state when action is FETCH_PHOTOS_BY_ALBUM', () => {
    // Given
    const action: MediaActions = getPhotosByAlbumRequest();
    const expectedState: MediaState = {
      ...initialState,
      isLoadingPhotos: true,
    };

    // When
    const reduced = mediaReducer(initialState, action);

    // Then
    expect(reduced).toEqual(expectedState);
  });
  it('Returns the correct state when action is FETCH_PHOTOS_BY_ALBUM_SUCCESS', () => {
    // Given
    const action: MediaActions = getPhotosByAlbumSuccess(album1.id, rawPhotos);
    const expectedState: MediaState = {
      ...initialState,
      isLoadingPhotos: false,
      albums: albumsWithPhotos,
    };

    // When
    const reduced = mediaReducer(
      { ...initialState, albums: albumsWithoutPhotos },
      action,
    );

    // Then
    expect(reduced).toEqual(expectedState);
  });
  it('Returns the correct state when action is FETCH_PHOTOS_BY_ALBUM_FAILURE', () => {
    // Given
    const action: MediaActions = getPhotosByAlbumFailure(error);
    const expectedState: MediaState = {
      ...initialState,
      isLoadingPhotos: false,
      error,
    };

    // When
    const reduced = mediaReducer(initialState, action);

    // Then
    expect(reduced).toEqual(expectedState);
  });
});
