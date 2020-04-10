import { Navigation, Options } from 'react-native-navigation';
import App from 'screens/HomeScreen';
import PhotoList from 'screens/PhotoListScreen';
import PhotoDetail from 'screens/PhotoDetailScreen';
import { Store } from 'redux';
import { ApplicationState } from 'utils/app.reducer';
import configureStore from 'utils/store';
import { Provider } from 'react-redux';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

export default class NavigationManager {
  private static store: Store<ApplicationState>;

  private static registerScreens() {
    Navigation.registerComponentWithRedux(
      'albums.HomeScreen',
      () => gestureHandlerRootHOC(App),
      Provider,
      this.store,
    );
    Navigation.registerComponentWithRedux(
      'albums.PhotoListScreen',
      () => gestureHandlerRootHOC(PhotoList),
      Provider,
      this.store,
    );
    Navigation.registerComponent('albums.PhotoDetailScreen', () =>
      gestureHandlerRootHOC(PhotoDetail),
    );
  }

  static setup() {
    this.store = configureStore();
    this.registerScreens();
    Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setDefaultOptions(navDefaultOptions);

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

export const navDefaultOptions: Options = {
  statusBar: {
    backgroundColor: '#000000',
    style: 'dark',
  },
  layout: {
    orientation: ['portrait'],
    backgroundColor: '#242322',
  },
  topBar: {
    backButton: {
      color: '#ffffff',
      showTitle: true,
    },
    // @ts-ignore
    buttonColor: '#ffffff',
    noBorder: true,
    elevation: 0,
    title: {
      color: '#ffffff',
      fontWeight: 'bold',
      alignment: 'center',
    },
    background: {
      color: '#242322',
    },
  },
};
