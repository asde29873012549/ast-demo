# babel-plugin-styled-components-px2rem

A Babel plugin for automatically converting px units to rem in styled-components.

## Features
- Converts px values to rem at build time
- Supports styled-components template literals
- Handles dynamic expressions
- Configurable conversion options

## Installation

```bash
Local development
npm install
Link for local testing
npm link
```

## Usage

```javascript
// Before
const Button = styled.button padding: 10px; margin: ${props => props.margin}px;
// After
const Button = styled.button padding: 0.625rem; margin: ${props => props.margin / 16}rem;
```


## Configuration Options

```javascript
{
// Base font size for conversion
rootValue: 16,
// Decimal places in rem values
unitPrecision: 5,
// Minimum px value to transform
minPixelValue: 0,
// Multiplication factor for conversion
multiplier: 1,
// Enable runtime transformation
transformRuntime: false,
// CSS properties to transform
propList: [""],
// Selectors to ignore
selectorBlackList: [],
// Enable media query conversion
mediaQuery: false
}
```


## Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Link locally: `npm link`
4. Use in another project: `npm link babel-plugin-styled-components-px2rem`

## How It Works
The plugin processes styled-components template literals and:
1. Identifies px values in CSS properties
2. Converts static px values to rem at build time
3. Transforms dynamic expressions to include rem conversion
4. Preserves other CSS properties and values

## License
MIT