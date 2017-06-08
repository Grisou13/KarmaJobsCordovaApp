import {FETCHING_JOBS,FETCH_JOBS_ERROR,FETCHED_JOBS} from '../consts/jobs'

const defaultState = {
  items: [],
  current: null
}


export default (state = defaultState, {type, payload}) => {
  switch(type){
    case FETCHING_JOBS:
      return state;
    case FETCHED_JOBS:
      return state;
    case FETCH_JOBS_ERROR:
      return state;
    default:
      return state;
  }
}
