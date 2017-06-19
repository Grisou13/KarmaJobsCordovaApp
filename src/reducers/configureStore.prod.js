import { createStore,combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as rUiReducer } from 'redux-ui'
import {routerReducer, routerMiddleware } from 'react-router-redux'
import promiseMiddleware from 'redux-promise';
import { browserHistory } from 'react-router'

import userReducer from './user'
import jobReducer from './jobs'
import tracking from './tracking'

const reducers = combineReducers({
    routing: routerReducer,
    ui: rUiReducer,
    user: userReducer,
    jobs: jobReducer,
    tracking
})
const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(thunk, routerMiddleware(browserHistory) ),
);
const initialState = {}
export default (initialState) => {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/reactjs/redux/releases/tag/v3.1.0
  const store = createStore(reducers, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./', () =>
      store.replaceReducer(require('./')/*.default if you use Babel 6+ */)
    );
  }

  return store;
}
