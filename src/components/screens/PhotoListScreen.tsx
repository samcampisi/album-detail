import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { MediaState } from '../../actions/media.state';
import { MediaActions, getPhotosByAlbum } from '../../actions/media.actions';
import { ApplicationState } from 'utils/app.reducer';
import { AlbumEntry, Photo } from 'actions/types';
import Router from 'utils/Router';

interface PhotoListProps {
  componentId: string;
  getPhotosByAlbum: (albumId: number) => void;
  albumId: number;
  isLoading: boolean;
  albums: Map<number, AlbumEntry>;
}

interface PhotoListState {
  data: Photo[];
}

interface DispatchProps {
  getPhotosByAlbum: (albumId: number) => void;
}

export class PhotoList extends Component<PhotoListProps, PhotoListState> {
  static getDerivedStateFromProps(
    nextProps: PhotoListProps,
    prevState: PhotoListState,
  ) {
    const albumEntry = nextProps.albums.get(nextProps.albumId);
    const newList = albumEntry && albumEntry.photos ? albumEntry.photos : [];
    if (newList !== prevState.data) {
      return {
        data: newList,
      };
    }
    return null;
  }

  constructor(props: PhotoListProps) {
    super(props);
    const albumEntry = props.albums.get(props.albumId);
    const data = albumEntry && albumEntry.photos ? albumEntry.photos : [];
    this.state = {
      data,
    };
    props.getPhotosByAlbum(props.albumId);
  }

  onPhotoPress = (item: Photo) => {
    Router.goToPhotoDetailScreen(item);
  };

  extractKey = (item: Photo) => item.id.toString();

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Photo List</Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <Text
              onPress={() => {
                this.onPhotoPress(item);
              }}>
              {item.title}
            </Text>
          )}
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
  getPhotosByAlbum: (albumId: number) => dispatch(getPhotosByAlbum(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList);
