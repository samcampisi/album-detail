import {
  Navigation,
  OptionsModalPresentationStyle,
} from 'react-native-navigation';
import { Platform } from 'react-native';
import { Photo } from 'actions/types';

export default class Router {
  static goToPhotoListScreen = (componentId: string, albumId: number) => {
    Navigation.push(componentId, {
      component: {
        name: 'albums.PhotoListScreen',
        passProps: { albumId },
        options: {
          topBar: {
            title: {
              text: 'Photo List',
            },
          },
        },
      },
    });
  };
  static goToPhotoDetailScreen = (photo: Photo) => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'albums.PhotoDetailScreen',
              passProps: { photo },
              options: {
                modalPresentationStyle:
                  Platform.OS === 'android'
                    ? OptionsModalPresentationStyle.none
                    : OptionsModalPresentationStyle.fullScreen,
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    });
  };
}
