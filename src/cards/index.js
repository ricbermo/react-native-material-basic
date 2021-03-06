import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import Ripple from '../ripple';

const Card = React.memo(function Card({useRipple, children, style, onPress}) {
  const Component = useRipple ? Ripple : View;
  return (
    <Component style={[styles.contentstyle, style]} onPress={onPress}>
      {children}
    </Component>
  );
});

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    borderRadius: 6,
  },
  shadow: {
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.12,
      },
    }),
  },
});

export default Card;
