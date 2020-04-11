import React, { Component } from 'react';
import { StatusBar, View, FlatList, ListRenderItemInfo } from 'react-native';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { MediaState } from '../../actions/media.state';
import { MediaActions, getAlbums } from '../../actions/media.actions';
import { ApplicationState } from 'utils/app.reducer';
import { AlbumEntry } from 'actions/types';
import Router from 'utils/Router';
import Spinner from '../views/Spinner';
import AlbumItem from '../views/AlbumItem';
import styles from 'styles/HomeScreen.style';

interface HomeProps {
  componentId: string;
  getAlbums: () => void;
  isLoading: boolean;
  albums: Map<number, AlbumEntry>;
}

interface HomeState {
  data: AlbumEntry[];
  fullList: AlbumEntry[];
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

  onAlbumPress = (item: AlbumEntry) => {
    Router.goToPhotoListScreen(this.props.componentId, item.album.id);
  };

  extractKey = (item: AlbumEntry) => item.album.id.toString();

  renderItem = (info: ListRenderItemInfo<AlbumEntry>) => {
    return (
      <AlbumItem
        albumEntry={info.item}
        onPress={this.onAlbumPress}
        style={info.index % 2 ? styles.paddingRight : styles.paddingLeft}
      />
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" />
        {this.props.isLoading && !this.state.data.length ? (
          <Spinner fill />
        ) : (
          <View style={styles.mainContainer}>
            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={this.extractKey}
              numColumns={2}
            />
          </View>
        )}
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
