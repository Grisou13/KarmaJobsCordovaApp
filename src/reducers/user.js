import * as constants from '../consts/user'
import {ApiConfig} from './../utils/api'
const initialState = {
  data: {},
  token: null,
  isLoading: false,
  failed: false,
  error: null
}

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.USER_LOGGING_IN:
      return { ...state, isLoading: true }
    case constants.USER_FAILED_LOGIN:
      return {...state, isLoading: false, failed: true, error: payload}
      case constants.USER_LOGGED_IN:
      return { ...state, data: payload, token: ApiConfig.accessToken, isLoading: false , failed: false}
    case constants.USER_LOGGED_OUT:
      return initialState //reset the user reducer to initial state, meaning no token, no nothing
    default:
      return state
  }
}

export default userReducer
