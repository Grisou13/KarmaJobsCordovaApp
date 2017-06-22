/**
 * ----------------------------
 * | Define redirect selectors
 * ----------------------------
 */
import React from 'react'

import {Redirect, Route, Switch} from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import {replace} from 'connected-react-router'
import Login from './../containers/Login'
import Signup from './../containers/Signup'
import Jobs from './../containers/Jobs'
import SettingsEditor from './../containers/SettingsEditor'

export const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => ({token: state.user.token}),
    // authenticatingSelector: state => state.user.loading,
    redirectAction: replace, // the redux action to dispatch for redirect
    wrapperDisplayName: 'UserIsAuthenticated',
    failureRedirectPath: "/login",
    // allowRedirectBack: false
})

const UserIsNotAuthenticated = UserAuthWrapper({
    authSelector: state => ({token: !state.user.token}),
    // authenticatingSelector: state => state.user.loading,
    redirectAction: replace,
    failureRedirectPath: "/jobs",
    wrapperDisplayName: 'UserIsNotAuthenticated'
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

export default ({user = null}) => (
    <Switch>
        <Route exact path="/" render={()=>(user ? <Redirect to="/jobs" /> : <Redirect to="/login" />)} />
        <Route path="/signup" component={(Signup)}/>
        <Route path="/login" component={UserIsNotAuthenticated(Login)}/>
        <Route path="/settings" component={(SettingsEditor)}/>
        <Route path="/jobs" component={UserIsAuthenticated(Jobs)}/>
    </Switch>
)
