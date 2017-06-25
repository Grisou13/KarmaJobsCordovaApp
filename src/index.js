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
import { createBrowserHistory, createHashHistory } from 'history';

import configureStore from './reducers'
import App from './App'

import DevTools from './containers/DevTools'

import {ApiConfig} from './utils/api'
import {getUserData} from "./actions/user";
import {updatePosition, error as trackingError} from "./actions/tracking";

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


/**
 * -------------------
 * | Render
 * -------------------
 */
function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
loadJS('https://maps.googleapis.com/maps/api/js?key='+process.env.GOOGLE_MAP_API_KEY)


const render = () => {
  let appElem = document.getElementById("app")
  if(appElem != null)
    appElem.remove()
    
  return ReactDOM.render(
    <Provider store={store}>
      <div>
        { /* Tell the Router to use our enhanced history */ }
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
          {process.env.NODE_ENV !== 'production' ? null: (device.platform === "browser"? <DevTools /> : null)}
      </div>
    </Provider>,
    document.getElementById('mount')
  )
}
document.addEventListener("deviceready", render, false);



if (module.hot) module.hot.accept('./index', () => render());
