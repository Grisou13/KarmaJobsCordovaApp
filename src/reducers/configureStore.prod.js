import { createStore,combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as rUiReducer } from 'redux-ui'
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
    tracking,
    errors
})
const createEnhancers = (history) => compose(
    // Middleware you want to use in development:
    applyMiddleware(thunk, routerMiddleware(history), jobMiddleware ),
    // Required! Enable Redux DevTools with the monitors you chose
);

const initialState = {}
export default (initialState, history) => {
    const store = createStore(connectRouter(history)(reducers), initialState, createEnhancers(history));
    return store;
}
