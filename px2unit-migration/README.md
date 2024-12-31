# px2Unit Migration Tool

A demo project showcasing how to use a script that manipulates the AST to remove `px2Unit` function calls inside `styled-components` and `jsxAttributes` and transform them to `px`.

## Purpose

Automatically transforms code like:

```javascript
width: ${px2Unit(10)} -> width: "10px"
<Img width={px2Unit(10)} /> -> <Img width="10px" />
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
npm run rmPx2Unit-dry // dry run
npm run rmPx2Unit // apply changes
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
