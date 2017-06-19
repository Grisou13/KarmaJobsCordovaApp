import {UPDATE_POSITION, RESET_POSITION} from './../consts/tracking'


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
