import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Grommet } from 'grommet';

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Grommet theme={theme} full>
    <App />
  </Grommet>
);