import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { Photo } from 'actions/types';
import styles from 'styles/PhotoListItem.style';

export interface PhotoListItemProps {
  photo: Photo;
  onPress: (photo: Photo) => void;
}

const PhotoListItem = (props: PhotoListItemProps): JSX.Element | null => {
  const { photo, onPress } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onPress(photo);
        }}>
        <Image
          source={{ uri: photo.thumbnailUrl }}
          style={styles.image}
          resizeMode="contain"
          defaultSource={require('../../assets/image-placeholder.png')}
        />
      </TouchableOpacity>

      <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
        {photo.title}
      </Text>
    </View>
  );
};

export default PhotoListItem;
