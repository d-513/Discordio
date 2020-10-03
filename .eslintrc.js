module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "jsdoc/no-undefined-types": 1,
  },
  plugins: ["prettier", "jsdoc"],
};
