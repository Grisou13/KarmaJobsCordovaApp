import * as constants from '../consts/user'
import Api from '../utils/api'
import config from '../utils/config'
export const login = data => dispatch => {
  dispatch({
    type: constants.USER_LOGGING_IN
  })
      Api.getInstance().login(data)
          .then(user => dispatch(loggedIn(user)))
          .catch(e => dispatch(loginFailed(e)))
  // Wait 2 seconds before "logging in"
  // store email + token in localstorage
  // setTimeout(() => {
  //   dispatch({
  //     type: constants.USER_LOGGED_IN,
  //     payload: data
  //   })
  // }, 2000)
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
export const signup = profile => dispatch => {
  setTimeout(() => {
    dispatch({
      type: constants.USER_LOGGED_IN,
      payload: data
    })
  }, 2000)
}
