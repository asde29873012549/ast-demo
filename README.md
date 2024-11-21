# AST Transformation Examples

A collection of projects demonstrating different AST (Abstract Syntax Tree) transformation use cases with JavaScript/Next.js codebases.

It is intended to transform legacy codebases from using `px2Unit` function calls inside codebase to go back to using `px` units, but move the `rem` transformation from runtime to compile time.

## Projects Overview

### 1. start-up
Base Next.js 15 project configured with styled-components, serving as the foundation for other demos.

```bash
cd start-up
npm install
npm run dev # runs on port 3001
```

### 2. px2unit-migration
Showcasing how to use a script that manipulates the AST to remove `px2Unit` function calls inside `styled-components` and `jsxAttributes` and transform them to `px`.

```bash
cd px2unit-migration
npm install
npm run dev # runs on port 3002
npm run remove-px2Unit # execute px2Unit function removal script
```

### 3. babel-plugin-px2rem
A custom Babel plugin paired with postcss for automatically converting px units to rem in styled-components and jsxAttributes. It is not published to npm, but you can install it locally and link it to the other projects.

```bash
cd babel-plugin-px2rem
npm install
npm link
```

### 4. babel-plugin-application
The project that applies the `babel-plugin-px2rem` to transform the `px` units to `rem` in the compile process.

```bash
cd babel-plugin-application
npm install
```

If you have not linked the babel-plugin-px2rem locally, please do it first:

```bash
cd babel-plugin-px2rem
npm install
npm link
```

Or follow the [babel-plugin-px2rem](./babel-plugin-px2rem/README.md) README for instructions.

When done, you can link the plugin to the babel-plugin-application project:

```bash
npm link babel-plugin-styled-components-px2rem
npm run dev # runs on port 3003
```

You can now see the transformed `px` units to `rem` in dev tool.

### 5. swc-plugin-application
The project that applies the `swc-plugin-px2rem` to transform the `px` units to `rem` in the compile time.

Has the same functionality as the `babel-plugin-application`. Take a look at the 
[swc-plugin-application](./swc-plugin-application/README.md) README for instructions.


### 6. px2unit-forbidden-eslint-rule
Custom ESLint rule to prevent the future use of `px2Unit` function calls.

```bash
cd px2unit-forbidden-eslint-rule
npm install
```


## Common Use Cases

### Runtime to Compile Time Transformation
- Problem: Runtime px-to-rem calculations impact performance
- Solution: `babel-plugin-px2rem` for compile-time transformation
- Example: Converting `width: ${px2Unit(10)}` to `width: 0.625rem`

### Legacy Code Migration
- Problem: Outdated px2Unit function usage throughout codebase
- Solution: `px2unit-migration` script for automated conversion
- Example: Transforming runtime calculations to static values

### Code Style Enforcement
- Problem: Inconsistent unit handling approaches
- Solution: `px2unit-forbidden-eslint-rule` to prevent px2Unit usage
- Example: ESLint errors for runtime conversion attempts

## Project Structure

```
.
├── start-up/ # Base project setup
├── px2unit-migration/ # Migration script project
├── babel-plugin-application/ # Babel plugin demo
├── babel-plugin-px2rem/ # Custom Babel plugin
└── px2unit-forbidden-eslint-rule/ # Custom ESLint rule
```
