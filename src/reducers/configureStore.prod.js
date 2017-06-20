import { createStore,combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as rUiReducer } from 'redux-ui'
// import {routerReducer, routerMiddleware } from 'react-router-redux'
import promiseMiddleware from 'redux-promise';
import { browserHistory } from 'react-router'
import userReducer from './user'
import jobReducer from './jobs'
import tracking from './tracking'
import errors from './errors'
import jobMiddleware from '../middlewares/job'
import { connectRouter, routerMiddleware } from 'connected-react-router'

const reducers = combineReducers({
    ui: rUiReducer,
    user: userReducer,
    jobs: jobReducer,
    tracking
})
const createEnhancers = (history) => compose(
      applyMiddleware(thunk, routerMiddleware(history), jobMiddleware ),
  );

const initialState = {}
export default (initialState, history) => {
  return createStore(connectRouter(history)(reducers), initialState, createEnhancers(history));
}
