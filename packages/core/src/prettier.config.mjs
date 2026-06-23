/** @type {import("prettier").Config} */
export default {
  printWidth: 80,
  bracketSpacing: true,
  endOfLine: "auto",
  trailingComma: "none",
  tabWidth: 4,
  useTabs: true,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  arrowParens: "avoid",
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: [
    "classProperties",
    "decorators-legacy",
    "typescript",
  ],
  importOrder: ["<THIRD_PARTY_MODULES>", "^@/(.*)$", "^../(.*)", "^./(.*)"],
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
