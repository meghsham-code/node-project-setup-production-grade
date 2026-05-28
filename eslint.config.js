// @ts-check

import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },

  {
    files: ["**/*.js"],

    ...js.configs.recommended,

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.ts"],
  })),

  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.ts"],
  })),

  eslintConfigPrettier,

  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tseslint.parser,

      globals: {
        ...globals.node,
      },

      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-explicit-any": "error",

      "@typescript-eslint/consistent-type-imports": "error",

      "@typescript-eslint/explicit-function-return-type": "warn",

      "prefer-const": "error",

      "no-var": "error",

      "no-duplicate-imports": "error",

      "no-unused-expressions": "error",

      semi: ["error", "always"],

      quotes: [
        "error",
        "double",
        {
          avoidEscape: true,
        },
      ],

      indent: ["error", 2],

      "no-console": "warn",
    },
  }
);
