# px2Unit Migration Tool

A script-based tool for migrating codebases from px2Unit function calls to pure px values.

## Purpose
Automatically transforms code like:

```javascript
width: ${px2Unit(10)} -> width: "10px"
```

## Features
- AST-based code transformation
- Handles various px2Unit usage patterns:
  - Direct function calls
  - Template literals
  - JSX expressions
  - styled-components templates
- Preserves code formatting
- Removes unused px2Unit imports

## Usage

```bash
# Install dependencies
npm install

# Run migration script
npm run remove-px2Unit
```

## Script Structure
- `/scripts/px2UnitRemoval/`
  - `index.mjs`: Entry point
  - `visitors/`: AST visitor definitions
  - `transformers/`: Code transformation logic
  - `utils/`: Helper utilities

## Configuration
Edit `constants.mjs` to configure:
- `INCLUDE_PATHS`: Directories to process
- `AVAILABLE_EXTENSIONS`: File types to transform