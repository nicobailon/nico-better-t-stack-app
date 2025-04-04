import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // ... antfu options ...
  },
  {
    rules: {
      // ... other rules ...
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Remove conflicting rules
      'style/semi': 'off',
      'semi': 'off',
      'indent': 'off',
      '@typescript-eslint/indent': ['error', 2, {
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
  // ... rest of the configuration ...
)
