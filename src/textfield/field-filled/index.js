import TextField from '../field';
import styles from './styles';

export default class FilledTextField extends TextField {
  static contentInset = {
    ...TextField.contentInset,
    top: 8,
    left: 12,
    right: 12,
  };

  static labelOffset = {
    ...TextField.labelOffset,
    y0: -7,
    y1: -2,
    filled: true,
  };

  static inputContainerStyle = [
    TextField.inputContainerStyle,
    styles.inputContainer,
  ];
}
