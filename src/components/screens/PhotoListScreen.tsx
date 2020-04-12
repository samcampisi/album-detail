import React, { Component } from 'react';
import {
  View,
  ListRenderItemInfo,
  FlatList,
  RefreshControl,
} from 'react-native';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { MediaState } from '../../actions/media.state';
import { MediaActions, getPhotosByAlbum } from '../../actions/media.actions';
import { ApplicationState } from 'utils/app.reducer';
import { AlbumEntry, Photo } from 'actions/types';
import Router from 'utils/Router';
import { itemWidth, sliderWidth } from 'styles/CarouselItem.style';
import CarouselItem from '../views/CarouselItem';
import PhotoListItem from '../views/PhotoListItem';
import Button from '../views/Button';
import Spinner from '../views/Spinner';
import styles from 'styles/PhotoListScreen.style';

interface PhotoListProps {
  componentId: string;
  getPhotosByAlbum: (albumId: number) => void;
  albumId: number;
  isLoadingPhotos: boolean;
  albums: Map<number, AlbumEntry>;
}

interface PhotoListState {
  data: Photo[];
  listLayout: Boolean;
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
      listLayout: true,
    };
  }

  componentDidMount() {
    this.getPhotosByAlbum();
  }

  onPhotoPress = (item: Photo) => {
    Router.goToPhotoDetailScreen(item);
  };

  onToggleLayout = () => {
    this.setState({ listLayout: !this.state.listLayout });
  };

  getPhotosByAlbum = () => {
    this.props.getPhotosByAlbum(this.props.albumId);
  };

  extractKey = (item: Photo) => item.id.toString();

  renderCarouselItem = (info: ListRenderItemInfo<Photo>) => {
    return <CarouselItem photo={info.item} onPress={this.onPhotoPress} />;
  };

  renderListItem = (info: ListRenderItemInfo<Photo>) => {
    return <PhotoListItem photo={info.item} onPress={this.onPhotoPress} />;
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.isLoadingPhotos && !this.state.data.length ? (
          <Spinner fill />
        ) : (
          <View style={styles.mainContainer}>
            <Button
              title={`Display as ${
                this.state.listLayout ? 'carousel' : 'list'
              }`}
              onPress={this.onToggleLayout}
              icon={
                this.state.listLayout
                  ? require('../../assets/carousel-icon.png')
                  : require('../../assets/list-icon.png')
              }
            />
            {this.state.listLayout ? (
              <FlatList
                data={this.state.data}
                renderItem={this.renderListItem}
                keyExtractor={this.extractKey}
                numColumns={3}
                removeClippedSubviews
                refreshControl={
                  <RefreshControl
                    tintColor="#ffffff"
                    refreshing={
                      this.props.isLoadingPhotos &&
                      Boolean(this.state.data.length)
                    }
                    onRefresh={this.getPhotosByAlbum}
                  />
                }
              />
            ) : (
              <Carousel
                data={this.state.data}
                renderItem={this.renderCarouselItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                containerCustomStyle={styles.carousel}
                contentContainerCustomStyle={styles.carouselContent}
                layout="tinder"
                loop={true}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ media }: ApplicationState): MediaState => ({
  isLoadingPhotos: media.isLoadingPhotos,
  albums: media.albums,
  error: media.error,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<MediaState, undefined, MediaActions>,
): DispatchProps => ({
  getPhotosByAlbum: (albumId: number) => dispatch(getPhotosByAlbum(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList);
