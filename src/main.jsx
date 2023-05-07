import '@common/less/index.less';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CommonProvider } from 'src/core/common/CommonContext';
import { StoreProvider } from 'src/core/store/store';
import App from './app/App';
import './index.scss';
import MainStoreProvider from 'src/store/context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <CommonProvider>
          <MainStoreProvider>
            <App />
          </MainStoreProvider>
        </CommonProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
