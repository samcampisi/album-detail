import React, { useState } from 'react';
import {
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Photo } from 'actions/types';
import {
  PinchGestureHandler,
  State,
  GestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import styles from 'styles/photoDetailScreen.style';

interface PhotoDetailProps {
  componentId: string;
  photo: Photo;
}

const PhotoDetail = (props: PhotoDetailProps): JSX.Element | null => {
  const { photo, componentId } = props;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  let scale = new Animated.Value(1);

  const [showDetails, setShowDetails] = useState(false);

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

  const onZoomStateChange = (event: GestureHandlerStateChangeEvent) => {
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
    <SafeAreaView style={styles.mainContainer}>
      <TouchableWithoutFeedback
        onPress={() => {
          setShowDetails(!showDetails);
        }}
        style={styles.fill}>
        <View style={styles.fill}>
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

          <TouchableOpacity
            onPress={onCancelPress}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            style={styles.cancelIconContainer}>
            <Image
              source={require('../../assets/cancel.png')}
              style={styles.cancelIcon}
            />
          </TouchableOpacity>

          {showDetails && (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{photo.title}</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PhotoDetail;
