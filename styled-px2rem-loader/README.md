# styled-px2rem-loader

A Webpack loader for automatically converting px units to rem in styled-components and React components.

## Features

- Converts px values to rem at build time
- Supports styled-components template literals
- Handles dynamic expressions and nested interpolations
- Supports React components JSX transformations
- Configurable conversion options
- Integrates seamlessly with Webpack
- Supports transformation suppression via comments
- Selective file processing with include/exclude patterns

## Installation

```bash
# Install the loader
npm install styled-px2rem-loader --save-dev
```

## Usage

To use the `styled-px2rem-loader`, add it to your Webpack configuration:

```javascript
// webpack.config.js
const path = require("path");

module.exports = {
  // ... other configurations ...
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "styled-px2rem-loader",
            include: [path.resolve(__dirname, "src")],
            exclude: [path.resolve(__dirname, "src/files/to/exclude/")],
            options: {
              rootValue: 16, // Base font size for conversion
              unitPrecision: 5, // Decimal places in rem values
              minPixelValue: 0, // Minimum px value to transform
              multiplier: 1, // Multiplication factor for conversion
              transformRuntime: false, // Enable runtime transformation
              mediaQuery: false, // Enable media query conversion
              transformJSX: true, // Enable JSX transformation
            },
          },
        ],
      },
    ],
  },
};
```

## Example

### Styled Components

```javascript
// Before
const Button = styled.button`
  padding: 10px;
  margin: ${(props) => props.margin}px;
`;

// After transformation
const Button = styled.button`
  padding: 0.625rem; // 10px converted to rem
  margin: ${_px2rem((props) => props.margin)}; // Dynamic margin conversion
`;
```

### React Components

```javascript
// Before
const Component = () => (
  <div style={{ padding: "16px", margin: `${size}px` }}>
    <span margin="16px" />
  </div>
);

// After transformation
const Component = () => (
  <div style={{ padding: "1rem", margin: `${_px2rem(size)}` }}>
    <span margin="4.267px" />
  </div>
);
```

## Configuration Options

```javascript
{
  // Base font size for conversion
  "rootValue": 16,

  // Decimal places in rem values
  "unitPrecision": 5,

  // Minimum px value to transform
  "minPixelValue": 0,

  // Multiplication factor for conversion
  "multiplier": 1,

  // Enable runtime transformation
  "transformRuntime": false,

  // Enable media query conversion
  "mediaQuery": false,

  // Enable JSX style transformation
  "transformJSX": true
}
```

## Suppressing Transformations

You can suppress px-to-rem transformation by two methods:

1. Add `/* styled-px2rem-disable */` to the top of the file and it will be disabled for the whole file. Just like how you would do it with eslint.

2. Add files or directories to the `exclude` option in the Webpack configuration and all files specified in the `exclude` option will be ignored.

- Suppression to single line is not supported yet, it may or may not be supported in the future, depends on the demand.

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`

## How It Works

The loader can process both styled-components template literals and React component styles:

1. Identifies px values in CSS properties and JSX style attributes
2. Converts static px values to rem at build time
3. Transforms dynamic expressions to include rem conversion
4. Preserves other CSS properties and values
5. Handles React component px transformations when enabled

## License

This project is licensed under the MIT License.
