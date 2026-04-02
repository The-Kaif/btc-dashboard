import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      //  Allow 'any' (important for your case)
      "@typescript-eslint/no-explicit-any": "off",

      //  Don't force strict typing everywhere
      "@typescript-eslint/explicit-module-boundary-types": "off",

      //  Allow unused vars (but warn instead of error)
      "@typescript-eslint/no-unused-vars": "warn",

      //  Relax React rules
      "react/no-unescaped-entities": "off",

      "react-hooks/set-state-in-effect":"off",
    },
  },

  // Ignore build files
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;