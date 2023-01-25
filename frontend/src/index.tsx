import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App';
import { Grommet } from 'grommet';

const customTheme = {
  global: {
    colors: {
      background: '#efefef',
      brand: '#A7BEAE',
      focus: "#efefef",

    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  }
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Grommet theme={customTheme} full>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Grommet>
);