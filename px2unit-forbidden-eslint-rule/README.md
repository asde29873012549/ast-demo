# px2unit-forbidden ESLint Rule

A custom ESLint rule to prevent the usage of `px2Unit` function calls in React/Next.js projects.

## Purpose

This ESLint rule helps enforce consistent unit handling by preventing runtime px-to-rem conversions using the `px2Unit` function. It encourages using build-time transformations instead.

## Features

- Detects and reports usage of `px2Unit` function calls
- Works with:
  - Direct function calls
  - Template literals
  - JSX attributes
  - styled-components templates
- Provides clear error messages and suggestions
- Configurable options

## Installation

```bash
npm install px2unit-forbidden-eslint-rule
npm run dev
```
