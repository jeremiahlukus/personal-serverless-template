module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    'import/resolver': {
      typescript: {
        directory: './',
        alwaysTryTypes: true
      },
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      2,
      { devDependencies: ['**/test.tsx', '**/test.ts'] }
    ],
    'max-len': ['error', { code: 120 }],
    'max-classes-per-file': ['warn', 2],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'no-console': 'off',
    'import/no-duplicates': 0,
    'import/no-unresolved': 2,
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      },
    ],
    'node/no-extraneous-import': 0,
    'node/no-missing-import': 0,
    '@typescript-eslint/member-delimiter-style': 'off'
  },
  overrides: [
    {
      files: ['*.spec.ts', 'spec/**/*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'max-len': ['warn', { code: 120 }],
        '@typescript-eslint/ban-ts-ignore': 'off',
        'import/order': 'off',
        'import/first': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    },
    {
      files: ['swagger/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      },
    },
  ],
};
