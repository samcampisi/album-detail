import { Navigation } from 'react-native-navigation';

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
}
