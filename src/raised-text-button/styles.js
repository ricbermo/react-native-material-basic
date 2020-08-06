import {StyleSheet, Platform} from 'react-native';
import RN from 'react-native/package.json';

const [, major, minor] = RN.version.match(/^(\d+)\.(\d+)\.(.+)$/);

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    fontSize: 14,
    fontWeight: '500',
    ...Platform.select({
      android: {
        includeFontPadding: !major && minor >= 40 ? false : true,
      },
    }),
  },
});

export {styles};
