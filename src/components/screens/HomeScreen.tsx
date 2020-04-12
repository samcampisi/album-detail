import React, { Component } from 'react';
import {
  StatusBar,
  View,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from 'react-native';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { MediaState } from '../../actions/media.state';
import {
  MediaActions,
  getAlbums,
  ITEMS_PER_PAGE,
} from '../../actions/media.actions';
import { ApplicationState } from 'utils/app.reducer';
import { AlbumEntry } from 'actions/types';
import Router from 'utils/Router';
import Spinner from '../views/Spinner';
import AlbumItem from '../views/AlbumItem';
import SearchBar from '../views/SearchBar';
import styles from 'styles/HomeScreen.style';

interface HomeProps {
  componentId: string;
  getAlbums: (_start?: number) => void;
  isLoadingAlbums: boolean;
  albums: Map<number, AlbumEntry>;
  noMoreAlbums: boolean;
}

interface HomeState {
  data: AlbumEntry[];
  fullList: AlbumEntry[];
  checkpointIndex: number;
}

interface DispatchProps {
  getAlbums: (_start?: number) => void;
}

export class App extends Component<HomeProps, HomeState> {
  static getDerivedStateFromProps(nextProps: HomeProps, prevState: HomeState) {
    const newList = Array.from(nextProps.albums.values());
    if (JSON.stringify(newList) !== JSON.stringify(prevState.fullList)) {
      return {
        fullList: newList,
        data: newList,
      };
    }
    return null;
  }

  constructor(props: HomeProps) {
    super(props);
    this.state = {
      data: Array.from(props.albums.values()),
      fullList: Array.from(props.albums.values()),
      checkpointIndex: 0,
    };
    this.fetchAlbums(0);
  }

  onAlbumPress = (item: AlbumEntry) => {
    Router.goToPhotoListScreen(this.props.componentId, item.album);
  };

  fetchAlbums = (_start: number) => {
    this.props.getAlbums(_start);
  };

  fetchMore = () => {
    if (!this.props.noMoreAlbums && this.state.data.length >= ITEMS_PER_PAGE) {
      const newCheckpoint = this.state.checkpointIndex + ITEMS_PER_PAGE;
      this.setState({ checkpointIndex: newCheckpoint });
      this.fetchAlbums(newCheckpoint + 1);
    }
  };

  extractKey = (item: AlbumEntry) => item.album.id.toString();

  searchFilterFunction = (text: string) => {
    const newData = this.state.fullList.filter((item: AlbumEntry) => {
      return item.album.title.toLowerCase().includes(text.toLowerCase());
    });
    this.setState({
      data: newData,
    });
  };

  renderItem = (info: ListRenderItemInfo<AlbumEntry>) => {
    return (
      <AlbumItem
        albumEntry={info.item}
        onPress={this.onAlbumPress}
        style={
          this.state.data.length > 1 &&
          (info.index % 2 ? styles.paddingRight : styles.paddingLeft)
        }
      />
    );
  };

  renderSearchBar = () => {
    return (
      <SearchBar
        onTextChange={(query: string) => {
          this.searchFilterFunction(query);
        }}
        onCancelPress={() => {
          this.setState({ data: this.state.fullList });
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" />
        {this.props.isLoadingAlbums && !this.state.data.length ? (
          <Spinner fill />
        ) : (
          <View style={styles.mainContainer}>
            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={this.extractKey}
              numColumns={2}
              removeClippedSubviews
              refreshControl={
                <RefreshControl
                  tintColor="#ffffff"
                  refreshing={
                    this.props.isLoadingAlbums &&
                    Boolean(this.state.data.length)
                  }
                  onRefresh={() => {
                    this.fetchAlbums(0);
                  }}
                />
              }
              onEndReached={this.fetchMore}
              onEndReachedThreshold={0.15}
              ListHeaderComponent={this.renderSearchBar}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ media }: ApplicationState): MediaState => ({
  isLoadingAlbums: media.isLoadingAlbums,
  albums: media.albums,
  error: media.error,
  noMoreAlbums: media.noMoreAlbums,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<MediaState, undefined, MediaActions>,
): DispatchProps => ({
  getAlbums: (_start?: number) => dispatch(getAlbums(_start)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
