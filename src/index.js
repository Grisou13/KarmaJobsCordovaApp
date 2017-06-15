/**
 * -------------------
 * | Configure store
 * -------------------
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, Switch } from 'react-router'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { createBrowserHistory, createHashHistory } from 'history';

import configureStore from './reducers'
import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'
import JobList from './containers/JobList'
import Job from './containers/Job'

import DevTools from './containers/DevTools'

import {ApiConfig} from './utils/api'
import {getUserData} from "./actions/user";

const isClient = () => (typeof window !== 'undefined' && window.document);


let initialState = {}
if(ApiConfig.get("access_token",false)) {
    initialState.user = {token: ApiConfig.get("access_token",false)}
}

var store = configureStore(initialState)
store.dispatch(dispatch => {
    dispatch(getUserData())
})
/**
 * -------------------
 * | Create History
 * -------------------
 */
const appHistory = createHashHistory()
// const appHistory = createBrowserHistory()
const history = syncHistoryWithStore( appHistory , store)
/**
 * ----------------------------
 * | Define redirect selectors
 * ----------------------------
 */
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => {user: state.user.token},
  redirectAction: history.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated'
})

/**
 * -------------------
 * | Render
 * -------------------
 */
ReactDOM.render(
  <Provider store={store}>
  <div>
    { /* Tell the Router to use our enhanced history */ }
    <HashRouter history={history} /*basename={window.location.pathname}*/>
      <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={(Signup)}/>
        <Route exact path="/login" component={(Login)}/>
        <Route exact path="/jobs" component={(JobList)}/>
        {/*<Route path="/jobs/:id" component={UserIsAuthenticated(Job)}/>*/}
      </App>
    </HashRouter>
    <DevTools />
  </div>

  </Provider>,
  document.getElementById('mount')
)
