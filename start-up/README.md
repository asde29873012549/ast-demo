# Start-up Project

A base Next.js 13 project configured with styled-components, serving as the foundation for AST transformation demos.

## Features
- Next.js 13
- styled-components
- Basic responsive rem setup
- Sample profile card component

## Setup

```bash
npm install
npm run dev
```

The server will start at http://localhost:3001

## Project Structure
- `/styles`: Global styles and utilities
  - `utils.js`: Contains px2Unit conversion utility
  - `constants.js`: Design system constants
  - `globalStyles.js`: Global styled-components styles
- `/components`: Reusable components
- `/Page`: Page components

## Usage
This project serves as a starting point for other AST transformation demos. It includes:
- Basic responsive rem calculation
- px2Unit utility function for runtime px-to-rem conversion
- Sample styled-components implementation