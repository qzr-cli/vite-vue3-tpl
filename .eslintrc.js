/**
 * @Date         : 2021-04-21 11:18:06
 * @Description  :
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-06-08 16:23:02
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential',
    '@constq/eslint-config-qzr/index',
    '@constq/eslint-config-qzr/vue',
    '@constq/eslint-config-qzr/typescript'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'jest'
  ],
  rules: {
  },
}