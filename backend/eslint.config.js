// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist, { rules } from "eslint-plugin-perfectionist";

export default tseslint.config(
  {
    ignores: ["**/*.js"],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  perfectionist.configs["recommended-natural"],
  {
    rules: {
      "sort-keys": "off",
      "sort-imports": "off",

      "perfectionist/sort-classes": "off",
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-objects": "off",
      "no-ununsed-vars": "off",
    },
  },
);
