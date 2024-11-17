import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --background: #1E2422;
    --accent: #9F91CC;
    --geometric: #F5F5DC;
    --text: #FFFFFF;
    --error: #FF6B6B;
    --success: #4CAF50;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--background);
    color: var(--text);
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    min-height: 100vh;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input, button {
    font-size: 16px;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--accent);
    border-radius: 4px;
  }

  ::selection {
    background: var(--accent);
    color: var(--text);
  }
`;

export default GlobalStyles;