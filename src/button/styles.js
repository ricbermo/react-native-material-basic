import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadeContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  shade: {
    flex: 1,
  },
});

export {styles};
