import React, {PureComponent} from 'react';
import TextButton from '../text-button';
import {styles} from './styles';

export default class OutlinedButton extends PureComponent {
  static propTypes = {
    ...TextButton.propTypes,
  };

  static defaultProps = {
    ...TextButton.defaultProps,
  };

  render() {
    const {titleColor, style} = this.props;

    return (
      <TextButton
        {...this.props}
        style={[style, styles.outlined, {borderColor: titleColor}]}
      />
    );
  }
}
