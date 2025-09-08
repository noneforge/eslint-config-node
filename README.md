# @noneforge/eslint-config-node

Comprehensive Node.js ESLint configuration with TypeScript/JavaScript support, security rules, and backend-specific optimizations. Built on [@noneforge/eslint-config](https://www.npmjs.com/package/@noneforge/eslint-config) ESLint 9+ flat config with strict type checking and Node.js best practices.

## Features

- ✨ **ESLint 9 Flat Config** - Modern configuration format with better performance
- 🎯 **Node.js Optimized** - Specific rules for backend development and server applications
- 🔒 **Security First** - Built-in security scanning with eslint-plugin-security
- ⚡ **Performance Rules** - Async/promise optimization and Node.js performance patterns
- 📦 **Full TypeScript Support** - Extends @noneforge/eslint-config base with Node.js specifics
- 🚀 **Node.js 20+ LTS** - Targets modern Node.js features and APIs
- 🔧 **Smart Detection** - Different rules for tests, scripts, migrations, and configs

## Related Packages

- [@noneforge/eslint-config](https://www.npmjs.com/package/@noneforge/eslint-config) - TypeScript/Javascript base configuration
- [@noneforge/eslint-config-angular](https://www.npmjs.com/package/@noneforge/eslint-config-angular) - Angular application configuration

## Requirements

- Node.js >=20.0.0 (LTS)
- ESLint >=9.22.0
- TypeScript >=5.5.0

## Installation

```bash
npm install --save-dev @noneforge/eslint-config-node eslint typescript
```

or with Yarn:

```bash
yarn add --dev @noneforge/eslint-config-node eslint typescript
```

## Usage

Create an `eslint.config.js` file in your project root:

```javascript
import config from '@noneforge/eslint-config-node';

export default [
  ...config,
  // Your custom rules here
];
```

### With Custom Rules

```javascript
import config from '@noneforge/eslint-config-node';

export default [
  ...config,
  {
    rules: {
      // Override or add custom rules
      'n/no-process-env': 'off',
      'security/detect-child-process': 'off',
    }
  }
];
```

### For Monorepos

```javascript
import config from '@noneforge/eslint-config-node';

export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        project: ['./packages/*/tsconfig.json'],
      }
    }
  }
];
```

## Rule Categories

### 🛡️ Node.js Core Rules
**Essential Node.js-specific error prevention and best practices:**
- **Import Protocol**: `prefer-node-protocol` - Enforces `node:` prefix for built-in modules
- **Module System**: Prevents missing/extraneous imports and requires
- **API Safety**: `no-deprecated-api` - Warns about deprecated Node.js APIs
- **Process Control**: `no-process-exit`, `no-process-env` - Controlled process management
- **Sync Operations**: `no-sync` - Prevents blocking I/O operations (configurable for scripts)
- **Promise APIs**: `prefer-promises/fs`, `prefer-promises/dns` - Modern async patterns

```typescript
// ❌ Old patterns
import fs from 'fs';
const data = fs.readFileSync('./file.txt');
process.exit(1);

// ✅ Modern Node.js patterns
import fs from 'node:fs/promises';
const data = await fs.readFile('./file.txt');
throw new Error('Exit with error');
```

### 🔒 Security Rules
**Comprehensive security scanning for backend applications:**
- **Code Injection**: `detect-eval-with-expression`, `detect-non-literal-require`
- **File System**: `detect-non-literal-fs-filename` - Prevents path traversal
- **Child Process**: `detect-child-process` - Warns about shell execution
- **Regular Expressions**: `detect-unsafe-regex` - Prevents ReDoS attacks
- **Cryptography**: `detect-pseudoRandomBytes` - Ensures secure random generation
- **Buffer Safety**: `detect-buffer-noassert`, `detect-new-buffer` - Safe buffer usage

```typescript
// ❌ Security issues
const file = await fs.readFile(userInput);  // Path traversal risk
const cmd = exec(`ls ${userDir}`);  // Command injection
const regex = /^(a+)+$/;  // ReDoS vulnerability

// ✅ Secure patterns
const file = await fs.readFile(path.join(SAFE_DIR, sanitize(userInput)));
const cmd = execFile('ls', [userDir]);  // No shell interpolation
const regex = /^a+$/;  // Linear time complexity
```

### ⚡ Promise & Async Rules
**Advanced async/await patterns for Node.js:**
- **Error Handling**: `catch-or-return` - All promises must be handled
- **Promise Creation**: `no-new-statics`, `no-return-wrap` - Correct promise patterns
- **Callback Integration**: `no-callback-in-promise`, `no-promise-in-callback`
- **Flow Control**: `no-nesting` - Prevents deep promise chains
- **Return Patterns**: `no-return-in-finally` - Ensures proper cleanup

```typescript
// ❌ Common async mistakes
async function fetchData() {
  return new Promise.resolve(data);  // Wrong promise creation
  promise.then(handleSuccess, handleError);  // Missing return
}

// ✅ Proper async patterns
async function fetchData() {
  return data;  // Implicit promise wrapping
  return promise
    .then(handleSuccess)
    .catch(handleError);  // Proper chaining
}
```

### 🦄 Unicorn Enhancements
**Modern JavaScript patterns optimized for Node.js:**
- **Top-Level Await**: `prefer-top-level-await` - Modern module patterns
- **Array Methods**: `prefer-at`, `prefer-array-some`, `no-array-push-push`
- **Modern APIs**: `prefer-modern-math-apis`, `prefer-structured-clone`
- **String Operations**: `prefer-string-replace-all` - Efficient string handling
- **Collections**: `prefer-set-has` - O(1) lookups over arrays
- **Optional Parameters**: `prefer-default-parameters`, `prefer-optional-catch-binding`

```typescript
// ❌ Legacy patterns
const last = array[array.length - 1];
const copy = JSON.parse(JSON.stringify(obj));
str.replace(/foo/g, 'bar');
arr.includes(value);  // O(n) for large arrays

// ✅ Modern patterns  
const last = array.at(-1);
const copy = structuredClone(obj);
str.replaceAll('foo', 'bar');
set.has(value);  // O(1) lookup
```

### 📁 Smart File Detection

#### Test Files (`*.spec.ts`, `*.test.ts`, `*.e2e-spec.ts`)
**Relaxed rules for testing:**
- Import restrictions lifted for test dependencies
- Security rules relaxed for test scenarios
- File system operations allowed for fixtures

#### Scripts & Migrations (`scripts/**`, `migrations/**`)
**Practical rules for tooling:**
- Console output allowed
- Process environment access permitted
- Synchronous operations allowed
- Process exit allowed for CLI tools

#### Configuration Files (`*.config.js/ts/mjs`)
**Flexible configuration handling:**
- Unpublished imports allowed
- Environment variables permitted
- Synchronous operations for config loading
- Dynamic requires for conditional configs

## Base Configuration

This package extends [@noneforge/eslint-config](https://github.com/noneforge/eslint-config) which provides:
- Comprehensive TypeScript type checking
- Built-in formatting (Prettier replacement)
- Import organization and sorting
- Modern JavaScript best practices
- JSDoc documentation rules

See the [base configuration README](https://github.com/noneforge/eslint-config) for details on inherited rules.

## Common Patterns

### Environment Variables
```typescript
// ❌ Direct process.env access (error by default)
const port = process.env.PORT;

// ✅ Centralized config with validation
// config.ts - use n/no-process-env override
export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
};

// Other files
import { config } from './config';
const port = config.port;
```

### File Operations
```typescript
// ❌ Synchronous operations block event loop
import fs from 'fs';
const data = fs.readFileSync('./data.json');

// ✅ Async operations with promises
import fs from 'node:fs/promises';
const data = await fs.readFile('./data.json', 'utf-8');
```

### Error Handling
```typescript
// ❌ Unhandled promises and poor error flow
async function risky() {
  doAsyncWork();  // Floating promise
  process.exit(1);  // Abrupt termination
}

// ✅ Proper error handling
async function safe() {
  await doAsyncWork();  // Awaited
  throw new Error('Descriptive error');  // Proper error flow
}
```

## VSCode Integration

Add to `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.experimental.useFlatConfig": true,
  "eslint.validate": [
    "javascript",
    "typescript"
  ]
}
```

## Package.json Scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:debug": "eslint . --debug",
    "type-check": "tsc --noEmit"
  }
}
```

## Migration from ESLint 8

1. Remove `.eslintrc.*` files
2. Create `eslint.config.js` with flat config
3. Update VSCode settings for flat config
4. Install this package and its peer dependencies
5. Update scripts to use ESLint 9 CLI

## Performance Tips

- Use `projectService: true` for better TypeScript performance
- Enable ESLint cache: `eslint . --cache`
- Exclude `node_modules` and `dist` in your tsconfig.json
- Consider `--max-warnings 0` in CI/CD pipelines

## Philosophy

This configuration prioritizes:

1. **Security** - Prevent vulnerabilities in backend applications
2. **Performance** - Non-blocking operations and efficient patterns
3. **Type Safety** - Leverage TypeScript for runtime error prevention
4. **Modern APIs** - Use latest Node.js features and best practices
5. **Developer Experience** - Clear errors with practical escape hatches

## License

MIT

## Contributing

Issues and PRs welcome at [GitHub](https://github.com/noneforge/eslint-config-node)