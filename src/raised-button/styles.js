import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 36,
    minWidth: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
});

export {styles};
