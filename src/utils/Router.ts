import {
  Navigation,
  OptionsModalPresentationStyle,
} from 'react-native-navigation';
import { Platform } from 'react-native';
import { Photo, Album } from 'actions/types';

export default class Router {
  static goToPhotoListScreen = (componentId: string, album: Album) => {
    Navigation.push(componentId, {
      component: {
        name: 'albums.PhotoListScreen',
        passProps: { albumId: album.id },
        options: {
          topBar: {
            title: {
              text: album.title,
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
