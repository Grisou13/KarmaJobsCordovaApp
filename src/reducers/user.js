import * as constants from '../consts/user'
import {ApiConfig} from './../utils/api'
const initialState = {
  data: null,
  token: null,
  isLoading: false,
  failed: false
}

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.USER_LOGGING_IN:
      return { ...initialState, isLoading: true }
    case constants.USER_FAILED_LOGIN:
      return {...initialState, isLoading: false, failed: true}
    case constants.USER_LOGGED_IN:
      return { data: payload, token: ApiConfig.get("access_token"), isLoading: false , failed: false}
    case constants.USER_LOGGED_OUT:
      return initialState
    default:
      return state
  }
}

export default userReducer
