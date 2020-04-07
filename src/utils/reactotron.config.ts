import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure({
  name: 'rn-ts-starter',
  host: 'localhost',
})
  .useReactNative()
  .use(reactotronRedux())
  .connect();

export default reactotron;
