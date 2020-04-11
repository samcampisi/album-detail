import React from 'react';
import AlbumItem, { AlbumItemProps } from '../src/components/views/AlbumItem';
import TestUtils from './TestUtils';
import { View, TouchableOpacity, Text, Image } from 'react-native';

const mockAlbumEntry = {
  album: {
    id: 1,
    title: 'My mock album title',
    userId: 1,
  },
  photos: [
    {
      albumId: 1,
      id: 1,
      title: 'My mock albumEntry title',
      url:
        'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg',
      thumbnailUrl:
        'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg',
    },
  ],
};
const mockAlbumEntry2 = {
  album: {
    id: 1,
    title: 'My mock album title',
    userId: 1,
  },
};

describe('AlbumItem', () => {
  let props: AlbumItemProps;
  const wrapper = () =>
    TestUtils.shallowRender<AlbumItemProps>(<AlbumItem {...props} />);

  beforeEach(() => {
    (props = {
      albumEntry: mockAlbumEntry,
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
  it('Album is rendered without photos (only the placeholder is shown)', () => {
    props = {
      albumEntry: mockAlbumEntry2,
      onPress: () => {},
    };
    // When
    const comp = wrapper();
    const container = comp.find(View);
    const button = comp.find(TouchableOpacity);
    const cachedImage = comp.find('CachedImage');
    const image = comp.find(Image);
    const text = comp.find(Text);

    // Then
    expect(comp.exists()).toBe(true);
    expect(container.exists()).toBe(true);
    expect(button.exists()).toBe(true);
    expect(cachedImage.exists()).toBe(false);
    expect(image.exists()).toBe(true);
    expect(text.exists()).toBe(true);
  });
});
