import {UPDATE_POSITION, RESET_POSITION} from './../consts/tracking'
export const defaultState = {
  latitude:null,
  longitude:null,
  history: []
}
const HISTORY_TRESHHOLD = 10
const trackingReducer = (state = defaultState, action) => {
  switch(action.type){
    case UPDATE_POSITION:
      let newHistory = state.history.concat([action.payload])
      if(newHistory.length > HISTORY_TRESHHOLD)
        newHistory.splice(HISTORY_TRESHHOLD, newHistory.length - HISTORY_TRESHHOLD)
      return {...state, latitude: action.payload.latitude, longitude: action.payload.longitude, history: newHistory}
    case RESET_POSITION:
      return {...state, latitude: defaultState.latitude, longitude: defaultState.longitude}
    default:
      return state;
  }
}


export default trackingReducer
