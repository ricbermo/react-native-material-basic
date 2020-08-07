import React, {Fragment, PureComponent} from 'react';
import {View, Animated, I18nManager} from 'react-native';
import PropTypes from 'prop-types';
import styles, {borderRadius} from './styles';

export default class Line extends PureComponent {
  static propTypes = {
    lineType: PropTypes.oneOf(['solid', 'none']),
    disabled: PropTypes.bool,
    restricted: PropTypes.bool,
    tintColor: PropTypes.string,
    baseColor: PropTypes.string,
    errorColor: PropTypes.string,
    lineWidth: PropTypes.number,
    activeLineWidth: PropTypes.number,
    disabledLineWidth: PropTypes.number,
    focusAnimation: PropTypes.instanceOf(Animated.Value),
    labelAnimation: PropTypes.instanceOf(Animated.Value),
    labelWidth: PropTypes.instanceOf(Animated.Value),
    contentInset: PropTypes.shape({
      left: PropTypes.number,
      right: PropTypes.number,
    }),
    activeLineColor: PropTypes.string,
  };

  static defaultProps = {
    lineType: 'solid',
    disabled: false,
    restricted: false,
  };

  borderProps = () => {
    const {
      disabled,
      restricted,
      lineType,
      lineWidth,
      activeLineWidth,
      disabledLineWidth,
      baseColor,
      tintColor,
      errorColor,
      activeLineColor,
      focusAnimation,
    } = this.props;

    if (disabled) {
      return {
        borderColor: baseColor,
        borderWidth: disabledLineWidth,
      };
    }

    if (restricted) {
      return {
        borderColor: errorColor,
        borderWidth: activeLineWidth,
      };
    }

    return {
      borderColor: focusAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [errorColor, baseColor, activeLineColor || tintColor],
      }),

      borderWidth: focusAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [activeLineWidth, lineWidth, activeLineWidth],
      }),

      borderStyle: lineType,
    };
  };

  render() {
    const {lineType, labelWidth, labelAnimation, contentInset} = this.props;

    if (lineType === 'none') {
      return null;
    }

    const labelOffset = 2 * (contentInset.left - 2 * borderRadius);
    const lineOffset = Animated.add(labelWidth, labelOffset);

    const topLineContainerStyle = {
      transform: [
        {
          scaleX: I18nManager.isRTL ? -1 : 1,
        },
        {
          translateX: Animated.multiply(labelAnimation, lineOffset),
        },
      ],
    };

    const leftContainerStyle = {
      width: contentInset.left - borderRadius,
    };

    const rightContainerStyle = {
      width: contentInset.right - borderRadius,
    };

    const topContainerStyle = {
      left: leftContainerStyle.width,
      right: rightContainerStyle.width,
    };

    const lineStyle = this.borderProps();

    return (
      <Fragment>
        <View
          style={[styles.topContainer, topContainerStyle]}
          pointerEvents="none">
          <Animated.View
            style={[styles.topLineContainer, topLineContainerStyle]}>
            <Animated.View style={[styles.borderTop, lineStyle]} />
          </Animated.View>
        </View>

        <View
          style={[styles.rightContainer, rightContainerStyle]}
          pointerEvents="none">
          <Animated.View style={[styles.borderRight, lineStyle]} />
        </View>

        <View style={styles.bottomContainer} pointerEvents="none">
          <Animated.View style={[styles.borderBottom, lineStyle]} />
        </View>

        <View
          style={[styles.leftContainer, leftContainerStyle]}
          pointerEvents="none">
          <Animated.View style={[styles.borderLeft, lineStyle]} />
        </View>
      </Fragment>
    );
  }
}
