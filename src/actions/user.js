import * as constants from '../consts/user'
import Api from '../utils/api'
import config from '../utils/config'
export const login = data => dispatch => {
  dispatch(loggingIn())
    Api.getInstance().login(data)
        .then(user => dispatch(loggedIn(user)))
        .catch(e => dispatch(loginFailed(e)))
}
export const loginFailed = (error) => {
  return{
    type: constants.USER_FAILED_LOGIN,
    payload: error
  }
}
export const loggedIn = (user) => {
  return {
      type: constants.USER_LOGGED_IN,
      payload: user
  }
}
export function logout() {
  return {
    type: constants.USER_LOGGED_OUT
  }
}
export const loggingIn = () => ({
    type: constants.USER_LOGGING_IN
})
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