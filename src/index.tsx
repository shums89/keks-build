import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from './store';
import { fetchUserStatusAction } from './store/api-actions';

import App from '@components/app/app';
import HistoryRouter from '@components/history-route/history-route';

import browserHistory from './browser-history';

import './index.css';

store.dispatch(fetchUserStatusAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store} >
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </StrictMode>
);
