import React from 'react';
import Spinner, { SpinnerProps } from '../src/components/views/Spinner';
import TestUtils from './TestUtils';
import { ActivityIndicator, View } from 'react-native';
import styles from '../src/styles/Spinner.style';

describe('SpinnerComponent', () => {
  let props: SpinnerProps;
  const wrapper = () => {
    return TestUtils.shallowRender(<Spinner {...props} />);
  };

  beforeEach(() => {
    props = {};
    TestUtils.reset();
  });

  it('Spinner is correctly displayed by default', () => {
    const view = wrapper().find(View);
    const activityIndicator = wrapper().find(ActivityIndicator);
    const viewStyle = wrapper().find(View).prop('style');
    const color = wrapper().find(ActivityIndicator).prop('color');
    const size = wrapper().find(ActivityIndicator).prop('size');

    expect(view.exists()).toBe(true);
    expect(activityIndicator.exists()).toBe(true);
    expect(viewStyle).toEqual([undefined, undefined]);
    expect(color).toEqual('#ffffff');
    expect(size).toEqual('large');
  });

  it('Spinner is correctly displayed when given props', () => {
    props.color = 'red';
    props.size = 'small';
    props.fill = true;
    props.style = { marginTop: 10 };

    const viewStyle = wrapper().find(View).prop('style');
    const color = wrapper().find(ActivityIndicator).prop('color');
    const size = wrapper().find(ActivityIndicator).prop('size');

    expect(viewStyle).toEqual([styles.fill, { marginTop: 10 }]);
    expect(color).toEqual('red');
    expect(size).toEqual('small');
  });
});
