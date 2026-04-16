import playwright from "eslint-plugin-playwright";
import prettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import js from "@eslint/js";

export default [
  // 1. Load Standard JS Recommended rules
  js.configs.recommended,

  // 2. Load Playwright rules
  {
    ...playwright.configs["flat/recommended"],
    files: ["**/*.spec.ts", "**/*.test.ts", "**/tests/**/*.ts"],
  },

  // 3. Custom Rules & General Setup
  {
    plugins: {
      prettier: prettier,
    },
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "error", // Flags unused variables
      "no-console": "warn", // Warns on console.log
      "prettier/prettier": "error", // Runs Prettier as an ESLint rule
      ...configPrettier.rules, // Turns off ESLint rules that conflict with Prettier
    },
  },

  // 4. Ignore patterns (replaces .eslintignore)
  {
    ignores: [
      "node_modules/",
      "test-results/",
      "playwright-report/",
      "blob-report/",
      "playwright/.cache/",
    ],
  },
];
