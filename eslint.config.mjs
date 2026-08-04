import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: ["node_modules", "dist", "coverage"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],

    languageOptions: {
      globals: {
        ...globals.node,
        process: "readonly",
      },
    },

    rules: {
      // General
      "no-console": "warn",
      eqeqeq: "error",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-undef": "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-expressions": "error",

      // TypeScript
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  eslintConfigPrettier,
);
