// Global styles and helper styles for React Native components
import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    padding: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111'
  }
});
