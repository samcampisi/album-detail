import React from 'react';
import {
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Text,
  ImagePropertiesSourceOptions,
  Image,
  ImageStyle,
} from 'react-native';
import styles from 'styles/Button.style';

export interface ButtonProps {
  title: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  icon?: ImagePropertiesSourceOptions;
}

const Button = (props: ButtonProps) => {
  const {
    title,
    disabled,
    onPress,
    style,
    textStyle,
    icon,
    imageStyle,
  } = props;

  const onButtonPress = () => {
    !disabled && onPress && onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      disabled={disabled}
      onPress={onButtonPress}>
      {icon && (
        <Image
          source={icon}
          style={[styles.icon, imageStyle]}
          resizeMode="contain"
        />
      )}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
