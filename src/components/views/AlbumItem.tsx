import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import { AlbumEntry } from 'actions/types';
import styles from 'styles/AlbumItem.style';

export interface AlbumItemProps {
  albumEntry: AlbumEntry;
  onPress: (albumEntry: AlbumEntry) => void;
  style?: StyleProp<ViewStyle>;
}

const AlbumItem = (props: AlbumItemProps): JSX.Element | null => {
  const { albumEntry, onPress, style } = props;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
          {albumEntry.album.title.toUpperCase()}
        </Text>

        <TouchableOpacity
          onPress={() => {
            onPress(albumEntry);
          }}>
          {albumEntry.photos && albumEntry.photos[0] ? (
            <CachedImage
              source={{ uri: albumEntry.photos[0].thumbnailUrl }}
              style={styles.image}
              resizeMode="contain"
              defaultSource={require('../../assets/image-placeholder.png')}
            />
          ) : (
            <Image
              source={require('../../assets/image-placeholder.png')}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlbumItem;
