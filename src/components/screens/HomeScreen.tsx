/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar, Text, View, FlatList } from 'react-native';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { MediaState } from '../../actions/media.state';
import { MediaActions, getAlbums } from '../../actions/media.actions';
import { ApplicationState } from 'utils/app.reducer';
import { Album } from 'actions/types';

interface HomeProps {
  componentId: string;
  getAlbums: () => void;
  isLoading: boolean;
  albums: Map<number, Album>;
}

interface HomeState {
  data: Album[];
  fullList: Album[];
}

interface DispatchProps {
  getAlbums: () => void;
}

export class App extends Component<HomeProps, HomeState> {
  static getDerivedStateFromProps(nextProps: HomeProps, prevState: HomeState) {
    const newList = Array.from(nextProps.albums.values());
    if (newList !== prevState.fullList) {
      return {
        fullList: newList,
        data: !prevState.data.length ? newList : prevState.data,
      };
    }
    return null;
  }

  constructor(props: HomeProps) {
    super(props);
    this.state = {
      data: Array.from(props.albums.values()),
      fullList: Array.from(props.albums.values()),
    };
    this.props.getAlbums();
  }

  extractKey = (item: Album) => item.id.toString();

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <Text>Hello world</Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <Text>{item.title}</Text>}
          keyExtractor={this.extractKey}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ media }: ApplicationState): MediaState => ({
  isLoading: media.isLoading,
  albums: media.albums,
  error: media.error,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<MediaState, undefined, MediaActions>,
): DispatchProps => ({
  getAlbums: () => dispatch(getAlbums()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
