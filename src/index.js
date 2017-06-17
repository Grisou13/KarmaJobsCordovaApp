//TODO https://github.com/supasate/connected-react-router/blob/master/examples/basic/src/index.js
//
//
//
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, Switch } from 'react-router'
import { HashRouter, BrowserRouter } from 'react-router-dom'
// import { routerReducer, syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'
import { ConnectedRouter } from 'connected-react-router'

import { UserAuthWrapper } from 'redux-auth-wrapper'
import { createBrowserHistory, createHashHistory } from 'history';

import configureStore from './reducers'
import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'
import JobList from './containers/JobList'

import DevTools from './containers/DevTools'

import {ApiConfig} from './utils/api'
import {getUserData} from "./actions/user";

const isClient = () => (typeof window !== 'undefined' && window.document);
/**
 * -------------------
 * | Create History
 * -------------------
 */

// const appHistory = createBrowserHistory()
// const history = syncHistoryWithStore( appHistory , store)
const history = createHashHistory()

/**
* ----------------
* | Create store
* ----------------
*/
let initialState = {}
var token = ApiConfig.get("access_token","")
if(token) {
    initialState.user = {token}
    console.log(token)
    console.log(initialState)
}

var store = configureStore(initialState,history)
if(token){
  store.dispatch(dispatch => {
      dispatch(getUserData())
  })
}

/**
 * ----------------------------
 * | Define redirect selectors
 * ----------------------------
 */
// const UserIsAuthenticated = UserAuthWrapper({
//   authSelector: state => {user: state.user.token},
//   redirectAction: history.replace, // the redux action to dispatch for redirect
//   wrapperDisplayName: 'UserIsAuthenticated'
// })

/**
 * -------------------
 * | Render
 * -------------------
 */
ReactDOM.render(
  <Provider store={store}>
  <div>
    { /* Tell the Router to use our enhanced history */ }


        {/* <HashRouter history={history}> */}
        <ConnectedRouter history={history}>
        <App>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={(Signup)}/>
        <Route path="/login" component={(Login)}/>
        <Route path="/jobs" component={(JobList)}/>
        </Switch>
        {/*<Route path="/jobs/:id" component={UserIsAuthenticated(Job)}/>*/}
        {/*</HashRouter> */}
        </App>
        </ConnectedRouter>


    <DevTools />
  </div>

  </Provider>,
  document.getElementById('mount')
)
