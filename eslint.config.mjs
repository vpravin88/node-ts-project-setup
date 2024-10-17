// {
//     "env": {
//       "es6": true,
//       "node": true
//     },
//     "files": ["**/*.{ts}"],
//     "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
//     "parser": "@typescript-eslint/parser",
//     "plugins": ["@typescript-eslint"],
//     "parserOptions": {
//       "ecmaVersion": 2020,
//       "sourceType": "module"
//     },
//     "rules": {
//       "no-console": "error",
//       "semi": ["error", "always"],
//       "quotes": ["error", "single"]
//     }
//   }

import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config({
   env: {
      es6: true,
      node: true,
   },
   parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
   },
   languageOptions: {
      globals: globals.browser,
   },
   files: ['**/*.{ts}'],
   extends: [pluginJs.configs.recommended, eslintConfigPrettier, ...tseslint.configs.recommended],
   parser: '@typescript-eslint/parser',
   plugins: ['@typescript-eslint'],
   rules: {
      'no-console': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
   },
});
