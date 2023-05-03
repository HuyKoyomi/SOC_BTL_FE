import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import '@common/less/index.less';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@core/store/store';
import { CommonProvider } from '@core/common/CommonContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <CommonProvider>
          <App />
        </CommonProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
