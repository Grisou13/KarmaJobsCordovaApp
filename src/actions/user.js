import * as constants from '../consts/user'
import Api from '../utils/api'
import config from '../utils/config'
import { push } from 'connected-react-router'

export const login = data => dispatch => {
  dispatch(loggingIn())
    Api.getInstance().login(data)
        .then(user => dispatch(loggedIn(user)))
        .then(() =>  dispatch(push('/jobs')))
        .catch(e => dispatch(loginFailed(e)))
}
export const loginFailed = (error) => {
  return{
    type: constants.USER_FAILED_LOGIN,
    error
  }
}
export const loggedIn = (user) => {
  return {
      type: constants.USER_LOGGED_IN,
      payload: user
  }
}
export const _logout = () => {
  return {
    type: constants.USER_LOGGED_OUT
  }
}
export const logout = () => dispatch => {
  Api.getInstance().logout()
  .then(()=>dispatch(_logout()))
  .then(()=>dispatch(push("/")))

}
export const loggingIn = () => dispatch => {
    dispatch({type: constants.USER_LOGGING_IN})
    dispatch(push('/jobs'))
}
export const signup = profile => dispatch => {
  setTimeout(() => {
    dispatch({
      type: constants.USER_LOGGED_IN,
      payload: data
    })
  }, 2000)
}
export const getUserData = () => dispatch =>
    Api.getInstance()
    .getUser()
    .then(user => dispatch(loggedIn(user)))
    .catch(err => dispatch(loginFailed(err)))

export const fetchUserAndRedirect = url => dispatch => {
    Api.getInstance()
        .getUser()
        .then(user => dispatch(loggedIn(user)))
        .then(dispatch(push(url)))
        .catch(err => dispatch(loginFailed(err)))
}