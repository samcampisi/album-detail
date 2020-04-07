import { Navigation } from 'react-native-navigation';
import App from 'screens/HomeScreen';

export default class NavigationManager {
  private static registerScreens() {
    Navigation.registerComponent('albums.HomeScreen', () => App);
  }

  static setup() {
    this.registerScreens();
    Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: 'albums.HomeScreen',
                  options: {
                    topBar: {
                      visible: false,
                    },
                  },
                },
              },
            ],
          },
        },
      });
    });
  }
}
