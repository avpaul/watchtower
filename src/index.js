import React from 'react';
import bugsnag from 'bugsnag-js';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createPlugin from 'bugsnag-react';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store/configureStore';
import Routes from './routes';
import initialState from './redux/reducers/initialState';

const bugsnagClient = bugsnag(process.env.REACT_APP_BUGSNAG_API_KEY);
const ErrorBoundary = bugsnagClient.use(createPlugin(React));
const store = configureStore(initialState);
ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <Routes />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);

registerServiceWorker();
