import { combineReducers } from 'redux';
import { MediaState } from 'actions/media.state';
import { mediaReducer } from 'actions/media.reducer';

export interface ApplicationState {
  media: MediaState;
}

export const reducers = combineReducers<ApplicationState>({
  media: mediaReducer,
});
