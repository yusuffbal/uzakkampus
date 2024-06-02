import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './app/redux/Store';
import { SSRProvider } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SSRProvider>
        <App />
      </SSRProvider>  </Provider>
  </React.StrictMode>
);

