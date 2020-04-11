import React, { useState } from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import styles from 'styles/SearchBar.style';

export interface SearchBarProps {
  onCancelPress?: () => void;
  onTextChange?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
}

const SearchBar = (props: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const onChangeText = (text: string) => {
    setQuery(text);
    if (props.onTextChange) {
      props.onTextChange(text);
    }
  };

  const onCancelPress = () => {
    if (props.onCancelPress) {
      setQuery('');
      props.onCancelPress();
    }
  };

  const renderClose = () => {
    if (query.length) {
      return (
        <TouchableOpacity
          onPress={onCancelPress}
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }}>
          <Image
            style={styles.cancelIcon}
            source={require('../../assets/cancel.png')}
          />
        </TouchableOpacity>
      );
    }
    return <View />;
  };

  const renderContent = () => (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../assets/search-icon.png')}
          style={styles.searchIcon}
        />
        <TextInput
          value={query}
          onChangeText={onChangeText}
          underlineColorAndroid="transparent"
          style={styles.text}
          autoCorrect={false}
          placeholder="Search..."
          enablesReturnKeyAutomatically
          selectTextOnFocus
          placeholderTextColor={styles.placeholderTextColor.color}
        />
        {renderClose()}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, props.style]}>
      {renderContent()}
    </SafeAreaView>
  );
};

export default SearchBar;
