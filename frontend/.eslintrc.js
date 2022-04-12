module.exports = {
  'env': {
    'browser': true,
    "node": true,
    'es2021': true,
    'jest': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 11,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'react-hooks',
  ],
  'rules': {
    // first argument: 0 - silent, 1 - warning, 2 - error
    'strict': [1, 'safe'],
    'no-debugger': 1,
    'brace-style': [
      1,
      '1tbs',
      {
        'allowSingleLine': true
      },
    ],
    'no-trailing-spaces': 1,
    'keyword-spacing': 1,
    'space-before-function-paren': [
      1,
      'never',
    ],
    'spaced-comment': [1, 'always'],
    'vars-on-top': 1,
    'no-undef': 1,
    'no-undefined': 1,
    'comma-dangle': [1, 'always-multiline'],
    'quotes': [0, 'single'],
    'semi': [1, 'always'],
    'guard-for-in': 1,
    'no-eval': 1,
    'no-with': 1,
    'valid-typeof': 1,
    'no-unused-vars': 1,
    'no-continue': 1,
    'no-extra-semi': 1,
    'no-unreachable': 1,
    'no-unused-expressions': 1,
    'no-magic-numbers': 0,
    'max-len': [0, 220, 4],
    'react/prefer-es6-class': 1,
    'react/prop-types': 0,
    'no-prototype-builtins': 1,
    'react/no-unescaped-entities': 0,
    'react/display-name': 1,
    'react/jsx-key': 1,
    'react/jsx-no-target-blank': 1,
    'react/no-unknown-property': 1,
  },
};
