import React from 'react';
import PhotoListItem, {
  PhotoListItemProps,
} from '../src/components/views/PhotoListItem';
import TestUtils from './TestUtils';
import { View, TouchableOpacity, Text } from 'react-native';

const mockPhoto = {
  albumId: 1,
  id: 1,
  title: 'My mock photo title',
  url:
    'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg',
  thumbnailUrl:
    'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg',
};

describe('PhotoListItem', () => {
  let props: PhotoListItemProps;
  const wrapper = () =>
    TestUtils.shallowRender<PhotoListItemProps>(<PhotoListItem {...props} />);

  beforeEach(() => {
    (props = {
      photo: mockPhoto,
      onPress: () => {},
    }),
      TestUtils.reset();
  });

  it('Component is rendered', () => {
    // When
    const comp = wrapper();
    const container = comp.find(View);
    const button = comp.find(TouchableOpacity);
    const image = comp.find('CachedImage');
    const text = comp.find(Text);

    // Then
    expect(comp.exists()).toBe(true);
    expect(container.exists()).toBe(true);
    expect(button.exists()).toBe(true);
    expect(image.exists()).toBe(true);
    expect(text.exists()).toBe(true);
  });
});
