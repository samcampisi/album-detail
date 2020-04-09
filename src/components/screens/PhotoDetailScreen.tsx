import React from 'react';
import {
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Photo } from 'actions/types';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

interface PhotoDetailProps {
  componentId: string;
  photo: Photo;
}

const PhotoDetail = (props: PhotoDetailProps): JSX.Element | null => {
  const { photo, componentId } = props;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  let scale = new Animated.Value(1);

  const onZoomEvent = Animated.event(
    [
      {
        nativeEvent: { scale: scale },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const onZoomStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const onCancelPress = () => {
    Navigation.dismissModal(componentId);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={onCancelPress}>
        <Image source={require('../../assets/cancel.png')} />
      </TouchableOpacity>
      <PinchGestureHandler
        onGestureEvent={onZoomEvent}
        onHandlerStateChange={(event) => onZoomStateChange(event)}>
        <Animated.Image
          source={{
            uri: photo.url,
          }}
          style={{
            width: screenWidth,
            height: screenHeight,
            transform: [{ scale: scale }],
          }}
          resizeMode="contain"
        />
      </PinchGestureHandler>
    </SafeAreaView>
  );
};

export default PhotoDetail;
