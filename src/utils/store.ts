import {
  Store,
  createStore,
  applyMiddleware,
  Middleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { ApplicationState, reducers } from './app.reducer';
import SetTransform from './SetTransform';

let middlewares: Middleware[] = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [SetTransform],
  stateReconciler: autoMergeLevel2,
};

const pReducer = persistReducer(persistConfig, reducers);

if (__DEV__) {
  const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
  middlewares = [...middlewares, reduxImmutableStateInvariant, logger];
} else {
  middlewares = [...middlewares];
}

export default function configureStore(
  initialState?: ApplicationState,
): Store<ApplicationState> {
  let store;
  if (__DEV__) {
    const reactotron = require('./reactotron.config').default;
    store = createStore(
      pReducer,
      initialState,
      compose(applyMiddleware(...middlewares), reactotron.createEnhancer()),
    );
    return store;
  }
  store = createStore(pReducer, initialState, applyMiddleware(...middlewares));
  return store;
}
