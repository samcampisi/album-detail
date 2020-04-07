import { Reducer } from 'redux';
import { MediaState, initialMediaState } from './media.state';
import {
  MediaActions,
  MediaActionTypes,
  FetchAlbumsSuccess,
  FetchAlbumsFailure,
} from './media.actions';

export const mediaReducer: Reducer<MediaState, MediaActions> = (
  state: MediaState = initialMediaState,
  action: MediaActions,
): MediaState => {
  switch (action.type) {
    case MediaActionTypes.FETCH_ALBUMS:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case MediaActionTypes.FETCH_ALBUMS_SUCCESS:
      action = action as FetchAlbumsSuccess;
      return {
        ...state,
        isLoading: false,
        error: undefined,
      };
    case MediaActionTypes.FETCH_ALBUMS_FAILURE:
      action = action as FetchAlbumsFailure;
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
