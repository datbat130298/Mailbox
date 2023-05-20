module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['**/*Slice.*'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
  },
  ignorePatterns: ['**/*.d.ts', '**/*.test.*', '**/*.stories.*', 'node_modules/', 'build/', 'dist/'],
};
