import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  fill: { flex: 1 },
  mainContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelIconContainer: {
    position: 'absolute',
    marginLeft: 20,
    marginTop: 25,
    top: 0,
    left: 0,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: '#000000',
    shadowOpacity: 0.75,
    elevation: 2,
  },
  cancelIcon: {
    tintColor: '#ffffff',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
