# Start-up Project

A base Next.js 15 project configured with styled-components, serving as the foundation for AST transformation demos.

## Features
- Next.js 15
- styled-components
- Responsive design implemented with:
  - Dynamic HTML root font-size based on the screen width
  - All size values are in `rem` to get the responsiveness from the root font-size
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
- Responsive rem calculation
- px2Unit utility function for runtime px-to-rem conversion
- Sample styled-components implementation