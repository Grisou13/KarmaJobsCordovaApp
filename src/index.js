import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory  } from 'react-router'
import { HashRouter } from 'react-router-dom'
import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { createBrowserHistory } from 'history';

import configureStore from './reducers'
import App from './containers/app'
import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'

import JobList from './containers/JobList'
import Job from './containers/Job'


import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

// Add the reducer to your store on the `routing` key
const isClient = () => (typeof window !== 'undefined' && window.document);

var store = configureStore()
// Create an enhanced history that syncs navigation events with the store

const history = syncHistoryWithStore(createBrowserHistory() , store)
// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user.data, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})
const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  // Want to redirect the user when they are done loading and authenticated
  predicate: user => user.data === null && user.isLoading === false,
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/login',
  allowRedirectBack: false
})

ReactDOM.render(
  <Provider store={store}>
  <div>
    { /* Tell the Router to use our enhanced history */ }
    <HashRouter history={history}>
      <Route path="/" component={App}>
        {/*} <Route path="/" exact component={Home}/>*/}
        <IndexRoute component={Home} />
        <Route path="signup" component={UserIsNotAuthenticated(Signup)}/>
        <Route path="login" component={UserIsNotAuthenticated(Login)}/>
        <Route path="jobs" component={UserIsAuthenticated(JobList)}/>
        <Route path="jobs/:id" component={UserIsAuthenticated(Job)}/>
      </Route>
    </HashRouter>
    <DevTools />
  </div>

  </Provider>,
  document.getElementById('mount')
)
