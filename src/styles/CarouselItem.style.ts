import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(85);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default StyleSheet.create({
  container: {
    backgroundColor: '#ede7e3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    elevation: 2,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: '#000000',
    shadowOpacity: 0.25,
  },
  image: {
    width: itemWidth - 30,
    height: itemWidth - 30,
    borderRadius: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#242322',
  },
});
