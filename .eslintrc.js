module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:jest/recommended',
    'prettier',
  ],
  parser: '@babel/eslint-parser',
  plugins: ['jest', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
  env: {
    'jest/globals': true,
  },
};
