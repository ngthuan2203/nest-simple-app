module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
  extends: ['plugin:@typescript-eslint/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
      typescript: {
        project: './'
      },
    },
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'prefer-const': 'error',
        curly: 'off',
        'comma-dangle': [
          'error',
          {
            arrays: 'never',
            objects: 'never',
            imports: 'never',
            exports: 'never',
            functions: 'never',
          },
        ],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-unresolved': 'error',
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^@nestjs', '^[a-z]', '^@'],
              ['^@/'],
              // Packages starting with `~`
              ['^~'],
              // Imports starting with `../`
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Imports starting with `./`
              ['^@/configs'],
              ['^@/common/interfaces'],
              ['^@/common/constants'],
              ['^@/common/utils'],
              ['^@/common/interceptors'],
              ['^@/common/decorators'],
              ['^@/common/validators'],
              ['^@/common/middlewares'],
              ['^@/database'],
              ['^@/modules'],
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Side effect imports
              ['^\\u0000'],
            ],
          },
        ],

      },
    },
  ],
};
