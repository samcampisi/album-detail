import { NativeModules, Image } from 'react-native';

NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};

jest.mock('react-native-cached-image', () => {
  return {
    CachedImage: () => 'CachedImage',
  };
});

jest.useFakeTimers();
