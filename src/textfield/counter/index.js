import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import styles from './styles';

export default class Counter extends PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
    limit: PropTypes.number,
    baseColor: PropTypes.string.isRequired,
    errorColor: PropTypes.string.isRequired,
    style: Text.propTypes.style,
  };

  render() {
    const {count, limit, baseColor, errorColor, style} = this.props;

    if (!limit) {
      return null;
    }

    const textStyle = {
      color: count > limit ? errorColor : baseColor,
    };

    return (
      <Text style={[styles.text, style, textStyle]}>
        {count} / {limit}
      </Text>
    );
  }
}
