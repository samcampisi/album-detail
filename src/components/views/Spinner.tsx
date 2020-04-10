import React from 'react';
import { ActivityIndicator, View, StyleProp, ViewStyle } from 'react-native';
import styles from 'styles/Spinner.style';

export interface SpinnerProps {
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  color?: string;
  size?: number | 'small' | 'large' | undefined;
}

const Spinner = (props: SpinnerProps) => {
  const { fill, style, color, size } = props;

  return (
    <View style={[fill && styles.fill, style]}>
      <ActivityIndicator color={color || '#ffffff'} size={size || 'large'} />
    </View>
  );
};

export default Spinner;
