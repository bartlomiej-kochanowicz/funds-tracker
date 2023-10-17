const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: [
    'eslint-config-airbnb',
    'eslint-config-airbnb-typescript',
  ].map(require.resolve),
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'eslint-plugin-react-hooks',
    'eslint-plugin-prettier',
    'eslint-plugin-vitest-globals', '@typescript-eslint', 'jest-dom', 'testing-library', 'simple-import-sort'],
  parserOptions: {
    project,
  },
  globals: {
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
      node: {
        paths: ['src'],
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'react/jsx-fragments': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-await-in-loop': 'off',
    'class-methods-use-this': 'off',
    'react/require-default-props': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'consistent-return': 'off',
  },
};
