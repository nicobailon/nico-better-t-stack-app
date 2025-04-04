import antfu from '@antfu/eslint-config'
import stylistic from '@stylistic/eslint-plugin'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu(
  {
    react: true,
    typescript: true,
    // Removed the semicolon option as it might not be a valid option
    plugins: {
      'tailwindcss': tailwind,
      '@stylistic': stylistic,
    },
    ignores: [
      '/dist/',
      '**/*.gen.ts',
      '/node_modules/',
      '/.turbo/',
      '/.roomodes/',
      '/storybook-static/',
      '/index.html',
      '/assets/',
    ],
  },
  {
    rules: {
      // ... other rules ...
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Remove conflicting rules
      'style/semi': 'off',
      'semi': 'off',
      'indent': 'off',
      '@stylistic/indent': ['error', 2, {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
        ignoredNodes: [
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXFragment',
          'JSXOpeningFragment',
          'JSXClosingFragment',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
          'TemplateLiteral',
          'TSTypeParameterInstantiation',
        ],
      }],
    },
  },
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
  {
    files: ['apps/server/**/*.ts'],
    rules: {},
  },
  {
    files: ['apps/web/**/*.stories.@(js|jsx|mjs|ts|tsx)', 'apps/web/.storybook/**/*.{js,ts,tsx}'],
    rules: {
      'import/no-default-export': 'off',
      'unicorn/filename-case': 'off',
    },
  },
  // Add specific rules for eslint config files
  {
    files: ['**/eslint.config.mjs'],
    rules: {
      'semi': ['error', 'never'],
      'style/semi': ['error', 'never'],
    },
  },
)
