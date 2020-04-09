import React from 'react';
import {
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Photo } from 'actions/types';

interface PhotoDetailProps {
  componentId: string;
  photo: Photo;
}

const PhotoDetail = (props: PhotoDetailProps): JSX.Element | null => {
  const { photo, componentId } = props;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const onCancelPress = () => {
    Navigation.dismissModal(componentId);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={onCancelPress}>
        <Image source={require('../../assets/cancel.png')} />
      </TouchableOpacity>
      <Image
        source={{ uri: photo.url }}
        style={{
          width: screenWidth,
          height: screenHeight,
        }}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export default PhotoDetail;
