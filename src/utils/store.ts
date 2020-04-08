import {
  Store,
  createStore,
  applyMiddleware,
  Middleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { ApplicationState, reducers } from './app.reducer';

let middlewares: Middleware[] = [thunk];

if (__DEV__) {
  const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
  middlewares = [...middlewares, reduxImmutableStateInvariant, logger];
} else {
  middlewares = [...middlewares];
}

export default function configureStore(
  initialState?: ApplicationState,
): Store<ApplicationState> {
  if (__DEV__) {
    const reactotron = require('./reactotron.config').default;
    return createStore(
      reducers,
      initialState,
      compose(applyMiddleware(...middlewares), reactotron.createEnhancer()),
    );
  }
  return createStore(reducers, initialState, applyMiddleware(...middlewares));
}
