import { Navigation } from 'react-native-navigation';
import App from 'screens/HomeScreen';
import { Store } from 'redux';
import { ApplicationState } from 'utils/app.reducer';
import configureStore from 'utils/store';
import { Provider } from 'react-redux';

export default class NavigationManager {
  private static store: Store<ApplicationState>;

  private static registerScreens() {
    Navigation.registerComponentWithRedux(
      'albums.HomeScreen',
      () => App,
      Provider,
      this.store,
    );
  }

  static setup() {
    this.store = configureStore();
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
