import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /*
  Modern CSS Reset & Base Styles
  - Preserves useful defaults
  - Removes inconsistencies
  - Prevents common issues
  - Provides sensible defaults
  */

  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Remove default margin and padding */
  html,
  body {
    margin: 0;
    padding: 0;
  }

  /* Set core root defaults */
  html {
    /* Make it easier to calculate rems */
    font-size: 62.5%; /* 1rem = 10px */
    scroll-behavior: smooth;
    height: 100%;
    text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%; /* iOS 8+ */
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    font-size: 1.6rem; /* 16px */
    line-height: 1.5;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  /* Remove list styles */
  ul,
  ol {
    list-style: none;
  }

  /* Remove default styles on links */
  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  /* Make images easier to work with */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* Remove built-in form typography styles */
  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  /* Avoid text overflows */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Better Tables */
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }

  /* Form elements */
  button {
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;
  }

  /* Remove spinner from number inputs */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

  /* Remove search input decoration */
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* Custom selection color */
  ::selection {
    background-color: #b3d4fc;
    color: #000;
    text-shadow: none;
  }

  /* Remove tap highlight on iOS */
  a,
  button,
  input,
  select,
  textarea {
    -webkit-tap-highlight-color: transparent;
  }

  /* Scrollbar styles (Webkit) */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default GlobalStyles;
