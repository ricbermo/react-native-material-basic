import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';
import Button from '../button';
import {styles} from './styles';

export default class TextButton extends PureComponent {
  static propTypes = {
    ...Button.propTypes,
    title: PropTypes.string.isRequired,
    titleColor: PropTypes.string,
    titleStyle: PropTypes.any,
    disabledTitleColor: PropTypes.string,
    iconPlacement: PropTypes.oneOf(['left', 'right']),
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  };

  static defaultProps = {
    color: 'transparent',
    disabledColor: 'transparent',
    titleColor: 'rgb(0, 0, 0)',
    disabledTitleColor: 'rgba(0, 0, 0, .26)',
    shadeOpacity: 0.2,
    iconPlacement: 'left',
  };

  constructor(props) {
    super(props);

    const {
      disabled,
      disableAnimation = new Animated.Value(disabled ? 1 : 0),
    } = this.props;

    this.state = {
      disableAnimation,
    };
  }

  _renderIconLeft = () => {
    const {iconPlacement, icon} = this.props;
    if (icon && iconPlacement === 'left') {
      if (typeof icon === 'function') {
        return icon();
      }
      return icon;
    }
    return null;
  };

  _renderIconRight = () => {
    const {iconPlacement, icon} = this.props;
    if (icon && iconPlacement === 'right') {
      if (typeof icon === 'function') {
        return icon();
      }
      return icon;
    }
    return null;
  };

  render() {
    const {disableAnimation} = this.state;
    const {
      title,
      titleColor,
      titleStyle,
      disabledTitleColor,
      style,
      icon,
      ...props
    } = this.props;

    const titleStyleOverrides = {
      color: disableAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [titleColor, disabledTitleColor],
      }),
    };

    return (
      <Button
        style={[styles.container, style]}
        shadeColor={titleColor}
        rippleColor={titleColor}
        {...props}
        disableAnimation={disableAnimation}>
        {icon && this._renderIconLeft()}
        <Animated.Text
          style={[styles.title, titleStyle, titleStyleOverrides]}
          numberOfLines={1}>
          {title}
        </Animated.Text>
        {icon && this._renderIconRight()}
      </Button>
    );
  }
}
