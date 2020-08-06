import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  Easing,
  Platform,
  TouchableWithoutFeedback,
  I18nManager,
} from 'react-native';
import {styles, radius} from './styles';

export default class Ripple extends PureComponent {
  static propTypes = {
    ...Animated.View.propTypes,
    ...TouchableWithoutFeedback.propTypes,
    rippleColor: PropTypes.string,
    rippleOpacity: PropTypes.number,
    rippleDuration: PropTypes.number,
    rippleSize: PropTypes.number,
    rippleContainerBorderRadius: PropTypes.number,
    rippleCentered: PropTypes.bool,
    rippleSequential: PropTypes.bool,
    rippleFades: PropTypes.bool,
    disabled: PropTypes.bool,
    onRippleAnimation: PropTypes.func,
  };

  static defaultProps = {
    ...TouchableWithoutFeedback.defaultProps,
    rippleColor: 'rgb(0, 0, 0)',
    rippleOpacity: 0.3,
    rippleDuration: 400,
    rippleSize: 0,
    rippleContainerBorderRadius: 0,
    rippleCentered: false,
    rippleSequential: false,
    rippleFades: true,
    disabled: false,
    onRippleAnimation: (animation, callback) => animation.start(callback),
  };

  constructor(props) {
    super(props);

    this.unique = 0;
    this.mounted = false;

    this.state = {
      width: 0,
      height: 0,
      ripples: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLayout = (event) => {
    const {width, height} = event.nativeEvent.layout;
    const {onLayout} = this.props;

    if (typeof onLayout === 'function') {
      onLayout(event);
    }

    this.setState({width, height});
  };

  onPress = (event) => {
    const {ripples} = this.state;
    const {onPress, rippleSequential} = this.props;

    if (!rippleSequential || !ripples.length) {
      if (typeof onPress === 'function') {
        requestAnimationFrame(() => onPress(event));
      }

      this.startRipple(event);
    }
  };

  onLongPress = (event) => {
    const {onLongPress} = this.props;

    if (typeof onLongPress === 'function') {
      requestAnimationFrame(() => onLongPress(event));
    }

    this.startRipple(event);
  };

  onPressIn = (event) => {
    let {onPressIn} = this.props;

    if (typeof onPressIn === 'function') {
      onPressIn(event);
    }
  };

  onPressOut = (event) => {
    const {onPressOut} = this.props;

    if (typeof onPressOut === 'function') {
      onPressOut(event);
    }
  };

  onAnimationEnd = () => {
    if (this.mounted) {
      this.setState(({ripples}) => ({ripples: ripples.slice(1)}));
    }
  };

  startRipple(event) {
    const {width, height} = this.state;
    const {
      rippleDuration,
      rippleCentered,
      rippleSize,
      onRippleAnimation,
    } = this.props;

    const w2 = 0.5 * width;
    const h2 = 0.5 * height;

    const {locationX, locationY} = rippleCentered
      ? {locationX: w2, locationY: h2}
      : event.nativeEvent;

    const offsetX = Math.abs(w2 - locationX);
    const offsetY = Math.abs(h2 - locationY);

    const R =
      rippleSize > 0
        ? 0.5 * rippleSize
        : Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

    const ripple = {
      unique: this.unique++,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      R,
    };

    const animation = Animated.timing(ripple.progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: true,
    });

    if (typeof onRippleAnimation === 'function') {
      onRippleAnimation(animation, this.onAnimationEnd);
    }

    this.setState(({ripples}) => ({ripples: ripples.concat(ripple)}));
  }

  renderRipple = ({unique, progress, locationX, locationY, R}) => {
    const {rippleColor, rippleOpacity, rippleFades} = this.props;

    const rippleStyle = {
      top: locationY - radius,
      [I18nManager.isRTL ? 'right' : 'left']: locationX - radius,
      backgroundColor: rippleColor,

      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5 / radius, R / radius],
          }),
        },
      ],

      opacity: rippleFades
        ? progress.interpolate({
            inputRange: [0, 1],
            outputRange: [rippleOpacity, 0],
          })
        : rippleOpacity,
    };

    return <Animated.View style={[styles.ripple, rippleStyle]} key={unique} />;
  };

  render() {
    const {ripples} = this.state;
    const {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      children,
      rippleContainerBorderRadius,
      testID,
      nativeID,
      accessible,
      accessibilityHint,
      accessibilityLabel,
      onPress,
      onLongPress,
      onLayout,
      onRippleAnimation,
      rippleColor,
      rippleOpacity,
      rippleDuration,
      rippleSize,
      rippleCentered,
      rippleSequential,
      rippleFades,
      ...viewProps
    } = this.props;

    const touchableProps = {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      testID,
      accessible,
      accessibilityHint,
      accessibilityLabel,
      onLayout: this.onLayout,
      onPress: this.onPress,
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,
      onLongPress: onLongPress ? this.onLongPress : undefined,
      ...(Platform.OS !== 'web' ? {nativeID} : null),
    };

    const containerStyle = {
      borderRadius: rippleContainerBorderRadius,
    };

    return (
      <TouchableWithoutFeedback {...touchableProps}>
        <Animated.View {...viewProps} pointerEvents="box-only">
          {children}
          <View style={[styles.container, containerStyle]}>
            {ripples.map(this.renderRipple)}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
