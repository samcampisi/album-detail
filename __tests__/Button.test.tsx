import React from 'react';
import Button, { ButtonProps } from '../src/components/views/Button';
import TestUtils from './TestUtils';
import { Text, TouchableOpacity, Image } from 'react-native';

describe('ButtonComponent', () => {
  let props: ButtonProps;
  const wrapper = () => {
    return TestUtils.shallowRender(<Button {...props} />);
  };

  beforeEach(() => {
    props = {
      title: 'Button title',
    };
    TestUtils.reset();
  });

  it('Button from props is correctly displayed', () => {
    const touchable = wrapper().find(Text).prop('children');
    const image = wrapper().find(Image);

    expect(image.exists()).toBe(false);
    expect(touchable).toEqual(props.title);
  });

  it('Button is enabled by default', () => {
    const isButtonDisabled = wrapper().find(TouchableOpacity).prop('disabled');
    expect(isButtonDisabled).toBe(undefined);
  });

  it("Button is disabled if 'disabled' prop is true", () => {
    props.disabled = true;
    const isButtonDisabled = wrapper().find(TouchableOpacity).prop('disabled');
    expect(isButtonDisabled).toBe(true);
  });

  it('Button shows image when it has been provided', () => {
    props.icon = require('../src/assets/carousel-icon.png');
    const image = wrapper().find(Image);
    expect(image.exists()).toBe(true);
  });
});
