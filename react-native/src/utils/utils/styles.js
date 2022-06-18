import {StyleSheet} from 'react-native';
import {SIZES, FONT_FAMILY_MEDIUM, COLORS, FONT_FAMILY_BOLD} from './constants';

export const DEFAULTSTYLES = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F8F8F8',
  },
  containerPadding: {
    flex: 1,
    flexDirection: 'column',
    padding: SIZES.size_20,
  },
  flex: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  flexCenterHorizontal: {
    flex: 1,
    alignContent: 'center',
  },
  flexCenterVertical: {
    flex: 1,
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowCenterVertical: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexgrowCenter: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONT_FAMILY_MEDIUM,
    color: '#000',
    fontSize: SIZES.size_20,
    textAlign: 'center',
    width: '100%',
    marginBottom: SIZES.size_14,
  },
  subtitle: {
    fontFamily: FONT_FAMILY_MEDIUM,
    color: COLORS.gray2,
    fontSize: SIZES.size_14,
    textAlign: 'center',
    width: '100%',
    marginBottom: SIZES.size_30,
  },
  subtitlelink: {
    fontFamily: FONT_FAMILY_BOLD,
    color: COLORS.blue,
    fontSize: SIZES.size_14,
    textAlign: 'center',
    width: '100%',
    marginBottom: SIZES.size_30,
  },
  preffix: {
    position: 'absolute',
    color: '#000',
    fontSize: SIZES.size_16,
    textAlign: 'center',
    fontFamily: FONT_FAMILY_BOLD,
    top: SIZES.size_11,
    left: SIZES.size_20,
  },
});
