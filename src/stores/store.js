import { createStore, compose } from 'redux';
import rootReducer from '../reducers';

// To enable Redux Dev-tool Support
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify here name, actionsBlacklist, actionsCreators and other options
  }) : compose;
/* eslint-enable */

const store = createStore(rootReducer, composeEnhancers());

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers/index.js', () => {
    const newReducer = require('../reducers/index.js').default; // eslint-disable-line global-require
    store.replaceReducer(newReducer);
  });
}

export default store;