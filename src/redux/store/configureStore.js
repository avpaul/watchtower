import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

/**
 * Configure the redux store
 *
 * @returns {object} Redux store
 */
const configureStore = (preloadedState) => {
  const loggerMiddleware = createLogger();
  const middlewares = [thunkMiddleware];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
};

export default configureStore;
