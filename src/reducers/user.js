import * as constants from '../consts/user'
const initialState = {
  data: null,
  isLoading: false,
  failed: true
}

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.USER_LOGGING_IN:
      return { ...initialState, isLoading: true }
    case constants.USER_LOGGIN_FAILED:
      return {...initialState, isLoading: false}
    case constants.USER_LOGGED_IN:
      return { data: payload, isLoading: false , failed: false}
    case constants.USER_LOGGED_OUT:
      return initialState
    default:
      return state
  }
}

export default userReducer
