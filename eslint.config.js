import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import pluginJest from 'eslint-plugin-jest';

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts}"], 
    plugins: { js, jest: pluginJest }, 
    extends: ["js/recommended"], 
    rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  }, },
  { 
    files: ["**/*.{js,mjs,cjs,ts}"], 
    languageOptions: { globals: {...globals.browser, ...globals.node, ...globals.jest} } },
    tseslint.configs.recommended,
]);