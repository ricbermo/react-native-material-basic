module.exports = {
  root: true,
  extends: '@react-native-community',
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true,
    'react-native/react-native': true,
  },
  rules: {
    'react/prop-types': 2,
    complexity: ['error', 7],
  },
  globals: {
    __DEV__: false,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
};
