import React from 'react';
import PhotoDetail, {
  PhotoDetailProps,
} from '../src/components/screens/PhotoDetailScreen';
import TestUtils from './TestUtils';
import { Image, Text } from 'react-native';
import renderer from 'react-test-renderer';

const mockPhoto = {
  albumId: 1,
  id: 1,
  title: 'My mock photo title',
  url:
    'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg',
  thumbnailUrl:
    'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg',
};

describe('PhotoDetailTest', () => {
  let props: PhotoDetailProps;
  const wrapper = () => TestUtils.shallowRender(<PhotoDetail {...props} />);

  beforeEach(() => {
    props = {
      photo: mockPhoto,
      componentId: 'component1',
    };
    TestUtils.reset();
  });

  it('renders correctly', () => {
    renderer.create(<PhotoDetail {...props} />);
  });
  it('Image is rendered', () => {
    // When
    const image = wrapper().find(Image);

    // Then
    expect(image.exists()).toBe(true);
  });
  it('Text with the photo title is not rendered at first', () => {
    const text = wrapper().find(Text);

    // Then
    expect(text.exists()).toBe(false);
  });
});
