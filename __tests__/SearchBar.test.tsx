import React from 'react';
import SearchBar, { SearchBarProps } from '../src/components/views/SearchBar';
import TestUtils from './TestUtils';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';

describe('SearchBarComponent', () => {
  let props: SearchBarProps;
  const wrapper = () => {
    return TestUtils.shallowRender(<SearchBar {...props} />);
  };

  let onCancelPressMock: jest.Mock;
  let onTextChangeMock: jest.Mock;

  beforeEach(() => {
    onCancelPressMock = jest.fn();
    onTextChangeMock = jest.fn();
    props = {
      onCancelPress: onCancelPressMock,
      onTextChange: onTextChangeMock,
      style: null,
    };
    TestUtils.reset();
  });

  it('Component is rendered', () => {
    // When
    const comp = wrapper();
    const container = comp.find(View);
    const textInput = comp.find(TextInput);
    const image = comp.find(Image);

    // Then
    expect(comp.exists()).toBe(true);
    expect(container.exists()).toBe(true);
    expect(textInput.exists()).toBe(true);
    expect(image.exists()).toBe(true);
  });

  it('onTextChange() is called when text changes and onTextChange prop is defined', () => {
    // When
    const textInput = wrapper().find(TextInput);
    textInput.simulate('changeText', 'Hello World');

    // Then
    setTimeout(() => {
      expect(onTextChangeMock).toHaveBeenCalledWith('Hello World');
    }, 50);
  });

  it('onTextChange() is not called when text changes and onTextChange prop is undefined', () => {
    // Given
    props.onTextChange = undefined;

    // When
    const textInput = wrapper().find(TextInput);
    textInput.simulate('changeText', 'Hello World');

    // Then
    setTimeout(() => {
      expect(onTextChangeMock).not.toHaveBeenCalled();
    }, 50);
  });

  it('Cancel button is not displayed when there is no query', () => {
    // When
    const touchableOpacity = wrapper().find(TouchableOpacity);

    // Then
    expect(touchableOpacity.exists()).toBe(false);
  });

  it('onCancelPress() is called when clicking on close button and onCancelPress prop is defined', () => {
    // When
    const textInput = wrapper().find(TextInput);
    textInput.simulate('changeText', 'Hello World');
    const touchableOpacity = wrapper().find(TouchableOpacity);
    touchableOpacity.simulate('click');

    // Then
    setTimeout(() => {
      expect(onCancelPressMock).toHaveBeenCalled();
    }, 50);
  });

  it('onCancelPress() is not called when clicking on close button and onCancelPress prop is undefined', () => {
    // Given
    props.onCancelPress = undefined;

    // When
    const textInput = wrapper().find(TextInput);
    textInput.simulate('changeText', 'Hello World');
    const touchableOpacity = wrapper().find(TouchableOpacity);
    touchableOpacity.simulate('click');

    // Then
    setTimeout(() => {
      expect(onCancelPressMock).not.toHaveBeenCalled();
    }, 50);
  });
});
