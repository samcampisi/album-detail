import { createTransform } from 'redux-persist';

const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    let value = [];
    if (inboundState.albums) {
      value = JSON.stringify(Array.from(inboundState.albums.entries()));
    }
    return {
      ...inboundState,
      albums: value,
    };
  },
  // transform state being rehydrated
  (outboundState, key) => {
    return {
      ...outboundState,
      albums: new Map(JSON.parse(outboundState.albums)),
    };
  },
);

export default SetTransform;
