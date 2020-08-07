import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Animated, Easing} from 'react-native';
import Ripple from '../ripple';
import {styles} from './styles';

export default class Button extends PureComponent {
  static propTypes = {
    ...Ripple.propTypes,
    color: PropTypes.string,
    disabledColor: PropTypes.string,
    shadeColor: PropTypes.string,
    shadeOpacity: PropTypes.number,
    shadeBorderRadius: PropTypes.number,
    focusAnimation: PropTypes.instanceOf(Animated.Value),
    focusAnimationDuration: PropTypes.number,
    disableAnimation: PropTypes.instanceOf(Animated.Value),
    disableAnimationDuration: PropTypes.number,
    payload: PropTypes.any,
  };

  static defaultProps = {
    rippleContainerBorderRadius: 2,
    rippleSequential: true,
    hitSlop: {top: 6, right: 4, bottom: 6, left: 4},
    color: 'rgb(224, 224, 224)',
    disabledColor: 'rgb(240, 240, 240)',
    shadeColor: 'rgb(0, 0, 0)',
    shadeOpacity: 0.12,
    shadeBorderRadius: 2,
    focusAnimationDuration: 225,
    disableAnimationDuration: 225,
    disabled: false,
  };

  constructor(props) {
    super(props);

    const {
      disabled,
      focusAnimation = new Animated.Value(0),
      disableAnimation = new Animated.Value(disabled ? 1 : 0),
    } = this.props;

    this.state = {
      focusAnimation,
      disableAnimation,
    };
  }

  componentDidUpdate(prevProps) {
    const {disabled} = this.props;

    if (disabled !== prevProps.disabled) {
      const {disableAnimationDuration: duration} = this.props;
      const {disableAnimation} = this.state;

      Animated.timing(disableAnimation, {
        toValue: disabled ? 1 : 0,
        duration,
        useNativeDriver: true,
      }).start();
    }
  }

  onPress = () => {
    const {onPress, payload} = this.props;

    if (typeof onPress === 'function') {
      onPress(payload);
    }
  };

  onFocusChange = (focused) => {
    const {focusAnimation} = this.state;
    const {focusAnimationDuration} = this.props;

    Animated.timing(focusAnimation, {
      toValue: focused ? 1 : 0,
      duration: focusAnimationDuration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {focusAnimation, disableAnimation} = this.state;
    const {
      color,
      disabledColor,
      shadeColor,
      shadeOpacity,
      shadeBorderRadius,
      style,
      children,
      ...otherRippleProps
    } = this.props;

    const rippleStyle = {
      backgroundColor: disableAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [color, disabledColor],
      }),
    };

    const shadeContainerStyle = {
      borderRadius: shadeBorderRadius,
    };

    const shadeStyle = {
      backgroundColor: shadeColor,
      opacity: focusAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, shadeOpacity],
      }),
    };

    return (
      <Ripple
        {...otherRippleProps}
        style={[styles.container, rippleStyle, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {children}
        <View style={[styles.shadeContainer, shadeContainerStyle]}>
          <Animated.View style={[styles.shade, shadeStyle]} />
        </View>
      </Ripple>
    );
  }
}
