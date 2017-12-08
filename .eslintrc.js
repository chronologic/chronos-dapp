'use strict';

module.exports = {
  extends: 'airbnb',
  rules: {
    'class-methods-use-this': 0,
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'consistent-return': 0,
    'global-require': 0,
    'no-console': 0,
    'no-else-return': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'strict': ['error', 'global'],
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-for': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/prefer-stateless-function': 0,
    'react/prop-types': ['error', { ignore: [], customValidators: [], skipUndeclared: true }],
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      globalReturn : true,
      impliedStrict: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 7,
  },
  env: {
    browser: true,
    mocha: true,
    node: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: [
          'node_modules',
          '.',
        ]
      }
    }
  }
};
