import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import { Photo } from 'actions/types';
import styles from 'styles/CarouselItem.style';

export interface CarouselItemProps {
  photo: Photo;
  onPress: (photo: Photo) => void;
}

const CarouselItem = (props: CarouselItemProps): JSX.Element | null => {
  const { photo, onPress } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onPress(photo);
        }}>
        <CachedImage
          source={{ uri: photo.url }}
          style={styles.image}
          defaultSource={require('../../assets/image-placeholder.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.title}>{photo.title.toUpperCase()}</Text>
    </View>
  );
};

export default CarouselItem;
