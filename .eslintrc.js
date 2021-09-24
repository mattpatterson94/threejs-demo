module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {}
}