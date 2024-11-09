A Next.js project demonstrating build-time px-to-rem transformation using a custom Babel plugin.

## Features
- Automatic px-to-rem conversion at build time
- No runtime conversion overhead
- Preserves dynamic expressions
- Supports styled-components

## Setup

```bash
# Link local babel plugin
cd ../babel-px2Rem-plugin
npm link
Setup project
cd ../px-to-rem-buildtime-transformation
npm install
npm link babel-plugin-styled-components-px2rem
# Start development server
npm run dev
```

## Configuration
`.babelrc`:
```json
{
"plugins": [
["styled-components-px2rem", {
"rootValue": 3.75,
"unitPrecision": 5
}]
]
}
```
