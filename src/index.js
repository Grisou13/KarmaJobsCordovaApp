//TODO https://github.com/supasate/connected-react-router/blob/master/examples/basic/src/index.js
//
//
//
import "babel-polyfill";

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, Switch } from 'react-router'
import { HashRouter, BrowserRouter, Link, Redirect } from 'react-router-dom'
import { ConnectedRouter, push } from 'connected-react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { createBrowserHistory, createHashHistory } from 'history';

import configureStore from './reducers'
import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'
import JobList from './containers/JobList'
import SettingsEditor from './containers/SettingsEditor'
import Error from "./containers/Error";
import DevTools from './containers/DevTools'

import {ApiConfig} from './utils/api'
import {getUserData} from "./actions/user";
import {updatePosition, error as trackingError} from "./actions/tracking";
import { logout } from './actions/user'


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
var token = ApiConfig.accessToken
if(token) {
    initialState.user = {token}
}

const store = configureStore(initialState,history)
if(token){
  console.log("LOGGIN IN USER WITH TOKEN:", token)
  store.dispatch(dispatch => {
      dispatch(getUserData())
      dispatch(push("/jobs"))
  })
}

/* --------------------
 * | Location tracking
 * --------------------
 */
function onSuccess(position) {
  console.log(store.getState())
    store.dispatch(updatePosition(position.coords))
  }

function onError(error) {
  store.dispatch(trackingError(error))
}
const options = { timeout: 3000,enableHighAccuracy: true }
//watch position
var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
// but also populate initial position
navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
console.log(watchID)
/**
 * ----------------------------
 * | Define redirect selectors
 * ----------------------------
 */
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user.data,
  redirectAction: push, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated'
})
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    store.user.token ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

/**
 * -------------------
 * | Render
 * -------------------
 */
const render = () => {
  return ReactDOM.render(
    <Provider store={store}>
      <div>
        { /* Tell the Router to use our enhanced history */ }
        <ConnectedRouter history={history}>
          <div>
            <Error />
            <header>
                {/* wait for device ready here and put a splash screen*/}
                Links:
                {' '}
                <Link to="/">Home</Link>
                {' '}
                <Link to="/jobs">Jobs</Link>
                {' '}
                <Link to="/login">Login</Link>
                {' '}
                <Link to="/settings">Settings</Link>
                {' '}
                <button onClick={() => store.dispatch(logout())}>Logout</button>
            </header>

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={(Signup)}/>
              <Route path="/login" component={(Login)}/>
              <Route path="/settings" component={(SettingsEditor)}/>
              <Route path="/jobs" component={UserIsAuthenticated(JobList)}/>
            </Switch>
          </div>
        </ConnectedRouter>
        <DevTools />
      </div>
    </Provider>,
    document.getElementById('mount')
  )
}
document.addEventListener("deviceready", render, false);



if (module.hot) module.hot.accept('./index', () => render());
