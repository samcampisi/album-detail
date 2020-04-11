import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    marginHorizontal: 20,
    height: 36,
    marginVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    paddingTop: 1,
    paddingBottom: 0,
    color: '#000000',
    ...Platform.select({
      ios: { paddingTop: 1 },
      android: { paddingTop: 0 },
    }),
  },
  placeholderTextColor: {
    color: '#555555',
  },
  searchIcon: {
    width: 15,
    height: 15,
  },
  cancelIcon: {
    width: 15,
    height: 15,
    marginRight: 0,
  },
});
