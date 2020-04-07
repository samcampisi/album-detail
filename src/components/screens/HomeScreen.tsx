/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';

interface HomeProps {
  componentId: string;
}

const App = (props: HomeProps): JSX.Element => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Text>Hello world</Text>
    </View>
  );
};

export default App;
