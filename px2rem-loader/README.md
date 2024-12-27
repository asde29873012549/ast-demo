# px2rem-loader

A Webpack loader for automatically converting px units to rem in styled-components.

## Features
- Converts px values to rem at build time
- Supports styled-components template literals
- Handles dynamic expressions and nested interpolations
- Configurable conversion options
- Integrates seamlessly with Webpack

## Installation

```bash
# Install the loader
npm install px2rem-loader --save-dev
```

## Usage

To use the `px2rem-loader`, add it to your Webpack configuration:

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  // ... other configurations ...
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'px2rem-loader',
            options: {
              rootValue: 16, // Base font size for conversion
              unitPrecision: 5, // Decimal places in rem values
              minPixelValue: 0, // Minimum px value to transform
              multiplier: 1, // Multiplication factor for conversion
              transformRuntime: false, // Enable runtime transformation
              mediaQuery: false, // Enable media query conversion
            },
          },
        ],
      },
    ],
  },
};
```

## Example

```javascript
// Before
const Button = styled.button`
  padding: 10px;
  margin: ${props => props.margin}px;
`;

// After transformation
const Button = styled.button`
  padding: 0.625rem; // 10px converted to rem
  margin: ${_px2rem(props => props.margin)}; // Dynamic margin conversion
`;

function _px2rem(input, ...args) {
  if (typeof input === 'function') return _px2rem(input(...args), ...args);
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;
  if (Math.abs(pixels) < 0) return pixels + 'px';
  var mul = Math.pow(10, 3 + 1);
  return Math.round(Math.floor(pixels * 1 / 3.75 * mul) / 10) * 10 / mul + 'rem';
}
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
  "mediaQuery": false
}
```

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
## How It Works

The loader processes styled-components template literals and:
1. Identifies px values in CSS properties.
2. Converts static px values to rem at build time.
3. Transforms dynamic expressions to include rem conversion.
4. Preserves other CSS properties and values.

## License

This project is licensed under the MIT License.