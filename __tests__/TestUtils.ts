import { Component } from 'react';
import { ShallowWrapper, shallow, mount, ReactWrapper } from 'enzyme';

export default class TestUtils {
  private static mountedComponent: any;

  static shallowRender<P = {}, S = {}, C = Component>(
    element: JSX.Element,
  ): ShallowWrapper<P, S, C> {
    if (!this.mountedComponent) {
      this.mountedComponent = shallow(element);
    }
    return this.mountedComponent;
  }

  static mountedRender<P = {}, S = {}, C = Component>(
    element: JSX.Element,
  ): ReactWrapper<P, S, C> {
    if (!this.mountedComponent) {
      this.mountedComponent = mount(element);
    }
    return this.mountedComponent;
  }

  static reset(): void {
    this.mountedComponent = undefined;
  }
}
