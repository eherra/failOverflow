import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Grommet, Spinner } from 'grommet';
import { UserProvider } from './context/UserContext';
import { WavyContainer } from 'react-wavy-transitions';
import { NotificationProvider } from './context/NotificationContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const customTheme = {
  global: {
    colors: {
      background: '#efefef',
      brand: '#A7BEAE',
      focus: '#efefef',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Grommet theme={customTheme} full>
    <Suspense fallback={<Spinner size='large' alignSelf='center' />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <WavyContainer />
          <UserProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </UserProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Suspense>
  </Grommet>,
);
