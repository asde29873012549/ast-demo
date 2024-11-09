# AST Transformation Examples

A collection of projects demonstrating different AST (Abstract Syntax Tree) transformation use cases with JavaScript/React codebases.

## Projects Overview

### 1. start-up
Base Next.js 13 project configured with styled-components, serving as the foundation for other demos.

```bash
cd start-up
npm install
npm run dev # runs on port 3001
```


### 2. px2unit-px-migration
Script-based tool for migrating codebases from px2Unit function calls to pure px values.

```bash
cd px2unit-px-migration
npm install
npm run dev # runs on port 3002
npm run remove-px2Unit # execute px2Unit function removal script
```


### 3. px-to-rem-buildtime-transformation
Next.js project demonstrating build-time px-to-rem transformation using a custom Babel plugin.

```bash
cd px-to-rem-buildtime-transformation
npm install
```

If you have not linked the babel-px2Rem-plugin locally, please do it first:

```bash
cd babel-px2Rem-plugin
npm install
npm link
```

Or follow the [babel-px2Rem-plugin](./babel-px2Rem-plugin/README.md) README for instructions.

When done, you can link the plugin to the px-to-rem-buildtime-transformation project:

```bash
npm link babel-plugin-styled-components-px2rem
npm run dev # runs on port 3003
```

You can now see the transform result in dev tool.


### 4. babel-px2Rem-plugin
Babel plugin for automatically converting px units to rem in styled-components.

```bash
cd babel-px2Rem-plugin
npm install
npm link
```


### 5. px2unit-forbidden-eslint-rule
Custom ESLint rule to prevent the use of px2Unit function calls.

```bash
cd px2unit-forbidden-eslint-rule
npm install
```



## Common Use Cases

### Runtime to Build Time Transformation
- Problem: Runtime px-to-rem calculations impact performance
- Solution: `babel-px2Rem-plugin` for build-time transformation
- Example: Converting `width: ${px2Unit(10)}` to `width: 0.625rem`

### Legacy Code Migration
- Problem: Outdated px2Unit function usage throughout codebase
- Solution: `px2unit-px-migration` script for automated conversion
- Example: Transforming runtime calculations to static values

### Code Style Enforcement
- Problem: Inconsistent unit handling approaches
- Solution: `px2unit-forbidden-eslint-rule` to prevent px2Unit usage
- Example: ESLint errors for runtime conversion attempts

## Project Structure

```
.
├── start-up/ # Base project setup
├── px2unit-px-migration/ # Migration script project
├── px-to-rem-buildtime-transformation/ # Babel plugin demo
├── babel-px2Rem-plugin/ # Custom Babel plugin
└── px2unit-forbidden-eslint-rule/ # Custom ESLint rule
```
