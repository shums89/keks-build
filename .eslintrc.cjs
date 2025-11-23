/* eslint-env node */

module.exports = {
  root: true,
  // files: ['*.{ts,tsx}'],
  env: {
    browser: true,
    es2022: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'htmlacademy/react-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.app.json'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: [
    'react-refresh',
    'simple-import-sort',
    'import',
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'off',
  },
  overrides: [
    {
      files: [
        '*test*'
      ],
      rules: {
        '@typescript-eslint/unbound-method': 'off'
      }
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^\\w', '^@hookform', '^@radix-ui', '^@redux(.*|$)', 'react'],
              // npm packages
              // Anything that starts with a letter (or digit or underscore), or `@` followed by a letter.
              // ['^\\w'],
              // Internal packages.
              ['@src/store(/.*|$)', 'store(/.*|$)', '@src/hooks(/.*|$)', 'hooks(/.*|$)'],
              ['@src/layouts(/.*|$)', '^@pages(/.*|$)', '^@components(/.*|$)'],
              ['^@src/types(/.*|$)', '^@src(/.*|$)'],
              // ['^@ui(/.*|$)'],
              // ['^@lib(/.*|$)'],
              // ['^@utils(/.*|$)'],
              // ['^@hooks(/.*|$)'],
              // ['^@services(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ]
}
