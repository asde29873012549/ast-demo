A Next.js project demonstrating compile-time px-to-rem transformation using a custom swc plugin.

## Features
- Automatic px-to-rem conversion at compile time
- No runtime conversion overhead
- Preserves dynamic expressions
- Supports styled-components

## Setup

```bash
# Link local swc plugin
cd ../swc-plugin-application
npm install
npm link swc_plugin_styled_px2rem
# Start development server
npm run dev
```

## Configuration

`next.config.js`:
```js
{
  "experimental": {
    "swcPlugins": [
      [
        "swc_plugin_styled_px2rem",
      {
        "rootValue": 3.75,
        "unitPrecision": 5
      }
      ]
    ]
  }
}
```
