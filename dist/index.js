/**
 * Node.js ESLint Configuration
 * Compatible with:
 * - typescript-eslint: ^8.27.0
 * - ESLint: ^9.22.0
 * - TypeScript: ^5.5.0
 * - Node.js: >=20.0.0 (LTS)
 */
import baseConfig from '@noneforge/eslint-config';
import { defineConfig } from 'eslint/config';
import nodePlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import securityPlugin from 'eslint-plugin-security';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
const config = defineConfig(...baseConfig, {
    name: 'noneforge/node-js',
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
        n: nodePlugin,
        unicorn: unicornPlugin,
    },
    languageOptions: {
        ecmaVersion: 2023,
        globals: {
            ...globals.node,
            ...globals.es2023,
        },
    },
    rules: {
        'no-console': 'off',
        'no-path-concat': 'error',
        'no-throw-literal': 'error',
        // Node.js specific rules
        'n/no-process-env': 'error',
        'n/no-missing-import': 'off',
        'n/no-missing-require': 'error',
        'n/no-unsupported-features/es-syntax': 'off',
        // Unicorn rules
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-spread': 'error',
        'unicorn/prefer-array-find': 'error',
        'unicorn/prefer-regexp-test': 'error',
    },
}, {
    name: 'nonefoge/node-typescript',
    files: ['**/*.{ts,tsx,mts,cts}'],
    plugins: {
        n: nodePlugin,
        security: securityPlugin,
        promise: promisePlugin,
        unicorn: unicornPlugin,
    },
    languageOptions: {
        ecmaVersion: 2023,
        globals: {
            ...globals.node,
            ...globals.es2023,
        },
    },
    rules: {
        'no-console': 'off',
        'no-path-concat': 'error',
        // Node.js specific rules
        'n/prefer-node-protocol': 'error',
        'n/no-missing-import': 'off',
        'n/no-missing-require': 'error',
        'n/no-unpublished-import': ['error', {
                allowModules: ['vitest'],
            }],
        'n/no-extraneous-import': 'error',
        'n/no-extraneous-require': 'error',
        'n/file-extension-in-import': 'off',
        'n/no-unsupported-features/node-builtins': ['error', {
                version: '>=20.0.0',
            }],
        'n/no-unsupported-features/es-syntax': 'off',
        'n/no-deprecated-api': 'error',
        'n/no-sync': ['error', {
                allowAtRootLevel: false,
            }],
        'n/prefer-promises/fs': 'error',
        'n/prefer-promises/dns': 'error',
        'n/prefer-global/console': 'off',
        'n/prefer-global/process': 'off',
        'n/prefer-global/buffer': 'off',
        'n/prefer-global/text-decoder': 'off',
        'n/prefer-global/text-encoder': 'off',
        'n/prefer-global/url': 'off',
        'n/prefer-global/url-search-params': 'off',
        'n/no-process-exit': 'error',
        'n/no-process-env': 'error',
        'n/process-exit-as-throw': 'error',
        'n/hashbang': 'error',
        'n/no-callback-literal': 'error',
        'n/handle-callback-err': 'off',
        'n/no-exports-assign': 'error',
        'n/no-unpublished-bin': 'error',
        'n/no-unpublished-require': 'error',
        'n/no-unsupported-features/es-builtins': 'error',
        // Security rules
        'security/detect-eval-with-expression': 'error',
        'security/detect-non-literal-fs-filename': 'off',
        'security/detect-non-literal-require': 'error',
        'security/detect-child-process': 'warn',
        'security/detect-buffer-noassert': 'error',
        'security/detect-unsafe-regex': 'error',
        'security/detect-non-literal-regexp': 'warn',
        'security/detect-new-buffer': 'error',
        'security/detect-object-injection': 'off',
        'security/detect-possible-timing-attacks': 'off',
        'security/detect-pseudoRandomBytes': 'warn',
        'security/detect-disable-mustache-escape': 'warn',
        'security/detect-no-csrf-before-method-override': 'warn',
        'security/detect-bidi-characters': 'warn',
        // Promise rules
        'promise/always-return': 'off',
        'promise/catch-or-return': 'error',
        'promise/no-return-wrap': 'error',
        'promise/param-names': 'error',
        'promise/no-nesting': 'warn',
        'promise/no-promise-in-callback': 'warn',
        'promise/no-callback-in-promise': 'warn',
        'promise/avoid-new': 'off',
        'promise/no-new-statics': 'error',
        'promise/no-return-in-finally': 'error',
        'promise/valid-params': 'error',
        'promise/prefer-await-to-then': 'off',
        'promise/prefer-await-to-callbacks': 'off',
        'promise/no-native': 'off',
        // Unicorn rules
        'unicorn/prefer-top-level-await': 'error',
        'unicorn/prefer-modern-dom-apis': 'off',
        'unicorn/prefer-modern-math-apis': 'error',
        'unicorn/prefer-at': 'error',
        'unicorn/prefer-string-replace-all': 'error',
        'unicorn/prefer-structured-clone': 'error',
        'unicorn/prefer-set-has': 'error',
        'unicorn/prefer-array-find': 'off',
        'unicorn/prefer-array-some': 'error',
        'unicorn/prefer-default-parameters': 'error',
        'unicorn/prefer-spread': 'off',
        'unicorn/prefer-optional-catch-binding': 'error',
        'unicorn/prefer-regexp-test': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-array-push-push': 'error',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-useless-undefined': 'error',
        'unicorn/no-null': 'off',
        'unicorn/prevent-abbreviations': 'off',
    },
}, {
    name: 'noneforge/node-tests',
    files: ['**/*.spec.ts', '**/*.test.ts', '**/*.e2e-spec.ts'],
    rules: {
        // Node.js specific rules
        'n/no-unpublished-import': 'off',
        'n/no-unpublished-require': 'off',
        'n/no-extraneous-import': 'off',
        'n/no-extraneous-require': 'off',
        // Security rules
        'security/detect-child-process': 'off',
        'security/detect-non-literal-regexp': 'off',
        'security/detect-non-literal-fs-filename': 'off',
    },
}, {
    name: 'noneforge/node-scripts',
    files: ['**/scripts/**/*.ts', '**/scripts/**/*.js', '**/migrations/**/*.ts'],
    rules: {
        'no-console': 'off',
        // Node.js specific rules
        'n/no-process-env': 'off',
        'n/no-sync': 'off',
        'n/no-process-exit': 'off',
        'n/hashbang': 'off',
    },
}, {
    name: 'noneforge/node-configs',
    files: ['**/*.config.js', '**/*.config.mjs', '**/*.config.ts'],
    rules: {
        'n/no-unpublished-import': 'off',
        'n/no-process-env': 'off',
        'n/no-sync': 'off',
        // Security rules
        'security/detect-non-literal-require': 'off',
    },
});
export default config;
//# sourceMappingURL=index.js.map