import * as constants from '../consts/user'
import api from '../utils/api'
export const login = data => dispatch => {
  dispatch({
    type: constants.USER_LOGGING_IN
  })

  // Wait 2 seconds before "logging in"
  // store email + token in localstorage
  setTimeout(() => {
    dispatch({
      type: constants.USER_LOGGED_IN,
      payload: data
    })
  }, 2000)
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
