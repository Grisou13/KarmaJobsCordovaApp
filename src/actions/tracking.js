import {UPDATE_POSITION, RESET_POSITION, TRACKING_ERROR} from './../consts/tracking'


export const updatePosition = (pos) => {
  return {
    type: UPDATE_POSITION,
    payload: pos
  }
}

export const resetPosition = () => {
  return {
    type: RESET_POSITION,
    payload: null
  }
}

export const error = (error) => {
  return {
    type: TRACKING_ERROR,
    error
  }
}
